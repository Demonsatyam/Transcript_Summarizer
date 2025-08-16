

import { MOCK_TRANSCRIPTS } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Logo} from '@/components/logo';
import {Quote} from 'lucide-react';

export default function SharedSummaryPage({
  params,
}: {
  params: {id: string};
}) {
  // In a real app, the ID would be a share ID, not a transcript ID.
  const data = MOCK_TRANSCRIPTS[0]; 
  const senderNote = "Check out this summary I generated!";

  return (
    <div className="flex flex-col min-h-screen items-center bg-muted/40 p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8">
          <Logo />
        </header>
        <main>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-headline">
                {data.title}
              </CardTitle>
              <CardDescription>You have been sent this summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {senderNote && (
                <div className="p-4 bg-muted rounded-lg border">
                  <Quote className="h-5 w-5 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground italic">
                    {senderNote}
                  </p>
                </div>
              )}
              <div className="prose prose-lg max-w-none text-foreground">
                <p>{data.summary}</p>
              </div>
            </CardContent>
          </Card>
        </main>
        <footer className="p-4 text-center text-muted-foreground text-sm mt-8">
          Powered by Transcript Summarizer
        </footer>
      </div>
    </div>
  );
}
