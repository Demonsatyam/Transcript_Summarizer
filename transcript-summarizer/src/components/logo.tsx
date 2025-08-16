import { FileText } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold text-xl">
      <FileText className="h-6 w-6 text-primary" />
      <span className="font-headline">Transcript Summarizer</span>
    </div>
  );
}
