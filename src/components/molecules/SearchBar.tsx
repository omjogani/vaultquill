import { Search, X } from 'lucide-react'
import { Icon } from '@/components/atoms/Icon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  className?: string
  autoFocus?: boolean
}

export const SearchBar = ({
  placeholder = "Search documents...",
  value = "",
  onChange,
  onClear,
  className,
  autoFocus = false,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const handleClear = () => {
    onChange?.("")
    onClear?.()
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Icon
          icon={Search}
          size="sm"
          className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors",
            isFocused ? "text-foreground" : "text-muted-foreground"
          )}
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          className={cn(
            "pl-9 pr-9 transition-all duration-200",
            isFocused && "ring-2 ring-ring ring-offset-2"
          )}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
          >
            <Icon icon={X} size="sm" />
          </Button>
        )}
      </div>
    </div>
  )
} 