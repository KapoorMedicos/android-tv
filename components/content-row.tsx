"use client"

import type { Content } from "@/lib/types"
import FocusableItem from "./focusable-item"
import Image from "next/image"
import { useRef, useEffect } from "react"

interface ContentRowProps {
  title: string
  items: Content[]
  isFocused: boolean
  focusedItemIndex: number
  loading: boolean
}

export default function ContentRow({ title, items, isFocused, focusedItemIndex, loading }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  // Scroll to focused item when it changes
  useEffect(() => {
    if (isFocused && rowRef.current && focusedItemIndex >= 0) {
      const container = rowRef.current
      const items = container.querySelectorAll(".content-item")

      if (items[focusedItemIndex]) {
        const item = items[focusedItemIndex] as HTMLElement
        const containerLeft = container.getBoundingClientRect().left
        const containerWidth = container.clientWidth
        const itemLeft = item.getBoundingClientRect().left
        const itemWidth = item.clientWidth

        // Calculate the scroll position to center the item
        const scrollLeft = itemLeft - containerLeft - containerWidth / 2 + itemWidth / 2

        container.scrollTo({
          left: container.scrollLeft + scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [isFocused, focusedItemIndex])

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-semibold ${isFocused ? "text-white" : "text-gray-300"}`}>{title}</h2>
      <div ref={rowRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {loading
          ? // Loading skeletons
            Array(5)
              .fill(0)
              .map((_, i) => <div key={i} className="flex-shrink-0 w-64 h-36 bg-gray-800 rounded-lg animate-pulse" />)
          : items.map((item, index) => (
              <FocusableItem key={item.id} isFocused={isFocused && focusedItemIndex === index}>
                <div className="relative flex-shrink-0 w-64 h-36 rounded-lg overflow-hidden group content-item">
                  <Image
                    src={item.posterPath || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-gray-300">{item.releaseYear}</p>
                  </div>
                </div>
              </FocusableItem>
            ))}
      </div>
    </div>
  )
}
