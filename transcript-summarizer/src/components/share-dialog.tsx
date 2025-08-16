
'use client';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {Copy} from 'lucide-react';
import {type ReactNode, useState} from 'react';

export function ShareDialog({
  children,
  transcriptId,
}: {
  children: ReactNode;
  transcriptId: string;
}) {
  const {toast} = useToast();
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const link = `${window.location.origin}/share/${transcriptId}`;
    setShareLink(link);
    toast({
      title: 'Share Link Created',
      description: 'Your shareable link is ready.',
    });
    
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    toast({title: 'Link copied to clipboard!'});
  };

  return (
    <Dialog onOpenChange={() => setShareLink('')}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {shareLink ? (
          <div>
            <DialogHeader>
              <DialogTitle>Share Link</DialogTitle>
              <DialogDescription>
                Anyone with this link can view the summary.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 my-4">
              <Input value={shareLink} readOnly />
              <Button type="button" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setShareLink('')}>
                Create a new link
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Share Summary</DialogTitle>
              <DialogDescription>
                Add an optional note and generate a shareable link.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Note
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Check out this summary!"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Link'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
