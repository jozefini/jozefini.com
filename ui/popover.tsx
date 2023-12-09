'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

const css = {
  content:
    'z-50 w-72 rounded-md border border-neutral-200 bg-white p-4 text-neutral-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
}

const Popover = Root
const PopoverTrigger = Trigger

const PopoverContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(css.content, className)}
      {...props}
    />
  </Portal>
))
PopoverContent.displayName = Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
