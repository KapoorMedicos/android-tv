import Image from "next/image"
import Link from "next/link"

interface AppIconProps {
  name: string
  icon: string
  url: string
  color: string
  isFocused?: boolean
  logoUrl: string
}

export function AppIcon({ name, url, color, isFocused, logoUrl }: AppIconProps) {
  const isSpecialIcon = name === "Apple TV+" || name === "Peacock"
  const greyBg = "rgb(65, 65, 65)"

  return (
    <Link
      href={url}
      className={`group flex flex-col items-center justify-center gap-2 relative transition-all duration-300 ease-out ${
        isFocused ? "scale-105" : "scale-100 hover:scale-102"
      }`}
      style={{ 
        width: "120px", 
        height: "140px", 
        position: "relative",
        marginTop: "-20px"
      }}
    >
      <div
        className={`relative flex h-60 w-48 items-center justify-center rounded-2xl transition-all duration-300`}
        style={{
          backgroundColor: isFocused ? color : "rgba(40,40,40,0.8)",
        }}
      >
        <Image
          src={logoUrl}
          alt={name}
          width={90}
          height={90}
          className={`transition-all duration-300 ${
            isFocused 
              ? "drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)] brightness-110" 
              : "drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)]"
          }`}
        />
      </div>
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          isFocused ? "text-white" : "text-white/70"
        }`}
      >
        {name}
      </span>
    </Link>
  )
}
