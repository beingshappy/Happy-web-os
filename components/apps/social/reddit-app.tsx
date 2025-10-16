"use client"

import { useState } from "react"

export function RedditApp() {
  const [sub, setSub] = useState("programming")
  const src = `https://www.redditmedia.com/r/${encodeURIComponent(sub)}?ref_source=embed&ref=share&embed=true`
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background p-2">
        <span className="text-sm text-muted-foreground">r/</span>
        <input
          value={sub}
          onChange={(e) => setSub(e.target.value)}
          placeholder="subreddit"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <iframe title="Reddit" className="h-full w-full" src={src} />
    </div>
  )
}

export default RedditApp
