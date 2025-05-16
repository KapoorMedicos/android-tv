"use client"

import { useEffect, useState, useRef } from "react"

interface SelectionBoxProps {
  targetRef: HTMLDivElement | null
  padding?: number
}

export default function SelectionBox({ targetRef, padding = 8 }: SelectionBoxProps) {
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const prevPositionRef = useRef({ left: 0, top: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!targetRef) return

    // Function to update position
    const updatePosition = () => {
      const rect = targetRef.getBoundingClientRect()
      const newPosition = {
        left: rect.left - padding,
        top: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      }

      // Only update if position has actually changed
      const prevPos = prevPositionRef.current
      if (
        prevPos.left !== newPosition.left ||
        prevPos.top !== newPosition.top ||
        prevPos.width !== newPosition.width ||
        prevPos.height !== newPosition.height
      ) {
        prevPositionRef.current = newPosition
        setPosition(newPosition)
        if (!isVisible) setIsVisible(true)
      }
    }

    // Update position immediately
    updatePosition()

    // Set up resize observer to update position when element size changes
    const resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame to throttle updates
      requestAnimationFrame(updatePosition)
    })
    resizeObserver.observe(targetRef)

    // Set up scroll listener instead of mutation observer
    const handleScroll = () => {
      requestAnimationFrame(updatePosition)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [targetRef, padding]) // Remove isVisible from dependencies

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none windows11-glass z-20"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
        borderRadius: "12px",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  )
}
