"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function MusicApp() {
  const [src, setSrc] = useLocalStorage<string | null>("hv_music_src", null)
  const [name, setName] = useLocalStorage<string>("hv_music_name", "")
  const fileRef = useRef<HTMLInputElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    el.addEventListener("play", onPlay)
    el.addEventListener("pause", onPause)
    return () => {
      el.removeEventListener("play", onPlay)
      el.removeEventListener("pause", onPause)
    }
  }, [])

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setSrc(url)
    setName(file.name)
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Input type="file" accept="audio/*" ref={fileRef} onChange={onPick} />
        <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
          Choose
        </Button>
      </div>
      <div className="rounded-md border border-border bg-card/60 p-3">
        <div className="text-sm font-semibold">{name || "No track selected"}</div>
        <audio ref={audioRef} controls src={src ?? undefined} className="mt-2 w-full" />
      </div>
      <div className="text-xs opacity-70">{playing ? "Playing…" : "Paused"}</div>
    </div>
  )
}
