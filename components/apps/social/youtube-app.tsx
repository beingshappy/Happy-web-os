"use client"

import { useState } from "react"

export function YouTubeApp() {
  const [query, setQuery] = useState("lofi hip hop")
  const embed = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube..."
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <div className="flex-1">
        <iframe
          title="YouTube"
          src={embed}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  )
}

export default YouTubeApp
