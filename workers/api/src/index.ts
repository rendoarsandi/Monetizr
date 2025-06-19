import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { campaignRoutes } from './routes/campaigns';

export interface Env {
  DB: D1Database;
  SESSIONS: KVNamespace;
  STORAGE?: R2Bucket;
  JWT_SECRET: string;
  CORS_ORIGINS: string;
}

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use('*', async (c, next) => {
  const corsOrigins = c.env.CORS_ORIGINS.split(',');
  return cors({
    origin: corsOrigins,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })(c, next);
});

// Health check
app.get('/', (c) => {
  return c.json({ 
    message: 'Monetizr API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
app.route('/auth', authRoutes);
app.route('/user', userRoutes);
app.route('/campaigns', campaignRoutes);

// Global error handler
app.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({ 
    error: 'Internal Server Error',
    message: err.message 
  }, 500);
});

export default app;
