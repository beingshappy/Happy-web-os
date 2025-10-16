"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TimerApp() {
  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [left, setLeft] = useState(60)
  const iv = useRef<any>(null)
  const iv2 = useRef<any>(null)

  useEffect(() => {
    if (running) {
      iv.current = setInterval(() => setMs((v) => v + 100), 100)
    } else {
      clearInterval(iv.current)
    }
    return () => clearInterval(iv.current)
  }, [running])

  function startCountdown() {
    clearInterval(iv2.current)
    setLeft(countdown)
    iv2.current = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          clearInterval(iv2.current)
          return 0
        }
        return l - 1
      })
    }, 1000)
  }

  const format = (t: number) => {
    const s = Math.floor(t / 1000)
    const mm = String(Math.floor(s / 60)).padStart(2, "0")
    const ss = String(s % 60).padStart(2, "0")
    return `${mm}:${ss}`
  }

  return (
    <div className="grid gap-3">
      <div className="rounded-md border border-border bg-card/60 p-3">
        <div className="text-sm font-semibold">Stopwatch</div>
        <div className="text-2xl font-mono">{format(ms)}</div>
        <div className="mt-2 flex gap-2">
          <Button onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Start"}</Button>
          <Button variant="secondary" onClick={() => setMs(0)}>
            Reset
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-border bg-card/60 p-3">
        <div className="text-sm font-semibold">Countdown (sec)</div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={countdown}
            onChange={(e) => setCountdown(Number(e.target.value))}
            className="w-24"
          />
          <Button onClick={startCountdown}>Start</Button>
        </div>
        <div className="mt-2 text-2xl font-mono">{left}s</div>
      </div>
    </div>
  )
}
