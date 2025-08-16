import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
              Effortless Transcription Summaries
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Turn lengthy transcripts into concise summaries with the power of AI.
              Upload your text, provide custom instructions, and get your summary in seconds.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
        </div>
      </main>
      <footer className="p-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Transcript Summarizer. All rights reserved.
      </footer>
    </div>
  );
}
