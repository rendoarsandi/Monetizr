'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@monetizr/ui";
import { Label } from "@monetizr/ui";
import { Input } from "@monetizr/ui";
import { Button } from "@monetizr/ui";

const loginSchema = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(1, { message: 'Password tidak boleh kosong.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login gagal. Periksa kembali email dan password Anda.');
      }

      // Redirect to dashboard subdomain
      router.push('https://dashboard.monetizr.com');

    } catch (error) {
      console.error(error);
      // Tampilkan pesan error ke pengguna menggunakan toast atau state
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Login ke PromotePro</CardTitle>
            <CardDescription>Masukkan email dan password Anda untuk mengakses dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Login'}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-sm text-center">
            <Link href="/auth/forgot-password">
              Lupa Password?
            </Link>
            <p>
              Belum punya akun?{" "}
              <Link href="/auth/register">
                Daftar Sekarang
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}