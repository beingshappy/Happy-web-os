"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export type AppId =
  | "notes"
  | "browser"
  | "calculator"
  | "jarvis"
  | "clock"
  | "weather"
  | "music"
  | "gallery"
  | "files"
  | "terminal"
  | "calendar"
  | "timer"
  | "paint"
  | "todo"
  | "system"
  | "snake"
  | "tictactoe"
  | "game2048"
  | "facebook"
  | "x"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "reddit"
  | "pinterest"
  | "snapchat"
  | "whatsapp"
  | "telegram"
  | "discord"
  | "twitch"

export type WindowState = {
  id: string
  appId: AppId
  title: string
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  maximized: boolean
  z: number
}

type Fit = "cover" | "contain" | "fill"

type OSContextType = {
  windows: WindowState[]
  startOpen: boolean
  wallpaper: string | null
  wallpaperBlur: number
  wallpaperDim: number
  wallpaperFit: Fit
  theme: "light" | "dark"
  isAnyFocused: boolean

  toggleStart: () => void
  openApp: (appId: AppId) => void
  closeWindow: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string) => void
  focusWindow: (id: string) => void
  moveWindow: (id: string, x: number, y: number) => void
  resizeWindow: (id: string, width: number, height: number) => void
  minimizeAll: () => void

  setWallpaper: (dataUrl: string | null) => void
  setWallpaperBlur: (n: number) => void
  setWallpaperDim: (n: number) => void
  setWallpaperFit: (f: Fit) => void
  setTheme: (mode: "light" | "dark") => void
  randomizeWallpaper: () => void
}

const OSContext = createContext<OSContextType | null>(null)

const appTitles: Record<AppId, string> = {
  notes: "Notes",
  browser: "Mini Browser",
  calculator: "Calculator",
  jarvis: "Jarvis AI",
  clock: "Clock",
  weather: "Weather",
  music: "Music Player",
  gallery: "Gallery",
  files: "Files",
  terminal: "Terminal",
  calendar: "Calendar",
  timer: "Timer",
  paint: "Paint",
  todo: "To‑Do",
  system: "System Monitor",
  snake: "Snake",
  tictactoe: "Tic‑Tac‑Toe",
  game2048: "2048",
  facebook: "Facebook",
  x: "X",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  reddit: "Reddit",
  pinterest: "Pinterest",
  snapchat: "Snapchat",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  discord: "Discord",
  twitch: "Twitch",
}

const defaultSize: Record<AppId, { w: number; h: number }> = {
  notes: { w: 520, h: 440 },
  browser: { w: 860, h: 560 },
  calculator: { w: 340, h: 460 },
  jarvis: { w: 620, h: 520 },
  clock: { w: 300, h: 200 },
  weather: { w: 420, h: 380 },
  music: { w: 420, h: 300 },
  gallery: { w: 700, h: 480 },
  files: { w: 560, h: 420 },
  terminal: { w: 640, h: 420 },
  calendar: { w: 520, h: 420 },
  timer: { w: 420, h: 320 },
  paint: { w: 720, h: 520 },
  todo: { w: 420, h: 380 },
  system: { w: 640, h: 380 },
  snake: { w: 520, h: 520 },
  tictactoe: { w: 380, h: 420 },
  game2048: { w: 520, h: 640 },
  facebook: { w: 860, h: 560 },
  x: { w: 860, h: 560 },
  instagram: { w: 860, h: 560 },
  tiktok: { w: 860, h: 560 },
  youtube: { w: 960, h: 600 },
  linkedin: { w: 860, h: 560 },
  reddit: { w: 860, h: 560 },
  pinterest: { w: 860, h: 560 },
  snapchat: { w: 720, h: 560 },
  whatsapp: { w: 860, h: 560 },
  telegram: { w: 860, h: 560 },
  discord: { w: 960, h: 640 },
  twitch: { w: 960, h: 640 },
}

