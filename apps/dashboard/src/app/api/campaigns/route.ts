import { NextResponse } from 'next/server';
import { verifyAuthToken, generateId, getCurrentTimestamp } from '@monetizr/db';
import { z } from 'zod';

const campaignSchema = z.object({
  title: z.string().min(1, 'Judul kampanye tidak boleh kosong'),
  description: z.string().min(10, 'Deskripsi harus minimal 10 karakter'),
  budget: z.number().min(10000, 'Budget minimal Rp 10.000'),
  pricePerView: z.number().min(100, 'Harga per tampilan minimal Rp 100'),
  requirements: z.string().optional(),
  materialUrl: z.string().url('URL materi tidak valid').optional(),
});

export async function POST(request: Request) {
  const user = await verifyAuthToken();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (user.role !== 'creator') {
    return NextResponse.json({ error: 'Only creators can create campaigns' }, { status: 403 });
  }

  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = campaignSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { title, description, budget, pricePerView, requirements, materialUrl } = validationResult.data;

    // Create campaign (mock implementation for now)
    const campaign = {
      id: generateId(),
      creator_id: user.userId,
      title,
      description,
      budget,
      price_per_view: pricePerView,
      requirements: requirements || '',
      material_url: materialUrl || '',
      status: 'draft' as const,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };

    // In a real implementation, save to database
    console.log('Campaign created:', campaign);

    return NextResponse.json({ 
      success: true,
      campaign: {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        budget: campaign.budget,
        pricePerView: campaign.price_per_view,
        status: campaign.status,
      }
    });
  } catch (error: any) {
    console.error('Campaign creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan saat membuat kampanye' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const user = await verifyAuthToken();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Mock campaigns data
    const campaigns = [
      {
        id: '1',
        title: 'Promosi Produk Kecantikan',
        description: 'Kampanye untuk mempromosikan produk skincare terbaru',
        budget: 500000,
        pricePerView: 150,
        status: 'active',
        created_at: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        title: 'Review Gadget Terbaru',
        description: 'Kampanye review untuk smartphone flagship',
        budget: 1000000,
        pricePerView: 200,
        status: 'draft',
        created_at: '2024-01-16T14:30:00Z',
      },
    ];

    // Filter campaigns based on user role
    const filteredCampaigns = user.role === 'creator' 
      ? campaigns // Creators see their own campaigns
      : campaigns.filter(c => c.status === 'active'); // Promoters see only active campaigns

    return NextResponse.json({ campaigns: filteredCampaigns });
  } catch (error: any) {
    console.error('Campaigns fetch error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data kampanye' },
      { status: 500 }
    );
  }
}
