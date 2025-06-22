import { FileText, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Caption, Label } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DocumentItemProps {
  id: string;
  title: string;
  lastModified?: Date;
  isSelected?: boolean;
  level?: number;
  onClick?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export const DocumentItem = ({
  id,
  title,
  lastModified,
  isSelected = false,
  level = 0,
  onClick,
  onRename,
  onDelete,
  onDuplicate,
}: DocumentItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when interacting with dropdown
    if ((e.target as HTMLElement).closest('[data-radix-collection-item]') || 
        (e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick?.(id);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors",
        "hover:bg-accent/50",
        isSelected && "bg-accent",
        "ml-" + (level * 4 + 6), // Additional offset for documents under collections
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        icon={FileText}
        size="sm"
        className="shrink-0 text-muted-foreground"
      />

      <div className="flex-1 min-w-0">
        <Label className="block truncate text-sm">{title || "Untitled"}</Label>
        {lastModified && (
          <Caption className="text-xs">{formatDate(lastModified)}</Caption>
        )}
      </div>

      <div className={cn(
        "transition-opacity duration-200",
        (isHovered || isSelected) ? "opacity-100" : "opacity-0"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleDropdownClick}
            >
              <Icon icon={MoreHorizontal} size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={handleDropdownClick}>
            <DropdownMenuItem onClick={() => onRename?.(id)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(id)}>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(id)}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