const presetWallpapers = [
  "/wallpapers/luxury-blue-glass.jpg",
  "/wallpapers/luxury-rose-gold-marble.jpg",
  "/wallpapers/luxury-black-leather.jpg",
  "/wallpapers/luxury-gold-satin.jpg",
  "/wallpapers/luxury-cyan-bokeh.jpg",
]

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useLocalStorage<WindowState[]>("hv_windows", [])
  const [startOpen, setStartOpen] = useLocalStorage<boolean>("hv_start", false)
  const [wallpaper, setWallpaper] = useLocalStorage<string | null>("hv_wallpaper", null)
  const [wallpaperBlur, setWallpaperBlur] = useLocalStorage<number>("hv_wallpaper_blur", 6)
  const [wallpaperDim, setWallpaperDim] = useLocalStorage<number>("hv_wallpaper_dim", 0.18)
  const [wallpaperFit, setWallpaperFit] = useLocalStorage<Fit>("hv_wallpaper_fit", "cover")
  const [theme, setThemeState] = useLocalStorage<"light" | "dark">("hv_theme", "dark")
  const zRef = useRef<number>(windows.reduce((m, w) => Math.max(m, w.z), 0) || 1)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
  }, [theme])

  const toggleStart = useCallback(() => setStartOpen((s) => !s), [setStartOpen])

  const openApp = useCallback(
    (appId: AppId) => {
      const { innerWidth, innerHeight } = window
      const sz = defaultSize[appId]
      const x = Math.max(8, Math.floor((innerWidth - sz.w) / 2 + (Math.random() * 80 - 40)))
      const y = Math.max(48, Math.floor((innerHeight - sz.h) / 2 + (Math.random() * 80 - 40)))
      const id = uid()
      zRef.current += 1
      setWindows((prev) => [
        ...prev,
        {
          id,
          appId,
          title: appTitles[appId],
          x,
          y,
          width: sz.w,
          height: sz.h,
          minimized: false,
          maximized: false,
          z: zRef.current,
        },
      ])
      setStartOpen(false)
    },
    [setWindows, setStartOpen],
  )

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.filter((w) => w.id !== id))
    },
    [setWindows],
  )

  const toggleMinimize = useCallback(
    (id: string) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)))
    },
    [setWindows],
  )

  const minimizeAll = useCallback(() => {
    setWindows((prev) => prev.map((w) => ({ ...w, minimized: true })))
  }, [setWindows])

  const toggleMaximize = useCallback(
    (id: string) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized, minimized: false } : w)))
    },
    [setWindows],
  )

  const focusWindow = useCallback(
    (id: string) => {
      zRef.current += 1
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false, z: zRef.current } : w)))
    },
    [setWindows],
  )

  const moveWindow = useCallback(
    (id: string, x: number, y: number) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)))
    },
    [setWindows],
  )

  const resizeWindow = useCallback(
    (id: string, width: number, height: number) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, width, height } : w)))
    },
    [setWindows],
  )

  const setTheme = useCallback((mode: "light" | "dark") => setThemeState(mode), [setThemeState])

  const randomizeWallpaper = useCallback(() => {
    const idx = Math.floor(Math.random() * presetWallpapers.length)
    setWallpaper(presetWallpapers[idx])
  }, [setWallpaper])

  const value = useMemo<OSContextType>(
    () => ({
      windows,
      startOpen,
      wallpaper,
      wallpaperBlur,
      wallpaperDim,
      wallpaperFit,
      theme,
      isAnyFocused: windows.some((w) => !w.minimized),

      toggleStart,
      openApp,
      closeWindow,
      toggleMinimize,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      minimizeAll,

      setWallpaper,
      setWallpaperBlur,
      setWallpaperDim,
      setWallpaperFit,
      setTheme,
      randomizeWallpaper,
    }),
    [
      windows,
      startOpen,
      wallpaper,
      wallpaperBlur,
      wallpaperDim,
      wallpaperFit,
      theme,
      toggleStart,
      openApp,
      closeWindow,
      toggleMinimize,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      minimizeAll,
      setWallpaper,
      setWallpaperBlur,
      setWallpaperDim,
      setWallpaperFit,
      setTheme,
      randomizeWallpaper,
    ],
  )

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>
}

export function useOS() {
  const ctx = useContext(OSContext)
  if (!ctx) throw new Error("useOS must be used within OSProvider")
  return ctx
}
