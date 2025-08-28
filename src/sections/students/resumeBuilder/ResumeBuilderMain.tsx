import { useResumeData } from "./useResumeData";
import ResumeHeader from "./ResumeHeader";
import ResumePreview from "./ResumePreview";
import AIChatAssistant from "./AIChatAssistant";

const ResumeBuilderMain = () => {
  const {
    resumeData,
    showChat,
    setShowChat,
    messages,
    inputMessage,
    setInputMessage,
    isGenerating,
    isDownloading,
    resumeRef,
    handleSendMessage,
    downloadAsPDF
  } = useResumeData();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Resume Preview - Left Side */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <ResumeHeader
            onShowChat={() => setShowChat(true)}
            onDownloadPDF={downloadAsPDF}
            isDownloading={isDownloading}
          />

          {/* Resume Preview */}
          <ResumePreview
            resumeData={resumeData}
            ref={resumeRef}
          />
        </div>
      </div>

      {/* AI Chat Assistant - Right Side */}
      <AIChatAssistant
        showChat={showChat}
        onCloseChat={() => setShowChat(false)}
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default ResumeBuilderMain;
