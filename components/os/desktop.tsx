"use client"

import type React from "react"

import { useOS } from "./os-provider"
import { WindowSurface } from "./window"
import { NotesApp } from "@/components/apps/notes-app"
import { BrowserApp } from "@/components/apps/browser-app"
import { CalculatorApp } from "@/components/apps/calculator-app"
import { JarvisApp } from "@/components/apps/jarvis-app"
import { ClockApp } from "@/components/apps/clock-app"
import { WeatherApp } from "@/components/apps/weather-app"
import { MusicApp } from "@/components/apps/music-app"
import { GalleryApp } from "@/components/apps/gallery-app"
import { FilesApp } from "@/components/apps/files-app"
import { TerminalApp } from "@/components/apps/terminal-app"
import { CalendarApp } from "@/components/apps/calendar-app"
import { TimerApp } from "@/components/apps/timer-app"
import { PaintApp } from "@/components/apps/paint-app"
import { TodoApp } from "@/components/apps/todo-app"
import { SystemMonitorApp } from "@/components/apps/system-monitor-app"
import { SnakeGame } from "@/components/apps/snake-app"
import { TicTacToeApp } from "@/components/apps/tic-tac-toe-app"
import { Game2048App } from "@/components/apps/game-2048-app"
import { FacebookApp } from "@/components/apps/social/facebook-app"
import { XApp } from "@/components/apps/social/x-app"
import { InstagramApp } from "@/components/apps/social/instagram-app"
import { TikTokApp } from "@/components/apps/social/tiktok-app"
import { YouTubeApp } from "@/components/apps/social/youtube-app"
import { LinkedInApp } from "@/components/apps/social/linkedin-app"
import { RedditApp } from "@/components/apps/social/reddit-app"
import { PinterestApp } from "@/components/apps/social/pinterest-app"
import { DiscordApp } from "@/components/apps/social/discord-app"
import { TwitchApp } from "@/components/apps/social/twitch-app"
import {
  Album,
  AppWindow,
  Bot,
  Calculator,
  CalendarIcon,
  CheckSquare,
  Clock3,
  Cloud,
  FileIcon,
  Gamepad2,
  Globe2,
  Grid3X3,
  ImageIcon,
  Music2,
  Paintbrush,
  SquareTerminal,
  Sticker,
  TimerIcon,
} from "lucide-react"
import { AppIcon as OSAppIcon } from "./app-icon"

const appTile: Record<string, string> = {
  notes: "bg-primary/25 ring-1 ring-primary/45",
  browser: "bg-accent/20 ring-1 ring-accent/35",
  calculator: "bg-secondary ring-1 ring-border/60",
  jarvis: "bg-primary/15 ring-1 ring-primary/30",
  clock: "bg-accent/15 ring-1 ring-accent/25",
  weather: "bg-secondary ring-1 ring-border/60",
  music: "bg-primary/25 ring-1 ring-primary/45",
  gallery: "bg-accent/20 ring-1 ring-accent/35",
  files: "bg-secondary ring-1 ring-border/60",
  terminal: "bg-primary/15 ring-1 ring-primary/30",
  calendar: "bg-accent/15 ring-1 ring-accent/25",
  timer: "bg-secondary ring-1 ring-border/60",
  paint: "bg-primary/25 ring-1 ring-primary/45",
  todo: "bg-accent/20 ring-1 ring-accent/35",
  system: "bg-secondary ring-1 ring-border/60",
  snake: "bg-primary/25 ring-1 ring-primary/45",
  tictactoe: "bg-accent/20 ring-1 ring-accent/35",
  game2048: "bg-secondary ring-1 ring-border/60",
  facebook: "bg-secondary ring-1 ring-border/60",
  x: "bg-secondary ring-1 ring-border/60",
  instagram: "bg-accent/20 ring-1 ring-accent/35",
  tiktok: "bg-primary/25 ring-1 ring-primary/45",
  youtube: "bg-destructive/10 ring-1 ring-destructive/30",
  linkedin: "bg-accent/20 ring-1 ring-accent/35",
  reddit: "bg-primary/25 ring-1 ring-primary/45",
  pinterest: "bg-accent/20 ring-1 ring-accent/35",
  snapchat: "bg-secondary ring-1 ring-border/60",
  whatsapp: "bg-primary/25 ring-1 ring-primary/45",
  telegram: "bg-accent/20 ring-1 ring-accent/35",
  discord: "bg-primary/25 ring-1 ring-primary/45",
  twitch: "bg-secondary ring-1 ring-border/60",
}

