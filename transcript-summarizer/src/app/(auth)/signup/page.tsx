"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth, createUserWithEmailAndPassword } from "@/lib/firebase.client";

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? "Creating account…" : "Create account"}
    </Button>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") || "");
      const password = String(form.get("password") || "");
      const confirmPassword = String(form.get("confirmPassword") || "");

      if (password !== confirmPassword) {
        setErr("Passwords do not match.");
        setLoading(false);
        return;
      }

      // 1) Create user with client SDK (no Admin SDK involved)
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 2) Ensure Firestore profile via backend (protected by ID token)
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/ensure-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await cred.user.getIdToken()}`,
        },
      });

      // 3) Redirect
      router.push("/dashboard");
    } catch (e: any) {
      const msg =
        e?.code === "auth/email-already-in-use"
          ? "This email is already in use. Try logging in instead."
          : e?.message || "Signup failed.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
        <CardDescription>Create an account to start summarizing.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          {err && <p className="text-sm text-red-600">{err}</p>}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" name="confirmPassword" required />
          </div>
          <SubmitButton loading={loading} />
        </CardContent>
      </form>
      <CardFooter className="text-sm">
        Already have an account?{" "}
        <Button variant="link" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
