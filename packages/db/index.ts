// Database schema and client for Monetizr platform
// Using Cloudflare D1 (SQLite) as the database

export interface User {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: 'creator' | 'promoter' | 'admin';
  bio?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface BankAccount {
  id: string;
  user_id: string;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  budget: number;
  price_per_view: number;
  requirements: string;
  material_url: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

export interface Promotion {
  id: string;
  campaign_id: string;
  promoter_id: string;
  tracking_link: string;
  status: 'active' | 'completed' | 'rejected';
  views_count: number;
  earnings: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'earning' | 'payment';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  reference_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  updated_at: string;
}

// Database initialization SQL
export const DB_SCHEMA = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('creator', 'promoter', 'admin')),
  bio TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Bank accounts table
CREATE TABLE IF NOT EXISTS bank_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_holder_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget REAL NOT NULL,
  price_per_view REAL NOT NULL,
  requirements TEXT,
  material_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT,
  FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Promotions table
CREATE TABLE IF NOT EXISTS promotions (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  promoter_id TEXT NOT NULL,
  tracking_link TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'rejected')),
  views_count INTEGER NOT NULL DEFAULT 0,
  earnings REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns (id) ON DELETE CASCADE,
  FOREIGN KEY (promoter_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'earning', 'payment')),
  amount REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  description TEXT NOT NULL,
  reference_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  balance REAL NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);
CREATE INDEX IF NOT EXISTS idx_campaigns_creator ON campaigns (creator_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns (status);
CREATE INDEX IF NOT EXISTS idx_promotions_campaign ON promotions (campaign_id);
CREATE INDEX IF NOT EXISTS idx_promotions_promoter ON promotions (promoter_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions (user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions (type);
`;

// Utility functions for database operations
export function generateId(): string {
  return crypto.randomUUID();
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

// Database client interface (for Cloudflare D1)
export interface DatabaseClient {
  prepare(query: string): {
    bind(...params: any[]): {
      first(): Promise<any>;
      all(): Promise<{ results: any[] }>;
      run(): Promise<{ success: boolean; meta: any }>;
    };
  };
  exec(query: string): Promise<any>;
}

// Mock database client for development
class MockDatabaseClient implements DatabaseClient {
  private data: Map<string, any[]> = new Map();

  constructor() {
    // Initialize with empty tables
    this.data.set('users', []);
    this.data.set('bank_accounts', []);
    this.data.set('campaigns', []);
    this.data.set('promotions', []);
    this.data.set('transactions', []);
    this.data.set('wallets', []);
  }

  prepare(query: string) {
    return {
      bind: (...params: any[]) => ({
        first: async () => {
          // Simple mock implementation
          if (query.includes('SELECT') && query.includes('users') && query.includes('email')) {
            const users = this.data.get('users') || [];
            return users.find((u: any) => u.email === params[0]) || null;
          }
          return null;
        },
        all: async () => {
          // Simple mock implementation
          if (query.includes('SELECT') && query.includes('users')) {
            return { results: this.data.get('users') || [] };
          }
          return { results: [] };
        },
        run: async () => {
          // Simple mock implementation for INSERT/UPDATE
          if (query.includes('INSERT INTO users')) {
            const users = this.data.get('users') || [];
            const newUser = {
              id: params[0],
              email: params[1],
              name: params[2],
              password_hash: params[3],
              role: params[4],
              bio: params[5] || null,
              created_at: getCurrentTimestamp(),
              updated_at: getCurrentTimestamp(),
              is_active: true
            };
            users.push(newUser);
            this.data.set('users', users);
            return { success: true, meta: { changes: 1 } };
          }
          return { success: true, meta: { changes: 0 } };
        }
      })
    };
  }

  async exec(query: string) {
    // Mock exec for schema creation
    return { success: true };
  }
}

// Database instance (will be replaced with actual D1 in production)
export const db: DatabaseClient = new MockDatabaseClient();

// Authentication utilities
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or similar
  // For now, simple base64 encoding (NOT SECURE - for development only)
  return btoa(password);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // In production, use bcrypt.compare
  // For now, simple comparison (NOT SECURE - for development only)
  return btoa(password) === hash;
}

// User repository functions
export const userRepository = {
  async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const id = generateId();
    const now = getCurrentTimestamp();
    const user: User = {
      ...userData,
      id,
      created_at: now,
      updated_at: now,
    };

    await db.prepare(`
      INSERT INTO users (id, email, name, password_hash, role, bio, created_at, updated_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      user.id,
      user.email,
      user.name,
      user.password_hash,
      user.role,
      user.bio,
      user.created_at,
      user.updated_at,
      user.is_active
    ).run();

    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.prepare(`
      SELECT * FROM users WHERE email = ? AND is_active = TRUE
    `).bind(email).first();

    return result as User | null;
  },

  async findById(id: string): Promise<User | null> {
    const result = await db.prepare(`
      SELECT * FROM users WHERE id = ? AND is_active = TRUE
    `).bind(id).first();

    return result as User | null;
  },

  async update(id: string, updates: Partial<Omit<User, 'id' | 'created_at'>>): Promise<boolean> {
    const updateFields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(getCurrentTimestamp()); // updated_at
    values.push(id); // WHERE condition

    const result = await db.prepare(`
      UPDATE users SET ${updateFields}, updated_at = ? WHERE id = ?
    `).bind(...values).run();

    return result.success;
  }
};

// Initialize database (run schema)
export async function initializeDatabase(): Promise<void> {
  try {
    await db.exec(DB_SCHEMA);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw error;
  }
}

// Export auth utilities
export * from './auth';