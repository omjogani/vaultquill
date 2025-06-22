import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Label } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface CollectionItemProps {
  id: string;
  name: string;
  isExpanded?: boolean;
  isSelected?: boolean;
  hasChildren?: boolean;
  level?: number;
  onClick?: (id: string) => void;
  onToggle?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCreateDocument?: (collectionId: string) => void;
}

export const CollectionItem = ({
  id,
  name,
  isExpanded = false,
  isSelected = false,
  hasChildren = false,
  level = 0,
  onClick,
  onToggle,
  onRename,
  onDelete,
  onCreateDocument,
}: CollectionItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-radix-collection-item]') || 
        (e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick?.(id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.(id);
  };

  const handleToggleClick = () => {
    onToggle?.(id);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
        "hover:bg-accent/50",
        isSelected && "bg-accent",
        "ml-" + level * 4,
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasChildren && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-accent/50"
          onClick={handleToggle}
        >
          <Icon
            icon={isExpanded ? ChevronDown : ChevronRight}
            size="sm"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          />
        </Button>
      )}

      <Icon
        icon={isExpanded ? FolderOpen : Folder}
        size="sm"
        className="shrink-0 text-muted-foreground"
      />

      <Label className="flex-1 truncate text-sm">{name}</Label>

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
            <DropdownMenuItem onClick={() => onCreateDocument?.(id)}>
              Add Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRename?.(id)}>
              Rename
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
