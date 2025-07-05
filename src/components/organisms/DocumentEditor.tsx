import { Download, MoreHorizontal, Save, Share } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Caption, H1 } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Editor from "@/config/editor/Editor";

interface Document {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
  collectionId?: string;
}

interface DocumentEditorProps {
  document?: Document;
  className?: string;
}

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

export const DocumentEditor = ({
  document,
  className,
}: DocumentEditorProps) => {
  const [data, setData] = useState(INITIAL_DATA);

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
            value="hello"
            onChange={() => {}}
            placeholder="Untitled"
            className="text-2xl font-bold border-none p-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("Data: ", data)}
            disabled={false}
            className="gap-2"
          >
            <Icon icon={Save} size="sm" />
            {false ? "Saving..." : "Save"}
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

      <div className="flex-1 p-8">
        <Editor
          data={data}
          onChange={setData}
          editorBlock="editorjs-container"
        />
      </div>
    </div>
  );
};
