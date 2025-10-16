"use client"
import React from "react"

type AppIconProps = {
  src?: string
  alt: string
  size?: number
  className?: string
  fallbackSrc?: string
  candidates?: string[]
}

export function AppIcon({
  src,
  alt,
  size = 64,
  className = "",
  fallbackSrc = "/generic-app-icon.jpg",
  candidates,
}: AppIconProps) {
  const makeCandidates = React.useCallback(() => {
    const list = new Set<string>()
    const push = (s?: string) => s && list.add(s)
    // prefer PNG first as requested, then jpg/webp/jpeg/svg
    const alts = ["png", "jpg", "webp", "jpeg", "svg"]

    if (candidates && candidates.length) {
      candidates.forEach((c) => push(c))
    } else if (src) {
      push(src)
      const dot = src.lastIndexOf(".")
      if (dot > -1) {
        const base = src.slice(0, dot)
        const ext = src.slice(dot + 1).toLowerCase()
        alts
          .filter((e) => e !== ext)
          .forEach((e) => {
            push(`${base}.${e}`)
          })
      }
    }

    push(fallbackSrc)
    return Array.from(list)
  }, [src, candidates, fallbackSrc])

  const sources = makeCandidates()
  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    setIdx(0)
  }, [src])

  const activeSrc = sources[idx] || fallbackSrc

  const onError = React.useCallback(() => {
    setIdx((i) => Math.min(i + 1, sources.length - 1))
  }, [sources.length])

  return (
    <img
      src={activeSrc || "/placeholder.svg?height=64&width=64&query=app icon placeholder"}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={onError}
      className={[
        "rounded-2xl object-contain",
        "ring-1 ring-[color:var(--ring)]",
        "shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
        "neon-glow",
        className,
      ].join(" ")}
    />
  )
}
