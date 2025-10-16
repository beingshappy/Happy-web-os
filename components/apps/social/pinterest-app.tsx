"use client"

import { useEffect, useRef, useState } from "react"

export function PinterestApp() {
  const [boardUrl, setBoardUrl] = useState("https://www.pinterest.com/pinterest/official-news/")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = "pinterest-embed"
    if (!document.getElementById(id)) {
      const s = document.createElement("script")
      s.id = id
      s.async = true
      s.src = "https://assets.pinterest.com/js/pinit.js"
      document.body.appendChild(s)
    }
  }, [boardUrl])

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <input
          value={boardUrl}
          onChange={(e) => setBoardUrl(e.target.value)}
          placeholder="Paste Pinterest board URL"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <div ref={ref} className="flex-1 overflow-auto p-4">
        <a
          data-pin-do="embedBoard"
          data-pin-board-width="800"
          data-pin-scale-height="240"
          data-pin-scale-width="120"
          href={boardUrl}
        />
      </div>
    </div>
  )
}

export default PinterestApp
