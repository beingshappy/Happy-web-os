"use client"

import { useState } from "react"

export function FacebookApp() {
  const [pageUrl, setPageUrl] = useState("https://www.facebook.com/Meta")
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl,
  )}&tabs=timeline&width=900&height=680&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <input
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
          placeholder="Facebook Page URL"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <iframe title="Facebook Page" className="h-full w-full" src={src} />
    </div>
  )
}

export default FacebookApp
