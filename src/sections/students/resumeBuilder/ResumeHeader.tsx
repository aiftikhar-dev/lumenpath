import { Button } from "@/components/ui/button";
import { Download, Loader2, MessageSquare } from "lucide-react";

interface ResumeHeaderProps {
  onShowChat: () => void;
  onDownloadPDF: () => void;
  isDownloading: boolean;
}

const ResumeHeader = ({ onShowChat, onDownloadPDF, isDownloading }: ResumeHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <p className="text-muted-foreground">Create and customize your professional resume with AI assistance</p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={onShowChat}
          variant="outline"
          className="flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          AI Assistant
        </Button>
        <Button
          onClick={onDownloadPDF}
          disabled={isDownloading}
          className="flex items-center gap-2"
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default ResumeHeader;
