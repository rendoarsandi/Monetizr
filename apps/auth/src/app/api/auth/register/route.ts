import { NextResponse } from 'next/server';
import { userRepository, hashPassword, initializeDatabase, generateId } from '@monetizr/db';
import { z } from 'zod';

// Initialize database on first request
let dbInitialized = false;

const registerSchema = z.object({
  name: z.string().min(1, 'Nama lengkap tidak boleh kosong'),
  email: z.string().email('Alamat email tidak valid'),
  password: z.string().min(8, 'Password harus minimal 8 karakter'),
  role: z.enum(['creator', 'promoter']).optional().default('promoter'),
});

export async function POST(request: Request) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    
    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, role } = validationResult.data;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const newUser = await userRepository.create({
      email,
      name,
      password_hash: passwordHash,
      role,
      bio: null,
      is_active: true,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Akun berhasil dibuat. Silakan login.',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan saat mendaftar' },
      { status: 500 }
    );
  }
}
