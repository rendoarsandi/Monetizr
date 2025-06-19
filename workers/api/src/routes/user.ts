import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import type { Env } from '../index';

const user = new Hono<{ Bindings: Env }>();

// Middleware to verify JWT token
const authMiddleware = async (c: any, next: any) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Token tidak ditemukan' }, 401);
    }

    const token = authHeader.substring(7);
    const payload = await verify(token, c.env.JWT_SECRET) as any;
    c.set('user', payload);
    await next();
  } catch (error) {
    return c.json({ error: 'Token tidak valid' }, 401);
  }
};

// Get user profile
user.get('/profile', authMiddleware, async (c) => {
  try {
    const userPayload = c.get('user');
    
    const userData = await c.env.DB.prepare(`
      SELECT u.id, u.email, u.name, u.role, u.bio, u.created_at,
             w.balance
      FROM users u
      LEFT JOIN wallets w ON u.id = w.user_id
      WHERE u.id = ? AND u.is_active = true
    `).bind(userPayload.userId).first() as any;

    if (!userData) {
      return c.json({ error: 'User tidak ditemukan' }, 404);
    }

    return c.json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        bio: userData.bio,
        balance: userData.balance || 0,
        created_at: userData.created_at
      }
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

// Update user profile
user.put('/profile', authMiddleware, async (c) => {
  try {
    const userPayload = c.get('user');
    const body = await c.req.json();
    const { name, bio } = body;

    if (!name || name.trim().length === 0) {
      return c.json({ error: 'Nama tidak boleh kosong' }, 400);
    }

    const now = new Date().toISOString();
    
    await c.env.DB.prepare(`
      UPDATE users 
      SET name = ?, bio = ?, updated_at = ?
      WHERE id = ?
    `).bind(name.trim(), bio || null, now, userPayload.userId).run();

    return c.json({
      success: true,
      message: 'Profil berhasil diperbarui'
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

// Get user bank account
user.get('/bank-account', authMiddleware, async (c) => {
  try {
    const userPayload = c.get('user');
    
    const bankAccount = await c.env.DB.prepare(`
      SELECT id, bank_name, account_holder_name, account_number, created_at
      FROM bank_accounts
      WHERE user_id = ?
    `).bind(userPayload.userId).first() as any;

    return c.json({
      success: true,
      bankAccount: bankAccount || null
    });
  } catch (error: any) {
    console.error('Get bank account error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

// Update user bank account
user.put('/bank-account', authMiddleware, async (c) => {
  try {
    const userPayload = c.get('user');
    const body = await c.req.json();
    const { bank_name, account_holder_name, account_number } = body;

    if (!bank_name || !account_holder_name || !account_number) {
      return c.json({ error: 'Semua field harus diisi' }, 400);
    }

    const now = new Date().toISOString();
    
    // Check if bank account exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM bank_accounts WHERE user_id = ?'
    ).bind(userPayload.userId).first();

    if (existing) {
      // Update existing
      await c.env.DB.prepare(`
        UPDATE bank_accounts 
        SET bank_name = ?, account_holder_name = ?, account_number = ?, updated_at = ?
        WHERE user_id = ?
      `).bind(bank_name, account_holder_name, account_number, now, userPayload.userId).run();
    } else {
      // Create new
      await c.env.DB.prepare(`
        INSERT INTO bank_accounts (id, user_id, bank_name, account_holder_name, account_number, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(crypto.randomUUID(), userPayload.userId, bank_name, account_holder_name, account_number, now, now).run();
    }

    return c.json({
      success: true,
      message: 'Rekening bank berhasil diperbarui'
    });
  } catch (error: any) {
    console.error('Update bank account error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

export { user as userRoutes };
