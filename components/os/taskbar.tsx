"use client"

import { useEffect, useState } from "react"
import { useOS } from "./os-provider"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Shuffle, Settings, MonitorDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { AppIcon as OSAppIcon } from "./app-icon"

export function Taskbar() {
  const {
    windows,
    toggleStart,
    toggleMinimize,
    focusWindow,
    theme,
    setTheme,
    randomizeWallpaper,
    minimizeAll,
    setWallpaper,
  } = useOS()
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString())
  const [dnd, setDnd] = useState(false)
  const [volume, setVolume] = useState<number>(70)
  const presetWallpapers = [
    "/wallpapers/luxury-blue-glass.jpg",
    "/wallpapers/luxury-rose-gold-marble.jpg",
    "/wallpapers/luxury-black-leather.jpg",
    "/wallpapers/luxury-gold-satin.jpg",
    "/wallpapers/luxury-cyan-bokeh.jpg",
  ]

  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(id)
  }, [])

  const tbIconWrap: Record<string, string> = {
    Notes: "bg-primary/15 text-primary",
    "Mini Browser": "bg-accent/15 text-accent",
    Calculator: "bg-secondary text-foreground/80",
    "Jarvis AI": "bg-primary/15 text-primary",
    Clock: "bg-accent/15 text-accent",
    Weather: "bg-secondary text-foreground/80",
    "Music Player": "bg-primary/15 text-primary",
    Gallery: "bg-accent/15 text-accent",
    Files: "bg-secondary text-foreground/80",
    Terminal: "bg-primary/15 text-primary",
    Calendar: "bg-accent/15 text-accent",
    Timer: "bg-secondary text-foreground/80",
    Paint: "bg-primary/15 text-primary",
    "To‑Do": "bg-accent/15 text-accent",
    "System Monitor": "bg-secondary text-foreground/80",
    Snake: "bg-primary/15 text-primary",
    "Tic‑Tac‑Toe": "bg-accent/15 text-accent",
    "2048": "bg-secondary text-foreground/80",
    Facebook: "bg-primary/15 text-primary",
    X: "bg-accent/15 text-accent",
    Instagram: "bg-secondary text-foreground/80",
    TikTok: "bg-primary/15 text-primary",
    YouTube: "bg-accent/15 text-accent",
    LinkedIn: "bg-secondary text-foreground/80",
    Reddit: "bg-primary/15 text-primary",
    Pinterest: "bg-accent/15 text-accent",
    Snapchat: "bg-secondary text-foreground/80",
    WhatsApp: "bg-primary/15 text-primary",
    Telegram: "bg-accent/15 text-accent",
    Discord: "bg-secondary text-foreground/80",
    Twitch: "bg-primary/15 text-primary",
  }

  return (
    <footer className="pointer-events-auto absolute inset-x-0 bottom-0 z-[9999] flex h-12 items-center gap-2 glass-panel neon-edge soft-shadow smooth px-2">
      <Button variant="default" className="font-semibold" onClick={toggleStart}>
        Start
      </Button>

      <Button
        size="icon"
        variant="outline"
        aria-label="Random wallpaper"
        onClick={randomizeWallpaper}
        title="Random wallpaper"
        className="shrink-0 bg-transparent"
      >
        <Shuffle className="h-4 w-4 text-accent" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        aria-label="Show Desktop"
        onClick={minimizeAll}
        title="Show Desktop"
        className="shrink-0 bg-transparent"
      >
        <MonitorDown className="h-4 w-4 text-primary" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            aria-label="Quick Settings"
            title="Quick Settings"
            className="shrink-0 bg-transparent"
          >
            <Settings className="h-4 w-4 text-foreground/80" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72">
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Do Not Disturb</div>
              <Switch checked={dnd} onCheckedChange={setDnd} aria-label="Toggle Do Not Disturb" />
            </div>
            <div>
              <div className="mb-1 text-sm font-medium">Volume ({volume}%)</div>
              <Slider value={[volume]} onValueChange={(v) => setVolume(v[0] ?? 0)} min={0} max={100} step={1} />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Theme</div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="mr-2 h-4 w-4 text-accent" />
                ) : (
                  <Moon className="mr-2 h-4 w-4 text-primary" />
                )}
                {theme === "dark" ? "Light" : "Dark"}
              </Button>
            </div>
            <div className="text-sm font-medium">Wallpapers</div>
            <div className="grid grid-cols-4 gap-2">
              {presetWallpapers.map((p) => (
                <button
                  key={p}
                  className="overflow-hidden rounded-md ring-1 ring-border hover:ring-primary"
                  onClick={() => setWallpaper(p)}
                  title="Set wallpaper"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p || "/placeholder.svg"}
                    alt="Wallpaper preview"
                    className="h-12 w-full object-cover"
                    crossOrigin="anonymous"
                  />
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
        {windows
          .slice()
          .sort((a, b) => b.z - a.z)
          .map((w) => (
            <Button
              key={w.id}
              variant={w.minimized ? "secondary" : "outline"}
              className="flex items-center gap-2 truncate"
              onClick={() => (w.minimized ? toggleMinimize(w.id) : focusWindow(w.id))}
              onDoubleClick={() => toggleMinimize(w.id)}
              title={w.title}
            >
              <span
                className={`grid place-items-center rounded-sm px-1.5 py-0.5 ${tbIconWrap[w.title] ?? "bg-secondary text-foreground/80"}`}
              >
                <OSAppIcon
                  candidates={[`/icons/${w.appId}.png`, `/icons/${w.appId}.jpg`]}
                  alt={`${w.title} icon`}
                  size={16}
                  className="rounded"
                />
              </span>
              <span className="truncate">{w.title}</span>
            </Button>
          ))}
      </div>
      <div className="hidden md:block pr-3 text-xs">
        <span className="luxury-name font-sans">Sahashransu Satpathy</span>
      </div>
      <div className="pr-2 text-xs opacity-80">{time}</div>
    </footer>
  )
}
