import { FileText, MoreHorizontal } from 'lucide-react'
import { Icon } from '@/components/atoms/Icon'
import { Label, Caption } from '@/components/atoms/Typography'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface DocumentItemProps {
  id: string
  title: string
  lastModified?: Date
  isSelected?: boolean
  level?: number
  onClick?: (id: string) => void
  onRename?: (id: string) => void
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
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
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.(id)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors',
        'hover:bg-accent/50',
        isSelected && 'bg-accent',
        'ml-' + (level * 4 + 6) // Additional offset for documents under collections
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
        <Label className="block truncate text-sm">
          {title || 'Untitled'}
        </Label>
        {lastModified && (
          <Caption className="text-xs">
            {formatDate(lastModified)}
          </Caption>
        )}
      </div>
      
      {(isHovered || isSelected) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
              <Icon icon={MoreHorizontal} size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onRename?.(id)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(id)}>
              Duplicate
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