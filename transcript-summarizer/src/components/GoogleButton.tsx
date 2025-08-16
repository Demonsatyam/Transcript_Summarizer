'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase.client';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getAdditionalUserInfo } from 'firebase/auth';

export default function GoogleButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInGoogle() {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      let cred;
      try {
        cred = await signInWithPopup(auth, provider);
      } catch (e: any) {
        // Fallback for popup blockers / mobile web
        await signInWithRedirect(auth, provider);
        return;
      }

      // Optionally check if this is a new user
      const info = getAdditionalUserInfo(cred);
      // Call backend to ensure profile exists (safe to call every time)
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/ensure-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await cred.user.getIdToken()}`,
        },
      });

      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button type="button" onClick={signInGoogle} variant="outline" className="w-full" disabled={loading}>
      {loading ? 'Connecting…' : 'Continue with Google'}
    </Button>
  );
}