const appImg: Record<string, string> = {
  // core apps
  notes: "/icons/notes.jpg",
  browser: "/icons/browser.jpg",
  calculator: "/icons/calculator.jpg",
  jarvis: "/icons/jarvis.jpg",
  clock: "/icons/clock.jpg",
  weather: "/icons/weather.jpg",
  music: "/icons/music.jpg",
  gallery: "/icons/gallery.jpg",
  files: "/icons/files.jpg",
  terminal: "/icons/terminal.jpg",
  calendar: "/icons/calendar.jpg",
  timer: "/icons/timer.jpg",
  paint: "/icons/paint.jpg",
  todo: "/icons/todo.jpg",
  system: "/icons/system.jpg",
  snake: "/icons/snake.jpg",
  tictactoe: "/icons/tictactoe.jpg",
  game2048: "/icons/game2048.jpg",
  // socials
  facebook: "/icons/facebook.jpg",
  x: "/icons/x.jpg",
  instagram: "/icons/instagram.jpg",
  tiktok: "/icons/tiktok.jpg",
  youtube: "/icons/youtube.jpg",
  linkedin: "/icons/linkedin.jpg",
  reddit: "/icons/reddit.jpg",
  pinterest: "/icons/pinterest.jpg",
  snapchat: "/icons/snapchat.jpg",
  whatsapp: "/icons/whatsapp.jpg",
  telegram: "/icons/telegram.jpg",
  discord: "/icons/discord.jpg",
  twitch: "/icons/twitch.jpg",
}

const appIcons: Record<string, React.ReactNode> = {
  notes: <Sticker className="h-6 w-6 text-primary" />,
  browser: <Globe2 className="h-6 w-6 text-accent" />,
  calculator: <Calculator className="h-6 w-6 text-foreground/80" />,
  jarvis: <Bot className="h-6 w-6 text-primary" />,
  clock: <Clock3 className="h-6 w-6 text-accent" />,
  weather: <Cloud className="h-6 w-6 text-foreground/80" />,
  music: <Music2 className="h-6 w-6 text-primary" />,
  gallery: <ImageIcon className="h-6 w-6 text-accent" />,
  files: <FileIcon className="h-6 w-6 text-foreground/80" />,
  terminal: <SquareTerminal className="h-6 w-6 text-primary" />,
  calendar: <CalendarIcon className="h-6 w-6 text-accent" />,
  timer: <TimerIcon className="h-6 w-6 text-foreground/80" />,
  paint: <Paintbrush className="h-6 w-6 text-primary" />,
  todo: <CheckSquare className="h-6 w-6 text-accent" />,
  system: <AppWindow className="h-6 w-6 text-foreground/80" />,
  snake: <Gamepad2 className="h-6 w-6 text-primary" />,
  tictactoe: <Grid3X3 className="h-6 w-6 text-accent" />,
  game2048: <Album className="h-6 w-6 text-foreground/80" />,
}

function DesktopAppIcon({
  label,
  appId,
  onOpen,
}: {
  label: string
  appId: string
  onOpen: () => void
}) {
  const img = appImg[appId]

  return (
    <button
      onDoubleClick={onOpen}
      className="group flex w-28 flex-col items-center gap-2 rounded-lg p-3 text-xs hover:bg-transparent"
      title={`Open ${label}`}
    >
      <div
        className={`grid h-14 w-14 place-items-center rounded-2xl glass-panel neon-edge soft-shadow smooth ${appTile[appId] ?? ""}`}
      >
        <OSAppIcon
          candidates={[img ? img.replace(/\.jpg$/i, ".png") : `/icons/${appId}.png`, img || `/icons/${appId}.jpg`]}
          alt={`${label} icon`}
          size={36}
          className="rounded-lg"
        />
      </div>
      <span className="line-clamp-1 text-pretty text-foreground/90">{label}</span>
    </button>
  )
}

