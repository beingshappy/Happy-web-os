"use client"

import { useState } from "react"

export function LinkedInApp() {
  const [embedUrl, setEmbedUrl] = useState("https://www.linkedin.com/embed/feed/update/urn:li:activity:1234567890")
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <input
          value={embedUrl}
          onChange={(e) => setEmbedUrl(e.target.value)}
          placeholder="Paste LinkedIn embed URL"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <iframe title="LinkedIn" className="h-full w-full" src={embedUrl} />
    </div>
  )
}

export default LinkedInApp
