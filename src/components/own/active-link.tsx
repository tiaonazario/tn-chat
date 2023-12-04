'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ActiveLinkProps extends LinkProps {
  label: string
  icon: React.ReactNode
  className?: string
  showLabel?: boolean
}

export const ActiveLink = ({
  icon,
  label,
  className,
  showLabel,
  ...rest
}: ActiveLinkProps) => {
  const isActive = rest.href === usePathname()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            {...rest}
            data-active={isActive}
            className={cn(
              'flex items-center justify-center gap-2 rounded p-2 text-muted-foreground hover:bg-accent/20 hover:text-accent-foreground data-[active=true]:text-accent-foreground',
              className,
            )}
          >
            <Slot className="h-6 w-6">{icon}</Slot>
            {showLabel ? <span className="">{label}</span> : null}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="rounded" side="right">
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
