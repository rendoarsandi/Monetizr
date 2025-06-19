import { NextResponse } from 'next/server';
import { verifyAuthToken, userRepository } from '@monetizr/db';

export async function GET(request: Request) {
  const user = await verifyAuthToken();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user profile from database
    const userProfile = await userRepository.findById(user.userId);

    if (!userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user profile without sensitive data
    return NextResponse.json({
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      bio: userProfile.bio,
      role: userProfile.role,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await verifyAuthToken();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, bio } = await request.json();

    // Validate input
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Update user profile in the database
    const success = await userRepository.update(user.userId, {
      name: name.trim(),
      bio: bio?.trim() || null,
    });

    if (!success) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    // Fetch updated profile
    const updatedProfile = await userRepository.findById(user.userId);

    return NextResponse.json({
      success: true,
      user: {
        id: updatedProfile!.id,
        name: updatedProfile!.name,
        email: updatedProfile!.email,
        bio: updatedProfile!.bio,
        role: updatedProfile!.role,
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}