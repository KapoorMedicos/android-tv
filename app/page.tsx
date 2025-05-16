"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AppIcon } from "@/components/app-icon"
import ContentBanner from "@/components/content-banner"
import { fetchPopularContent } from "@/lib/api"
import type { Content } from "@/lib/types"
import Clock from "@/components/clock"

export default function Home() {
  const [focusedCol, setFocusedCol] = useState(0)
  const [focusedSection, setFocusedSection] = useState("apps") // "banner" or "apps"
  const [featuredContent, setFeaturedContent] = useState<Content[]>([])
  const [selectedBannerItem, setSelectedBannerItem] = useState(0)
  const [loading, setLoading] = useState(true)

  const bannerRef = useRef<HTMLDivElement>(null)
  const appsRef = useRef<HTMLDivElement>(null)
  const appItemsRef = useRef<HTMLDivElement[]>([])

  // Initialize app refs
  useEffect(() => {
    appItemsRef.current = Array(apps.length).fill(null)
  }, [])

  // Load content with session storage caching
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)

        // Check if we have cached content in session storage
        const cachedContent = sessionStorage.getItem("featuredContent")
        const cachedTimestamp = sessionStorage.getItem("contentTimestamp")

        // Use cached content if it exists and is less than 1 hour old
        if (cachedContent && cachedTimestamp) {
          const timestamp = Number.parseInt(cachedTimestamp)
          const now = new Date().getTime()
          const oneHour = 60 * 60 * 1000

          if (now - timestamp < oneHour) {
            setFeaturedContent(JSON.parse(cachedContent))
            setLoading(false)
            return
          }
        }

        // Fetch fresh content
        const content = await fetchPopularContent(8)
        setFeaturedContent(content)

        // Cache the content in session storage
        sessionStorage.setItem("featuredContent", JSON.stringify(content))
        sessionStorage.setItem("contentTimestamp", new Date().getTime().toString())
      } catch (error) {
        console.error("Failed to fetch content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (focusedSection === "apps") {
            setFocusedSection("banner")
          }
          break
        case "ArrowDown":
          if (focusedSection === "banner") {
            setFocusedSection("apps")
          }
          break
        case "ArrowLeft":
          if (focusedSection === "banner") {
            setSelectedBannerItem((prev) => (prev > 0 ? prev - 1 : 0))
          } else if (focusedSection === "apps") {
            setFocusedCol((prev) => (prev > 0 ? prev - 1 : 0))
          }
          break
        case "ArrowRight":
          if (focusedSection === "banner") {
            setSelectedBannerItem((prev) => (prev < featuredContent.length - 1 ? prev + 1 : prev))
          } else if (focusedSection === "apps") {
            const maxCols = apps.length - 1
            setFocusedCol((prev) => (prev < maxCols ? prev + 1 : maxCols))
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [focusedCol, focusedSection, featuredContent.length])

  // Auto-scroll the banner
  useEffect(() => {
    if (focusedSection !== "banner") return

    const interval = setInterval(() => {
      if (featuredContent.length > 0) {
        setSelectedBannerItem((prev) => (prev < featuredContent.length - 1 ? prev + 1 : 0))
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [focusedSection, featuredContent.length])

  // Scroll banner into view when item changes
  useEffect(() => {
    if (bannerRef.current && featuredContent.length > 0) {
      const scrollAmount = selectedBannerItem * bannerRef.current.offsetWidth
      bannerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [selectedBannerItem, featuredContent.length])

  // Scroll apps into view when focused app changes
  useEffect(() => {
    if (appsRef.current && focusedSection === "apps") {
      const appItems = appsRef.current.querySelectorAll(".app-item")
      if (appItems[focusedCol]) {
        const item = appItems[focusedCol] as HTMLElement
        const containerLeft = appsRef.current.getBoundingClientRect().left
        const containerWidth = appsRef.current.clientWidth
        const itemLeft = item.getBoundingClientRect().left
        const itemWidth = item.clientWidth

        // Calculate the scroll position to center the item
        const scrollLeft = itemLeft - containerLeft - containerWidth / 2 + itemWidth / 2

        appsRef.current.scrollTo({
          left: appsRef.current.scrollLeft + scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [focusedCol, focusedSection])

  const apps = [
    {
      name: "YouTube",
      icon: "youtube",
      url: "https://www.youtube.com",
      color: "#FF0000",
      logoUrl: "/app-logos/YouTube_2024.svg"
    },
    {
      name: "Netflix",
      icon: "netflix",
      url: "https://www.netflix.com",
      color: "#E50914",
      logoUrl: "/app-logos/Netflix_2015_logo.svg"
    },
    {
      name: "Prime Video",
      icon: "prime",
      url: "https://www.primevideo.com",
      color: "#00A8E1",
      logoUrl: "/app-logos/Amazon_Prime_Video_logo_(2022).svg"
    },
    {
      name: "Disney+",
      icon: "disney",
      url: "https://www.disneyplus.com",
      color: "#0063E5",
      logoUrl: "/app-logos/Disney+_2024_(Print).svg"
    },
    {
      name: "Zee5",
      icon: "Zee5",
      url: "https://www.Zee5.com",
      color: "#ffd966",
      logoUrl: "/app-logos/Zee5_logo.svg"
    },
    {
      name: "Apple TV+",
      icon: "apple",
      url: "https://tv.apple.com",
      color: "#5b5b5b",
      logoUrl: "/app-logos/Apple_TV_Plus_Logo.svg"
    },
    {
      name: "Crunchyroll",
      icon: "crunchyroll",
      url: "https://www.crunchyroll.com",
      color: "#ff8e4c",
      logoUrl: "/app-logos/Crunchyroll_2024.svg"
    }
  ]

  // Set ref for app item
  const setAppItemRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      appItemsRef.current[index] = el
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white overflow-hidden">
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 top-gradient z-40"></div>

      {/* Header with Clock */}
      <div className="absolute top-0 right-0 p-6 z-50">
        <Clock />
      </div>

      {/* Content Container with overlapping sections */}
      <div className="relative h-screen">
        {/* Banner Section */}
        <div className="absolute inset-0 h-[80%] overflow-hidden">
          {loading ? (
            <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
              <p className="text-2xl text-gray-400">Loading content...</p>
            </div>
          ) : (
            <>
              <div ref={bannerRef} className="flex h-full transition-transform duration-500 ease-out overflow-x-hidden">
                {featuredContent.map((item, index) => (
                  <ContentBanner
                    key={item.id}
                    item={item}
                    isFocused={focusedSection === "banner" && selectedBannerItem === index}
                  />
                ))}
              </div>

              {/* Banner Navigation Indicators */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {featuredContent.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 ${
                      selectedBannerItem === index ? "w-8 bg-white" : "w-2 bg-gray-500"
                    } rounded-full transition-all duration-300`}
                  />
                ))}
              </div>

              {/* Banner Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full z-20"
                onClick={() => setSelectedBannerItem((prev) => (prev > 0 ? prev - 1 : 0))}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full z-20"
                onClick={() => setSelectedBannerItem((prev) => (prev < featuredContent.length - 1 ? prev + 1 : prev))}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* App Icons Section - Positioned to overlap with banner section */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] z-30">
          <div ref={appsRef} className="w-full px-20 overflow-x-auto scrollbar-hide h-full flex items-center">
            <div className="flex justify-center space-x-10 min-w-max px-4 relative">
              {apps.map((app, index) => (
                <div key={app.name} className="app-item relative z-10" ref={setAppItemRef(index)}>
                  {focusedSection === "apps" && focusedCol === index && <div className="selection-box"></div>}
                  <AppIcon
                    name={app.name}
                    icon={app.icon}
                    url={app.url}
                    color={app.color}
                    logoUrl={app.logoUrl}
                    isFocused={focusedSection === "apps" && focusedCol === index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
