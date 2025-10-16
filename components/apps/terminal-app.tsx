"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

type Line = { text: string }

export function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([{ text: "HappyVerse Terminal. Type 'help'." }])
  const [cmd, setCmd] = useState("")

  function run(s: string) {
    const out = (() => {
      const t = s.trim()
      if (!t) return ""
      if (t === "help") return "Commands: help, date, clear, echo <text>"
      if (t === "date") return new Date().toString()
      if (t === "clear") {
        setLines([])
        return ""
      }
      if (t.startsWith("echo ")) return t.slice(5)
      return `Unknown: ${t}`
    })()
    if (out) setLines((ls) => [...ls, { text: out }])
  }

  return (
    <div className="grid h-full grid-rows-[1fr_auto]">
      <div className="overflow-auto rounded-md border border-border bg-card/60 p-2 font-mono text-sm">
        {lines.map((l, i) => (
          <div key={i}>{l.text}</div>
        ))}
      </div>
      <Input
        className="mt-2 font-mono"
        placeholder="Type a command…"
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setLines((ls) => [...ls, { text: `> ${cmd}` }])
            run(cmd)
            setCmd("")
          }
        }}
      />
    </div>
  )
}
