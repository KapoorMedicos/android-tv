import Image from "next/image"
import type { Content } from "@/lib/types"

interface ContentBannerProps {
  item: Content
  isFocused: boolean
}

export default function ContentBanner({ item, isFocused }: ContentBannerProps) {
  return (
    <div className="relative flex-shrink-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={item.backdropPath}
          alt={item.title}
          fill
          className="object-cover"
          priority
          unoptimized
          sizes="100vw"
          style={{
            objectPosition: "center top",
            transform: "scale(1.25)"
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute bottom-12 left-0 p-12 w-1/2">
        <h1 className={`text-5xl font-bold mb-3 ${isFocused ? "text-white" : "text-white/90"}`}>{item.title}</h1>
        <div className="flex items-center space-x-4 mb-4">
          <span className="bg-white/20 px-3 py-1 rounded text-sm">{item.releaseYear}</span>
          <span className="bg-white/20 px-3 py-1 rounded text-sm">{item.rating}</span>
          <span className="bg-white/20 px-3 py-1 rounded text-sm">{item.runtime}</span>
        </div>
        <p className="text-gray-300 mb-4 text-lg line-clamp-3">{item.overview}</p>
      </div>
    </div>
  )
}
