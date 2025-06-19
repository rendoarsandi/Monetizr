import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import type { Env } from '../index';

const campaigns = new Hono<{ Bindings: Env }>();

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

// Get all campaigns (for promoters)
campaigns.get('/', authMiddleware, async (c) => {
  try {
    const userPayload = c.get('user');
    
    let query = `
      SELECT c.id, c.title, c.description, c.budget, c.price_per_view, 
             c.requirements, c.status, c.created_at, c.expires_at,
             u.name as creator_name
      FROM campaigns c
      JOIN users u ON c.creator_id = u.id
      WHERE c.status = 'active'
    `;
    
    // If user is creator, show their campaigns
    if (userPayload.role === 'creator') {
      query = `
        SELECT c.id, c.title, c.description, c.budget, c.price_per_view, 
               c.requirements, c.status, c.created_at, c.expires_at,
               u.name as creator_name,
               COUNT(p.id) as promotion_count
        FROM campaigns c
        JOIN users u ON c.creator_id = u.id
        LEFT JOIN promotions p ON c.id = p.campaign_id
        WHERE c.creator_id = ?
        GROUP BY c.id
        ORDER BY c.created_at DESC
      `;
    }

    const campaigns = userPayload.role === 'creator' 
      ? await c.env.DB.prepare(query).bind(userPayload.userId).all()
      : await c.env.DB.prepare(query).all();

    return c.json({
      success: true,
      campaigns: campaigns.results || []
    });
  } catch (error: any) {
    console.error('Get campaigns error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

// Create new campaign (creators only)
campaigns.post('/', authMiddleware, async (c) => {
  try {
    const userPayload = c.get('user');
    
    if (userPayload.role !== 'creator') {
      return c.json({ error: 'Hanya creator yang dapat membuat campaign' }, 403);
    }

    const body = await c.req.json();
    const { title, description, budget, price_per_view, requirements, material_url } = body;

    if (!title || !description || !budget || !price_per_view) {
      return c.json({ error: 'Field wajib harus diisi' }, 400);
    }

    const campaignId = crypto.randomUUID();
    const now = new Date().toISOString();

    await c.env.DB.prepare(`
      INSERT INTO campaigns (id, creator_id, title, description, budget, price_per_view, 
                           requirements, material_url, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?)
    `).bind(
      campaignId, userPayload.userId, title, description, 
      budget, price_per_view, requirements || '', material_url || '', 
      now, now
    ).run();

    return c.json({
      success: true,
      message: 'Campaign berhasil dibuat',
      campaignId
    });
  } catch (error: any) {
    console.error('Create campaign error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

// Get campaign by ID
campaigns.get('/:id', authMiddleware, async (c) => {
  try {
    const campaignId = c.req.param('id');
    
    const campaign = await c.env.DB.prepare(`
      SELECT c.*, u.name as creator_name
      FROM campaigns c
      JOIN users u ON c.creator_id = u.id
      WHERE c.id = ?
    `).bind(campaignId).first() as any;

    if (!campaign) {
      return c.json({ error: 'Campaign tidak ditemukan' }, 404);
    }

    return c.json({
      success: true,
      campaign
    });
  } catch (error: any) {
    console.error('Get campaign error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

// Update campaign status
campaigns.put('/:id/status', authMiddleware, async (c) => {
  try {
    const userPayload = c.get('user');
    const campaignId = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    if (!['draft', 'active', 'paused', 'completed'].includes(status)) {
      return c.json({ error: 'Status tidak valid' }, 400);
    }

    // Check if user owns the campaign
    const campaign = await c.env.DB.prepare(
      'SELECT creator_id FROM campaigns WHERE id = ?'
    ).bind(campaignId).first() as any;

    if (!campaign) {
      return c.json({ error: 'Campaign tidak ditemukan' }, 404);
    }

    if (campaign.creator_id !== userPayload.userId && userPayload.role !== 'admin') {
      return c.json({ error: 'Tidak memiliki akses' }, 403);
    }

    const now = new Date().toISOString();
    
    await c.env.DB.prepare(`
      UPDATE campaigns 
      SET status = ?, updated_at = ?
      WHERE id = ?
    `).bind(status, now, campaignId).run();

    return c.json({
      success: true,
      message: 'Status campaign berhasil diperbarui'
    });
  } catch (error: any) {
    console.error('Update campaign status error:', error);
    return c.json({ error: 'Terjadi kesalahan' }, 500);
  }
});

export { campaigns as campaignRoutes };
