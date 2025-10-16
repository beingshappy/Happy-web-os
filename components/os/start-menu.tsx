"use client"

import type React from "react"

import { useMemo, useRef, useState } from "react"
import { useOS } from "./os-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppIcon as OSAppIcon } from "./app-icon"

const apps = [
  { id: "notes", name: "Notes" },
  { id: "browser", name: "Mini Browser" },
  { id: "calculator", name: "Calculator" },
  { id: "jarvis", name: "Jarvis AI" },
  { id: "clock", name: "Clock" },
  { id: "weather", name: "Weather" },
  { id: "music", name: "Music Player" },
  { id: "gallery", name: "Gallery" },
  { id: "files", name: "Files" },
  { id: "terminal", name: "Terminal" },
  { id: "calendar", name: "Calendar" },
  { id: "timer", name: "Timer" },
  { id: "paint", name: "Paint" },
  { id: "todo", name: "To‑Do" },
  { id: "system", name: "System Monitor" },
  // Games
  { id: "snake", name: "Snake" },
  { id: "tictactoe", name: "Tic‑Tac‑Toe" },
  { id: "game2048", name: "2048" },
] as const

const socials = [
  { id: "facebook", name: "Facebook", url: "https://facebook.com" },
  { id: "x", name: "X", url: "https://x.com" },
  { id: "instagram", name: "Instagram", url: "https://instagram.com" },
  { id: "tiktok", name: "TikTok", url: "https://tiktok.com" },
  { id: "youtube", name: "YouTube", url: "https://youtube.com" },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com" },
  { id: "reddit", name: "Reddit", url: "https://reddit.com" },
  { id: "pinterest", name: "Pinterest", url: "https://pinterest.com" },
  { id: "snapchat", name: "Snapchat", url: "https://snapchat.com" },
  { id: "whatsapp", name: "WhatsApp", url: "https://web.whatsapp.com" },
  { id: "telegram", name: "Telegram", url: "https://web.telegram.org" },
  { id: "discord", name: "Discord", url: "https://discord.com/app" },
  { id: "twitch", name: "Twitch", url: "https://twitch.tv" },
] as const

const externalOpenIds = new Set([
  "facebook",
  "x",
  "instagram",
  "tiktok",
  "linkedin",
  "reddit",
  "pinterest",
  "snapchat",
  "whatsapp",
  "telegram",
])

// Quick URL map built from socials list
const socialUrlById = Object.fromEntries(socials.map((s) => [s.id, s.url])) as Record<string, string>

export function StartMenu() {
  const {
    startOpen,
    openApp,
    setWallpaper,
    setTheme,
    theme,
    wallpaperBlur,
    setWallpaperBlur,
    wallpaperDim,
    setWallpaperDim,
    wallpaperFit,
    setWallpaperFit,
  } = useOS()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => apps.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())), [query])
  const filteredSocials = useMemo(
    () => socials.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setWallpaper(String(reader.result))
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  return (
    <div
      className={`absolute bottom-12 left-2 z-[9998] w-[28rem] p-3 transition-opacity ${
        startOpen ? "opacity-100" : "pointer-events-none opacity-0"
      } glass-panel neon-edge soft-shadow smooth glass-reflection`}
      role="dialog"
      aria-hidden={!startOpen}
      aria-label="Start menu"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-sm font-semibold">Start</div>
        {/* Theme toggle removed */}
      </div>

      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search apps…" className="mb-3" />

      <div className="mb-3 grid max-h-64 grid-cols-3 gap-2 overflow-auto pr-1">
        {filtered.map((a) => (
          <Button
            key={a.id}
            variant="secondary"
            className="justify-start gap-2"
            onClick={() => openApp(a.id as any)}
            title={`Open ${a.name}`}
          >
            <span className="grid h-5 w-5 place-items-center rounded bg-card ring-1 ring-border/60">
              <OSAppIcon
                candidates={[`/icons/${a.id}.png`, `/icons/${a.id}.jpg`]}
                alt={`${a.name} icon`}
                size={16}
                className="rounded"
              />
            </span>
            {a.name}
          </Button>
        ))}
        {filteredSocials.map((s) => (
          <Button
            key={s.id}
            variant="outline"
            className="justify-start gap-2 bg-transparent"
            onClick={() => {
              if (externalOpenIds.has(s.id)) {
                window.open(socialUrlById[s.id], "_blank", "noopener")
              } else {
                openApp(s.id as any)
              }
            }}
            title={`Open ${s.name}`}
          >
            <span className="grid h-5 w-5 place-items-center rounded bg-card ring-1 ring-border/60">
              <OSAppIcon
                candidates={[`/icons/${s.id}.png`, `/icons/${s.id}.jpg`]}
                alt={`${s.name} icon`}
                size={16}
                className="rounded"
              />
            </span>
            {s.name}
          </Button>
        ))}
        {filtered.length === 0 && filteredSocials.length === 0 && (
          <div className="col-span-3 text-sm opacity-70">No apps found.</div>
        )}
      </div>

      <div className="my-3 h-px bg-border" />

      <div className="mb-2 text-sm font-semibold">Personalize</div>
      <div className="grid gap-3">
        <div className="grid gap-1">
          <Label htmlFor="wallpaper-upload" className="text-xs">
            Wallpaper (upload image)
          </Label>
          <div className="flex items-center gap-2">
            <Input id="wallpaper-upload" type="file" accept="image/*" ref={fileRef} onChange={onPick} />
            <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
              Choose
            </Button>
          </div>
        </div>

        <div className="grid gap-1">
          <Label className="text-xs">Blur ({wallpaperBlur}px)</Label>
          <Slider
            value={[wallpaperBlur]}
            onValueChange={(v) => setWallpaperBlur(v[0] ?? 0)}
            min={0}
            max={16}
            step={1}
          />
        </div>

        <div className="grid gap-1">
          <Label className="text-xs">Dim ({Math.round(wallpaperDim * 100)}%)</Label>
          <Slider
            value={[Math.round(wallpaperDim * 100)]}
            onValueChange={(v) => setWallpaperDim((v[0] ?? 0) / 100)}
            min={0}
            max={60}
            step={2}
          />
        </div>

        <div className="grid gap-1">
          <Label className="text-xs">Fit</Label>
          <Select value={wallpaperFit} onValueChange={(v) => setWallpaperFit(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Fit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="contain">Contain</SelectItem>
              <SelectItem value="fill">Fill</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
