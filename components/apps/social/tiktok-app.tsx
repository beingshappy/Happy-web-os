"use client"

import { useEffect, useState } from "react"

export function TikTokApp() {
  const [url, setUrl] = useState("https://www.tiktok.com/@scout2015/video/6718335390845095173")

  useEffect(() => {
    const id = "tiktok-embed"
    if (!document.getElementById(id)) {
      const s = document.createElement("script")
      s.id = id
      s.async = true
      s.src = "https://www.tiktok.com/embed.js"
      document.body.appendChild(s)
    }
  }, [url])

  const embedUrl = `https://www.tiktok.com/embed/v2/${encodeURIComponent(url)}`
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste TikTok video URL"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <iframe title="TikTok" className="h-full w-full" src={embedUrl} />
    </div>
  )
}

export default TikTokApp
