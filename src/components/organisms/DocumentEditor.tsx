import { Save, MoreHorizontal, Share, Download } from "lucide-react";
import { Icon } from "@/components/atoms/Icon";
import { H1, Caption } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

interface Document {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
  collectionId?: string;
}

interface DocumentEditorProps {
  document?: Document;
  onSave?: (document: Partial<Document>) => void;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
  className?: string;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

export const DocumentEditor = ({
  document,
  onSave,
  onTitleChange,
  onContentChange,
  className,
  autoSave = true,
  autoSaveDelay = 2000,
}: DocumentEditorProps) => {
  const [title, setTitle] = useState(document?.title || "");
  const [content, setContent] = useState(document?.content || "");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(
    document?.lastModified || null,
  );

  // Auto-save functionality
  const saveDocument = useCallback(async () => {
    if (!document?.id) return;

    setIsSaving(true);
    try {
      await onSave?.({
        id: document.id,
        title: title || "Untitled",
        content,
        lastModified: new Date(),
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error("Failed to save document:", error);
    } finally {
      setIsSaving(false);
    }
  }, [document?.id, title, content, onSave]);

  // Debounced auto-save
  useEffect(() => {
    if (!autoSave || !document?.id) return;

    const timer = setTimeout(() => {
      if (title !== document.title || content !== document.content) {
        saveDocument();
      }
    }, autoSaveDelay);

    return () => clearTimeout(timer);
  }, [
    title,
    content,
    document?.title,
    document?.content,
    saveDocument,
    autoSave,
    autoSaveDelay,
  ]);

  // Update local state when document changes
  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setContent(document.content);
      setLastSaved(document.lastModified);
    }
  }, [document]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange?.(newContent);
  };

  const handleManualSave = () => {
    saveDocument();
  };

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);

    if (diffInMinutes < 1) {
      return "Saved just now";
    } else if (diffInMinutes < 60) {
      return `Saved ${Math.floor(diffInMinutes)} minutes ago`;
    } else {
      return `Saved at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  };

  if (!document) {
    return (
      <div
        className={cn(
          "flex items-center justify-center h-full bg-background",
          className,
        )}
      >
        <div className="text-center space-y-4">
          <H1 className="text-muted-foreground">Select a document to edit</H1>
          <Caption>
            Choose a document from the sidebar or create a new one
          </Caption>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex-1 min-w-0">
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled"
            className="text-2xl font-bold border-none p-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          {lastSaved && (
            <Caption className="mt-1">
              {isSaving ? "Saving..." : formatLastSaved(lastSaved)}
            </Caption>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleManualSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Icon icon={Save} size="sm" />
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Icon icon={MoreHorizontal} size="sm" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Icon icon={Share} size="sm" className="mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={Download} size="sm" className="mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-8">
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
          className={cn(
            "w-full h-full resize-none border-none bg-transparent shadow-none focus-visible:ring-0",
            "text-base leading-relaxed placeholder:text-muted-foreground/50",
            "font-normal tracking-normal",
          )}
        />
      </div>
    </div>
  );
};
