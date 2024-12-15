'use client';

import React, { useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import { BASE_API_URL } from '@/lib/constants';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    // Call the logout endpoint to clear the cookie
    const performSignOut = async () => {
      try {
        await axios.get(`${BASE_API_URL}/auth/logout`, { withCredentials: true });
        // Redirect to login page after successful logout
        router.replace('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    performSignOut();
  }, [router]);

  return (
    <div>
      <p>Signing you out...</p>
    </div>
  );
}
