"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TwitchApp() {
  const [channel, setChannel] = useState("")
  const [current, setCurrent] = useState("")
  const src = useMemo(() => {
    if (!current) return ""
    const parent = typeof window !== "undefined" ? window.location.hostname : "localhost"
    return `https://player.twitch.tv/?channel=${encodeURIComponent(current)}&parent=${encodeURIComponent(parent)}&muted=true`
  }, [current])

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          placeholder="Twitch channel (e.g. shroud)"
        />
        <Button onClick={() => setCurrent(channel.trim())}>Load</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded-md border border-border">
        {src ? (
          <iframe key={src} title="Twitch" src={src} className="h-full w-full bg-black" allowFullScreen />
        ) : (
          <div className="p-3 text-sm opacity-80">Enter a channel name to embed the Twitch player.</div>
        )}
      </div>
    </div>
  )
}
