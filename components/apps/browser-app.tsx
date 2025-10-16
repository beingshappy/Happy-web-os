"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useMemo } from "react"

export function BrowserApp({ initialUrl, readOnly = false }: { initialUrl?: string; readOnly?: boolean }) {
  const [url, setUrl] = useState(initialUrl || "https://example.com")

  useEffect(() => {
    if (initialUrl) setUrl(initialUrl)
  }, [initialUrl])

  const normalized = (() => {
    try {
      if (!/^https?:\/\//i.test(url)) return `https://${url}`
      return url
    } catch {
      return "about:blank"
    }
  })()

  const isLikelyBlocked = useMemo(() => {
    try {
      const u = new URL(normalized)
      const host = u.hostname.replace(/^www\./, "").toLowerCase()
      const blockedHosts = new Set([
        "facebook.com",
        "instagram.com",
        "tiktok.com",
        "x.com",
        "twitter.com",
        "linkedin.com",
        "pinterest.com",
        "snapchat.com",
        "discord.com",
        "whatsapp.com",
        "reddit.com",
      ])
      if (host === "youtube.com" || host === "youtu.be") {
        // YouTube can embed only specific endpoints; generic pages often fail
        return true
      }
      for (const b of blockedHosts) {
        if (host.endsWith(b)) return true
      }
      return false
    } catch {
      return false
    }
  }, [normalized])

  return (
    <div className="flex h-full flex-col gap-2">
      {!readOnly ? (
        <div className="flex items-center gap-2">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" aria-label="Address" />
          <Button onClick={() => setUrl(url)} aria-label="Go to URL">
            Go
          </Button>
        </div>
      ) : null}

      {isLikelyBlocked ? (
        <div className="flex-1 overflow-auto rounded-md border border-border p-4">
          <div className="mx-auto max-w-xl space-y-3 text-center">
            <h3 className="text-base font-semibold">This site blocks embedding</h3>
            <p className="text-sm text-foreground/70">
              Many social platforms prevent loading their pages inside apps or iframes. Use the built‑in social apps
              from the Start Menu to view content inside HAPPY OS.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-md border border-border p-2 text-xs">YouTube App</div>
              <div className="rounded-md border border-border p-2 text-xs">X App</div>
              <div className="rounded-md border border-border p-2 text-xs">Instagram App</div>
              <div className="rounded-md border border-border p-2 text-xs">Facebook App</div>
              <div className="rounded-md border border-border p-2 text-xs">Reddit App</div>
              <div className="rounded-md border border-border p-2 text-xs">TikTok App</div>
            </div>
            <p className="text-xs text-foreground/60">
              Tip: Paste a direct post/video URL in the respective social app to load the embeddable view.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden rounded-md border border-border">
          <iframe
            title="Mini Browser"
            key={normalized}
            src={normalized}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="h-full w-full bg-card"
          />
        </div>
      )}
    </div>
  )
}
