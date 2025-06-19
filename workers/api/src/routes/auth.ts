import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import type { Env } from '../index';

// Validation schemas
const loginSchema = {
  email: (email: string) => email.includes('@'),
  password: (password: string) => password.length > 0,
};

const registerSchema = {
  name: (name: string) => name.length > 0,
  email: (email: string) => email.includes('@'),
  password: (password: string) => password.length >= 8,
  role: (role: string) => ['creator', 'promoter'].includes(role),
};

const auth = new Hono<{ Bindings: Env }>();

// Simple validation functions
function validateLogin(data: any) {
  if (!data.email || !loginSchema.email(data.email)) {
    throw new Error('Email tidak valid');
  }
  if (!data.password || !loginSchema.password(data.password)) {
    throw new Error('Password tidak boleh kosong');
  }
  return data;
}

function validateRegister(data: any) {
  if (!data.name || !registerSchema.name(data.name)) {
    throw new Error('Nama tidak boleh kosong');
  }
  if (!data.email || !registerSchema.email(data.email)) {
    throw new Error('Email tidak valid');
  }
  if (!data.password || !registerSchema.password(data.password)) {
    throw new Error('Password harus minimal 8 karakter');
  }
  if (data.role && !registerSchema.role(data.role)) {
    throw new Error('Role tidak valid');
  }
  return { ...data, role: data.role || 'promoter' };
}

// Register endpoint
auth.post('/register', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, password, role } = validateRegister(body);

    // Check if user already exists
    const existingUser = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first();

    if (existingUser) {
      return c.json({ error: 'Email sudah terdaftar' }, 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();
    const now = new Date().toISOString();

    // Create user
    await c.env.DB.prepare(`
      INSERT INTO users (id, email, name, password_hash, role, created_at, updated_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(userId, email, name, passwordHash, role, now, now, true).run();

    // Create wallet for user
    await c.env.DB.prepare(`
      INSERT INTO wallets (id, user_id, balance, updated_at)
      VALUES (?, ?, ?, ?)
    `).bind(crypto.randomUUID(), userId, 0, now).run();

    // Generate JWT token
    const token = await sign({
      userId,
      email,
      role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    }, c.env.JWT_SECRET);

    return c.json({
      success: true,
      message: 'Akun berhasil dibuat',
      token,
      user: { id: userId, email, name, role }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return c.json({ 
      error: error.message || 'Terjadi kesalahan saat mendaftar' 
    }, 500);
  }
});

// Login endpoint
auth.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = validateLogin(body);

    // Find user
    const user = await c.env.DB.prepare(
      'SELECT id, email, name, password_hash, role, is_active FROM users WHERE email = ?'
    ).bind(email).first() as any;

    if (!user || !user.is_active) {
      return c.json({ error: 'Email atau password salah' }, 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return c.json({ error: 'Email atau password salah' }, 401);
    }

    // Generate JWT token
    const token = await sign({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    }, c.env.JWT_SECRET);

    return c.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return c.json({ 
      error: error.message || 'Terjadi kesalahan saat login' 
    }, 500);
  }
});

// Verify token endpoint
auth.get('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Token tidak ditemukan' }, 401);
    }

    const token = authHeader.substring(7);
    const payload = await verify(token, c.env.JWT_SECRET) as any;

    // Get fresh user data
    const user = await c.env.DB.prepare(
      'SELECT id, email, name, role, is_active FROM users WHERE id = ?'
    ).bind(payload.userId).first() as any;

    if (!user || !user.is_active) {
      return c.json({ error: 'User tidak ditemukan atau tidak aktif' }, 401);
    }

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Token verification error:', error);
    return c.json({ error: 'Token tidak valid' }, 401);
  }
});

export { auth as authRoutes };
