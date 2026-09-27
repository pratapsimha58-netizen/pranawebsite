import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-[4px] border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-[16px] text-[#212121] transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#93939f] focus-visible:border-[#9b60aa] focus-visible:ring-1 focus-visible:ring-[#9b60aa] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive md:text-[14px]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
