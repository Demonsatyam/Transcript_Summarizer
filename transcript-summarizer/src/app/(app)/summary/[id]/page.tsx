
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Copy, RefreshCw, Save, Share2} from 'lucide-react';
import {ShareDialog} from '@/components/share-dialog';
import {useToast} from '@/hooks/use-toast';
import React, {useState, useEffect} from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {Transcript} from '@/lib/data';
import {MOCK_TRANSCRIPTS} from '@/lib/data';
import {useRouter} from 'next/navigation';

function ReSummarizeButton() {
  const {toast} = useToast();
  const handleClick = () => {
    toast({title: "This is a frontend-only prototype.", description: "Re-summarize functionality is not implemented."})
  }
  return (
    <Button onClick={handleClick}>
      Re-summarize
    </Button>
  );
}

function SaveVersionButton() {
  const {toast} = useToast();
   const handleClick = () => {
    toast({title: "This is a frontend-only prototype.", description: "Save version functionality is not implemented."})
  }
  return (
    <Button
      onClick={handleClick}
      className="bg-accent hover:bg-accent/90"
    >
      <Save className="mr-2 h-4 w-4" />
      Save Version
    </Button>
  );
}

export default function SummaryPage({params}: {params: {id: string}}) {
  const {toast} = useToast();
  const router = useRouter();
  const [transcriptData, setTranscriptData] = useState<Transcript | null>(null);
  const [summary, setSummary] = useState('');
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const transcript = MOCK_TRANSCRIPTS.find(t => t.id === params.id);
    if (transcript) {
      setTranscriptData(transcript);
      setSummary(transcript.summary);
    } else {
      // In a real app you might show a 404 page
      router.push('/dashboard');
    }
  }, [params.id, router]);


  if (!transcriptData) {
    // TODO: Add a skeleton loader here
    return <div>Loading...</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const handleVersionChange = (value: string) => {
    setSummary(value);
    toast({title: 'Version Restored'});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            {transcriptData.title}
          </h1>
          <p className="text-muted-foreground">
            Edit, share, and manage your summary.
          </p>
        </div>
        <div className="flex gap-2">
          <ShareDialog transcriptId={transcriptData.id}>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </ShareDialog>
          <SaveVersionButton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>You can edit the text below.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="min-h-[400px] text-base"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full justify-start"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Text
              </Button>

              <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="mr-2 h-4 w-4" /> Re-summarize
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Re-summarize
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Use a new prompt to generate a different summary.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="prompt">New Prompt</Label>
                        <Input
                          id="prompt"
                          name="prompt"
                          placeholder="Focus on action items"
                        />
                      </div>
                      <ReSummarizeButton />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {transcriptData.versions && transcriptData.versions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Versions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="version">Restore a previous version</Label>
                  <Select onValueChange={handleVersionChange}>
                    <SelectTrigger id="version">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {transcriptData.versions
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .map((v, i) => (
                          <SelectItem key={i} value={v.summary}>
                            {new Date(v.createdAt).toLocaleString()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
