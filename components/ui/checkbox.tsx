"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"

const Checkbox = React.forwardRef< React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> >(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer flex size-5 shrink-0 items-center justify-center rounded-lg border-2 border-neutal-100 bg-neutal-200/50 dark:border-neutal-700 dark:bg-neutal-900/50 shadow-md transition-all duration-300 ease-out",
      "hover:border-neutal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
      "data-[state=checked]:bg-blue-500! data-[state=checked]:border-blue-500!",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-white animate-in zoom-in-50 duration-200")}
    >
      <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }