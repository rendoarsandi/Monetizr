'use client';

import React, { useState, useEffect } from 'react';
import { CampaignForm } from '../../../components/campaign-form';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@monetizr/ui';

interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  pricePerView: number;
  status: string;
  created_at: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCampaignCreated = () => {
    setShowForm(false);
    fetchCampaigns();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Kampanye</h1>
        </div>
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kampanye</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Tutup Form' : 'Buat Kampanye Baru'}
        </Button>
      </div>

      {showForm && (
        <div className="flex justify-center">
          <CampaignForm onSuccess={handleCampaignCreated} />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Belum ada kampanye. Buat kampanye pertama Anda!
          </div>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : campaign.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {campaign.status === 'active' ? 'Aktif' : 
                     campaign.status === 'draft' ? 'Draft' : 
                     campaign.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {campaign.description}
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span className="font-medium">{formatCurrency(campaign.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per Tampilan:</span>
                    <span className="font-medium">{formatCurrency(campaign.pricePerView)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dibuat:</span>
                    <span>{formatDate(campaign.created_at)}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
