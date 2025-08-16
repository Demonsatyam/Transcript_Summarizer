'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { auth, signInWithEmailAndPassword } from '@/lib/firebase.client';
import GoogleButton from '@/components/GoogleButton';

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? 'Signing in…' : 'Sign in'}
    </Button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get('email') || '');
      const password = String(form.get('password') || '');

      // Firebase client-side login
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect on success
      router.push('/dashboard');
    } catch (e: any) {
      setErr(e?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          {err && (
            <p className="text-sm text-red-600" role="alert" aria-live="polite">
              {err}
            </p>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>

          <SubmitButton loading={loading} />
        </CardContent>
      </form>

      <div className="relative">
      <div className="my-3 h-px bg-muted" />
        <GoogleButton />
      </div>

      <CardFooter className="text-sm">
        Don&apos;t have an account?{' '}
        <Button variant="link" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
