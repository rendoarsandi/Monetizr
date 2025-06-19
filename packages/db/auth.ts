import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface AuthUser {
  userId: string;
  email: string;
  role: 'creator' | 'promoter' | 'admin';
}

export async function verifyAuthToken(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'development-secret-key'
    ) as AuthUser;

    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function requireAuth(handler: (user: AuthUser, request: Request) => Promise<Response>) {
  return async (request: Request) => {
    const user = await verifyAuthToken();
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return handler(user, request);
  };
}

export function requireRole(roles: string[]) {
  return (handler: (user: AuthUser, request: Request) => Promise<Response>) => {
    return async (request: Request) => {
      const user = await verifyAuthToken();
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }), 
          { 
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      if (!roles.includes(user.role)) {
        return new Response(
          JSON.stringify({ error: 'Forbidden' }), 
          { 
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return handler(user, request);
    };
  };
}
