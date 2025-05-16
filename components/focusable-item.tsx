import type { ReactNode } from "react"

interface FocusableItemProps {
  children: ReactNode
  isFocused: boolean
  style?: "rectangular" | "circular"
}

export default function FocusableItem({ children, isFocused, style = "circular" }: FocusableItemProps) {
  const focusStyles = {
    rectangular: isFocused ? "scale-110 ring-2 ring-white shadow-xl z-20" : "scale-100",
    circular: isFocused ? "scale-110 ring-2 ring-white shadow-xl z-20" : "scale-100",
  }

  return (
    <div
      className={`
        transition-all duration-300 ease-out
        ${focusStyles[style]}
      `}
    >
      {children}
    </div>
  )
}
