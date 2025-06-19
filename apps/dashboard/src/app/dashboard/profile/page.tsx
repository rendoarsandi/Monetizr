'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@monetizr/ui";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@monetizr/ui";
import { Label } from "@monetizr/ui";
import { Input } from "@monetizr/ui";

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Nama tidak boleh kosong.' }),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; bio?: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Gagal mengambil data profil');
        const userData = await response.json();
        setUser(userData);
        reset(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui profil');
      }

      // Update local state
      setUser(data);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat memperbarui profil');
    }
  };

  if (!user) return <div>Memuat...</div>;

  return (
    <div className="p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Profil Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" placeholder="Nama Anda" {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Tentang Anda" {...register('bio')} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}