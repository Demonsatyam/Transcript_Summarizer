
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Eye, PlusCircle, Share2} from 'lucide-react';
import {format} from 'date-fns';
import {ShareDialog} from '@/components/share-dialog';
import { MOCK_TRANSCRIPTS } from '@/lib/data';

export default function Dashboard() {
  const recentTranscripts = MOCK_TRANSCRIPTS.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">
            An overview of your recent transcripts.
          </p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90">
          <Link href="/upload">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Summary
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transcripts</CardTitle>
          <CardDescription>
            View, manage, and share your generated summaries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentTranscripts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created Date
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTranscripts.map(transcript => (
                  <TableRow key={transcript.id}>
                    <TableCell className="font-medium">
                      {transcript.title}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(transcript.createdAt), 'PPP')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/summary/${transcript.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <ShareDialog transcriptId={transcript.id}>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share</span>
                          </Button>
                        </ShareDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transcripts yet.</p>
              <Button asChild variant="link">
                <Link href="/upload">Create your first summary</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
