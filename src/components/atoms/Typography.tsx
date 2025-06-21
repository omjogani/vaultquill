import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export const H1 = ({ children, className }: TypographyProps) => {
  return (
    <h1 className={cn('text-4xl font-bold tracking-tight text-foreground', className)}>
      {children}
    </h1>
  )
}

export const H2 = ({ children, className }: TypographyProps) => {
  return (
    <h2 className={cn('text-3xl font-semibold tracking-tight text-foreground', className)}>
      {children}
    </h2>
  )
}

export const H3 = ({ children, className }: TypographyProps) => {
  return (
    <h3 className={cn('text-2xl font-semibold tracking-tight text-foreground', className)}>
      {children}
    </h3>
  )
}

export const H4 = ({ children, className }: TypographyProps) => {
  return (
    <h4 className={cn('text-xl font-semibold tracking-tight text-foreground', className)}>
      {children}
    </h4>
  )
}

export const Body = ({ children, className }: TypographyProps) => {
  return (
    <p className={cn('text-base text-foreground/80 leading-relaxed', className)}>
      {children}
    </p>
  )
}

export const Caption = ({ children, className }: TypographyProps) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  )
}

export const Label = ({ children, className }: TypographyProps) => {
  return (
    <span className={cn('text-sm font-medium text-foreground', className)}>
      {children}
    </span>
  )
} 