const socialUrls: Record<string, string> = {
  facebook: "https://facebook.com",
  x: "https://x.com",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  youtube: "https://youtube.com",
  linkedin: "https://linkedin.com",
  reddit: "https://reddit.com",
  pinterest: "https://pinterest.com",
  snapchat: "https://snapchat.com",
  whatsapp: "https://web.whatsapp.com",
  telegram: "https://web.telegram.org",
  discord: "https://discord.com/app",
  twitch: "https://twitch.tv",
}

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

export function Desktop() {
  const { windows, wallpaper, wallpaperBlur, wallpaperDim, wallpaperFit, openApp } = useOS()

  function handleOpenSocial(id: string) {
    if (externalOpenIds.has(id)) {
      const url = socialUrls[id]
      if (url) window.open(url, "_blank", "noopener")
      return
    }
    openApp(id as any)
  }

  const fitClass =
    wallpaperFit === "cover" ? "object-cover" : wallpaperFit === "contain" ? "object-contain" : "object-fill"

  return (
    <div className="relative h-full w-full pt-12">
      {/* Wallpaper */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {wallpaper ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Wallpaper"
            src={wallpaper || "/placeholder.svg"}
            className={`h-full w-full ${fitClass}`}
            style={{ filter: `blur(${wallpaperBlur}px)` }}
          />
        ) : null}
        {wallpaper ? (
          <div className="absolute inset-0" style={{ background: `oklch(0 0 0 / ${wallpaperDim})` }} aria-hidden />
        ) : null}
      </div>

      {/* Desktop icons */}
      <div className="grid grid-cols-3 gap-4 p-4 sm:grid-cols-6 lg:grid-cols-8">
        {/* core apps */}
        <DesktopAppIcon appId="notes" label="Notes" onOpen={() => openApp("notes")} />
        <DesktopAppIcon appId="browser" label="Browser" onOpen={() => openApp("browser")} />
        <DesktopAppIcon appId="calculator" label="Calculator" onOpen={() => openApp("calculator")} />
        <DesktopAppIcon appId="jarvis" label="Jarvis AI" onOpen={() => openApp("jarvis")} />
        <DesktopAppIcon appId="clock" label="Clock" onOpen={() => openApp("clock")} />
        <DesktopAppIcon appId="weather" label="Weather" onOpen={() => openApp("weather")} />
        <DesktopAppIcon appId="music" label="Music" onOpen={() => openApp("music")} />
        <DesktopAppIcon appId="gallery" label="Gallery" onOpen={() => openApp("gallery")} />
        <DesktopAppIcon appId="files" label="Files" onOpen={() => openApp("files")} />
        <DesktopAppIcon appId="terminal" label="Terminal" onOpen={() => openApp("terminal")} />
        <DesktopAppIcon appId="calendar" label="Calendar" onOpen={() => openApp("calendar")} />
        <DesktopAppIcon appId="timer" label="Timer" onOpen={() => openApp("timer")} />
        <DesktopAppIcon appId="paint" label="Paint" onOpen={() => openApp("paint")} />
        <DesktopAppIcon appId="todo" label="To‑Do" onOpen={() => openApp("todo")} />
        <DesktopAppIcon appId="system" label="System" onOpen={() => openApp("system")} />
        <DesktopAppIcon appId="snake" label="Snake" onOpen={() => openApp("snake")} />
        <DesktopAppIcon appId="tictactoe" label="Tic‑Tac‑Toe" onOpen={() => openApp("tictactoe")} />
        <DesktopAppIcon appId="game2048" label="2048" onOpen={() => openApp("game2048")} />

        {/* Social media apps */}
        <DesktopAppIcon appId="facebook" label="Facebook" onOpen={() => handleOpenSocial("facebook")} />
        <DesktopAppIcon appId="x" label="X" onOpen={() => handleOpenSocial("x")} />
        <DesktopAppIcon appId="instagram" label="Instagram" onOpen={() => handleOpenSocial("instagram")} />
        <DesktopAppIcon appId="tiktok" label="TikTok" onOpen={() => handleOpenSocial("tiktok")} />
        <DesktopAppIcon appId="youtube" label="YouTube" onOpen={() => handleOpenSocial("youtube")} />
        <DesktopAppIcon appId="linkedin" label="LinkedIn" onOpen={() => handleOpenSocial("linkedin")} />
        <DesktopAppIcon appId="reddit" label="Reddit" onOpen={() => handleOpenSocial("reddit")} />
        <DesktopAppIcon appId="pinterest" label="Pinterest" onOpen={() => handleOpenSocial("pinterest")} />
        <DesktopAppIcon appId="snapchat" label="Snapchat" onOpen={() => handleOpenSocial("snapchat")} />
        <DesktopAppIcon appId="whatsapp" label="WhatsApp" onOpen={() => handleOpenSocial("whatsapp")} />
        <DesktopAppIcon appId="telegram" label="Telegram" onOpen={() => handleOpenSocial("telegram")} />
        <DesktopAppIcon appId="discord" label="Discord" onOpen={() => handleOpenSocial("discord")} />
        <DesktopAppIcon appId="twitch" label="Twitch" onOpen={() => handleOpenSocial("twitch")} />
      </div>

      {/* Windows */}
      {windows
        .slice()
        .sort((a, b) => a.z - b.z)
        .map((w) => {
          const content =
            w.appId === "notes" ? (
              <NotesApp />
            ) : w.appId === "browser" ? (
              <BrowserApp />
            ) : w.appId === "calculator" ? (
              <CalculatorApp />
            ) : w.appId === "jarvis" ? (
              <JarvisApp />
            ) : w.appId === "clock" ? (
              <ClockApp />
            ) : w.appId === "weather" ? (
              <WeatherApp />
            ) : w.appId === "music" ? (
              <MusicApp />
            ) : w.appId === "gallery" ? (
              <GalleryApp />
            ) : w.appId === "files" ? (
              <FilesApp />
            ) : w.appId === "terminal" ? (
              <TerminalApp />
            ) : w.appId === "calendar" ? (
              <CalendarApp />
            ) : w.appId === "timer" ? (
              <TimerApp />
            ) : w.appId === "paint" ? (
              <PaintApp />
            ) : w.appId === "todo" ? (
              <TodoApp />
            ) : w.appId === "snake" ? (
              <SnakeGame />
            ) : w.appId === "tictactoe" ? (
              <TicTacToeApp />
            ) : w.appId === "game2048" ? (
              <Game2048App />
            ) : // Socials rendered via BrowserApp embedded with initialUrl and readOnly
            w.appId === "facebook" ? (
              <FacebookApp />
            ) : w.appId === "x" ? (
              <XApp />
            ) : w.appId === "instagram" ? (
              <InstagramApp />
            ) : w.appId === "tiktok" ? (
              <TikTokApp />
            ) : w.appId === "youtube" ? (
              <YouTubeApp />
            ) : w.appId === "linkedin" ? (
              <LinkedInApp />
            ) : w.appId === "reddit" ? (
              <RedditApp />
            ) : w.appId === "pinterest" ? (
              <PinterestApp />
            ) : w.appId === "snapchat" ? (
              <div className="p-4 text-sm opacity-80">Snapchat embedding is limited. Try other social apps.</div>
            ) : w.appId === "whatsapp" ? (
              <div className="p-4 text-sm opacity-80">WhatsApp Web cannot be embedded due to security policies.</div>
            ) : w.appId === "telegram" ? (
              <div className="p-4 text-sm opacity-80">
                Telegram Web blocks embedding. Open via external browser if needed.
              </div>
            ) : w.appId === "discord" ? (
              <DiscordApp />
            ) : w.appId === "twitch" ? (
              <TwitchApp />
            ) : (
              <SystemMonitorApp />
            )

          return <WindowSurface key={w.id} win={w} content={content} />
        })}
    </div>
  )
}
