'use client';

import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@monetizr/ui";
import { Label } from "@monetizr/ui";
import { Input } from "@monetizr/ui";
import { Button } from "@monetizr/ui";

const signupSchema = z.object({
  name: z.string().min(1, { message: 'Nama lengkap tidak boleh kosong.' }),
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(8, { message: 'Password harus minimal 8 karakter.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: 'promoter', // Default role, can be changed based on URL params
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Pendaftaran gagal. Coba lagi nanti.');
      }

      // Show success message and redirect to login
      alert('Pendaftaran berhasil! Silakan login dengan akun Anda.');
      window.location.href = '/auth/login';

    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Terjadi kesalahan saat mendaftar');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Daftar Akun PromotePro</CardTitle>
            <CardDescription>Buat akun baru untuk memulai perjalanan Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" type="text" placeholder="John Doe" {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Konfirmasi Password</Label>
              <Input id="confirm-password" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Daftar'}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-sm text-center">
            <p>
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}