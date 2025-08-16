
'use client';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {Sparkles} from 'lucide-react';
import {useRouter} from 'next/navigation';

function SubmitButton() {
  return (
    <Button
      type="submit"
      className="w-full sm:w-auto bg-accent hover:bg-accent/90"
    >
      Generate Summary
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function UploadPage() {
  const router = useRouter();
  const {toast} = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: 'This is a frontend-only prototype.',
      description: 'The summary generation is not implemented. Redirecting to a sample summary.',
    });
    setTimeout(() => {
      router.push('/summary/1');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-headline">New Summary</h1>
          <p className="text-muted-foreground">
            Paste your transcript below to generate a new summary.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>
              Provide a title and the full transcript text. You can also provide
              an optional custom prompt to guide the summarization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., 'Project Kick-off Meeting'"
                required
              />
            </div>
            <div>
              <Label htmlFor="transcript">Transcript</Label>
              <Textarea
                id="transcript"
                name="transcript"
                placeholder="Paste your full transcript here..."
                className="min-h-[300px] text-base"
                required
              />
            </div>
            <div>
              <Label htmlFor="customPrompt">Custom Prompt (Optional)</Label>
              <Input
                id="customPrompt"
                name="customPrompt"
                placeholder="e.g., 'Focus on action items and deadlines.'"
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
