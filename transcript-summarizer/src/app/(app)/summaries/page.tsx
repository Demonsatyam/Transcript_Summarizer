
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
import {Eye, Share2} from 'lucide-react';
import {format} from 'date-fns';
import {ShareDialog} from '@/components/share-dialog';
import { MOCK_TRANSCRIPTS, Transcript } from '@/lib/data';


export default function SummariesPage() {
  const transcripts: Transcript[] = MOCK_TRANSCRIPTS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">All Summaries</h1>
        <p className="text-muted-foreground">
          Browse and manage all your generated summaries.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summaries</CardTitle>
          <CardDescription>
            A complete list of your transcripts and their summaries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transcripts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Summary Snippet</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created Date
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transcripts.map(transcript => (
                  <TableRow key={transcript.id}>
                    <TableCell className="font-medium">
                      {transcript.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-sm truncate">
                      {transcript.summary}
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
              <p className="text-muted-foreground">No summaries found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
