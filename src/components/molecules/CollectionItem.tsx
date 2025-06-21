import { Folder, FolderOpen, ChevronRight, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Icon } from '@/components/atoms/Icon'
import { Label } from '@/components/atoms/Typography'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CollectionItemProps {
  id: string
  name: string
  isExpanded?: boolean
  isSelected?: boolean
  hasChildren?: boolean
  level?: number
  onClick?: (id: string) => void
  onToggle?: (id: string) => void
  onRename?: (id: string) => void
  onDelete?: (id: string) => void
  onCreateDocument?: (collectionId: string) => void
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
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.(id)
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle?.(id)
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors',
        'hover:bg-accent/50',
        isSelected && 'bg-accent',
        'ml-' + (level * 4)
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasChildren && (
        <Icon
          icon={isExpanded ? ChevronDown : ChevronRight}
          size="sm"
          onClick={handleToggle}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        />
      )}
      
      <Icon
        icon={isExpanded ? FolderOpen : Folder}
        size="sm"
        className="shrink-0 text-muted-foreground"
      />
      
      <Label className="flex-1 truncate text-sm">
        {name}
      </Label>
      
      {(isHovered || isSelected) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
              <Icon icon={MoreHorizontal} size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onCreateDocument?.(id)}>
              Add Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRename?.(id)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(id)} className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
} 