'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@monetizr/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@monetizr/ui";
import { Label } from "@monetizr/ui";
import { Input } from "@monetizr/ui";

const bankAccountSchema = z.object({
  bankName: z.string().min(1, { message: 'Nama bank tidak boleh kosong.' }),
  accountHolderName: z.string().min(1, { message: 'Nama pemilik rekening tidak boleh kosong.' }),
  accountNumber: z.string().min(1, { message: 'Nomor rekening tidak boleh kosong.' }),
});

type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

export default function BankAccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
  });

  const onSubmit = async (data: BankAccountFormValues) => {
    try {
      const response = await fetch('/api/user/bank-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan rekening bank');
      }

      alert('Rekening bank berhasil disimpan!');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan rekening bank');
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Informasi Rekening Bank</CardTitle>
            <CardDescription>Masukkan detail rekening bank Anda untuk menerima pembayaran.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Nama Bank</Label>
              <Input id="bankName" placeholder="Contoh: Bank Central Asia" {...register('bankName')} />
              {errors.bankName && <p className="text-sm text-red-500">{errors.bankName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Nama Pemilik Rekening</Label>
              <Input id="accountHolderName" placeholder="Nama sesuai buku tabungan" {...register('accountHolderName')} />
              {errors.accountHolderName && <p className="text-sm text-red-500">{errors.accountHolderName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Nomor Rekening</Label>
              <Input id="accountNumber" placeholder="xxxxxxxxxx" {...register('accountNumber')} />
              {errors.accountNumber && <p className="text-sm text-red-500">{errors.accountNumber.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Rekening'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}