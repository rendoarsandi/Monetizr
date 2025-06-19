'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Label } from '@monetizr/ui';

const campaignSchema = z.object({
  title: z.string().min(1, 'Judul kampanye tidak boleh kosong'),
  description: z.string().min(10, 'Deskripsi harus minimal 10 karakter'),
  budget: z.number().min(10000, 'Budget minimal Rp 10.000'),
  pricePerView: z.number().min(100, 'Harga per tampilan minimal Rp 100'),
  requirements: z.string().optional(),
  materialUrl: z.string().url('URL materi tidak valid').optional(),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

interface CampaignFormProps {
  onSuccess?: () => void;
}

export function CampaignForm({ onSuccess }: CampaignFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
  });

  const onSubmit = async (data: CampaignFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gagal membuat kampanye');
      }

      alert('Kampanye berhasil dibuat!');
      reset();
      onSuccess?.();
    } catch (error: any) {
      alert(error.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Buat Kampanye Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kampanye</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Masukkan judul kampanye"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <textarea
              id="description"
              {...register('description')}
              placeholder="Jelaskan kampanye Anda"
              className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Rp)</Label>
              <Input
                id="budget"
                type="number"
                {...register('budget', { valueAsNumber: true })}
                placeholder="100000"
              />
              {errors.budget && (
                <p className="text-sm text-red-500">{errors.budget.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerView">Harga per Tampilan (Rp)</Label>
              <Input
                id="pricePerView"
                type="number"
                {...register('pricePerView', { valueAsNumber: true })}
                placeholder="150"
              />
              {errors.pricePerView && (
                <p className="text-sm text-red-500">{errors.pricePerView.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Persyaratan (Opsional)</Label>
            <textarea
              id="requirements"
              {...register('requirements')}
              placeholder="Persyaratan khusus untuk promotor"
              className="w-full min-h-[80px] px-3 py-2 border border-input rounded-md"
            />
            {errors.requirements && (
              <p className="text-sm text-red-500">{errors.requirements.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="materialUrl">URL Materi (Opsional)</Label>
            <Input
              id="materialUrl"
              {...register('materialUrl')}
              placeholder="https://drive.google.com/..."
            />
            {errors.materialUrl && (
              <p className="text-sm text-red-500">{errors.materialUrl.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Membuat...' : 'Buat Kampanye'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
