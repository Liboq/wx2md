import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: 'clay-button text-primary-foreground',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 backdrop-blur-md border border-white/20 shadow-[0_4px_16px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.4)] hover:shadow-[0_6px_24px_0_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0',
        outline:
          'clay-card border border-border/50 hover:border-primary/50 hover:bg-accent/50 hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 backdrop-blur-md border border-white/20 shadow-[0_4px_16px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:shadow-[0_6px_24px_0_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0',
        ghost:
          'hover:bg-accent/50 hover:text-accent-foreground backdrop-blur-sm',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 min-h-[44px] px-6 py-3 has-[>svg]:px-5 rounded-xl',
        sm: 'h-9 min-h-[44px] rounded-lg gap-1.5 px-4 has-[>svg]:px-3',
        lg: 'h-12 min-h-[44px] rounded-xl px-8 has-[>svg]:px-6 text-base',
        icon: 'size-11 min-h-[44px] min-w-[44px] rounded-xl',
        'icon-sm': 'size-9 min-h-[44px] min-w-[44px] rounded-lg',
        'icon-lg': 'size-12 min-h-[44px] min-w-[44px] rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
