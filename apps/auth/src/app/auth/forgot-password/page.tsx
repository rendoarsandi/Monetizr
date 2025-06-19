'use client';

import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@monetizr/ui";
import { Label } from "@monetizr/ui";
import { Input } from "@monetizr/ui";
import { Button } from "@monetizr/ui";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      // Panggil API BetterAuth untuk mengirim link reset
      console.log("Mengirim link reset untuk:", data.email);
      // const response = await fetch('https://api.betterauth.com/v1/password-reset', { ... });
      // if (!response.ok) throw new Error("Gagal mengirim email.");
      alert("Jika email Anda terdaftar, Anda akan menerima link reset.");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Lupa Password?</CardTitle>
            <CardDescription>Masukkan email Anda, kami akan mengirimkan instruksi untuk reset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Kirim Link Reset'}
            </Button>
          </CardContent>
          <CardFooter className="text-sm text-center">
            <Link href="/auth/login" className="underline">
              Kembali ke Login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}