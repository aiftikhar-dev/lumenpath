import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error: string | null;
  clearError: () => void;
}

const ErrorDisplay = ({ error, clearError }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-sm">!</span>
          </div>
          <p className="text-red-800 text-sm">
            Connection error: {error}. Please try again.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearError}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Dismiss
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.reload()}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
