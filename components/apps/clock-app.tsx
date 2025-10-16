"use client"

import { useEffect, useState } from "react"

export function ClockApp() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid place-items-center h-full">
      <div className="rounded-xl border border-border bg-card/60 p-6 text-center backdrop-blur">
        <div className="text-4xl font-mono">{now.toLocaleTimeString()}</div>
        <div className="text-sm opacity-70">{now.toLocaleDateString()}</div>
      </div>
    </div>
  )
}
