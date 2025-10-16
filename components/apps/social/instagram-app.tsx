"use client"

import { useEffect, useRef, useState } from "react"

export function InstagramApp() {
  const [url, setUrl] = useState("https://www.instagram.com/p/CxQ1QZ1I2xC/")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = "instagram-embed"
    if (!document.getElementById(id)) {
      const s = document.createElement("script")
      s.id = id
      s.async = true
      s.src = "https://www.instagram.com/embed.js"
      document.body.appendChild(s)
    } else {
      // @ts-ignore
      window.instgrm?.Embeds?.process?.()
    }
  }, [url])

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Instagram post URL"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <div ref={ref} className="flex-1 overflow-auto p-4">
        <blockquote className="instagram-media" data-instgrm-permalink={url}></blockquote>
      </div>
    </div>
  )
}

export default InstagramApp
