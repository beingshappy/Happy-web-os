"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Msg = { role: "user" | "assistant"; text: string }

export function JarvisApp() {
  const [prompt, setPrompt] = useState("")
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!prompt.trim()) return
    const userMsg: Msg = { role: "user", text: prompt.trim() }
    setMsgs((m) => [...m, userMsg])
    setPrompt("")
    setLoading(true)
    try {
      const res = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.text }),
      })
      const data = await res.json()
      const aiMsg: Msg = { role: "assistant", text: data.text ?? "No response" }
      setMsgs((m) => [...m, aiMsg])
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", text: "Error calling AI" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid h-full grid-rows-[1fr_auto] gap-2">
      <div className="grid gap-2 overflow-auto">
        {msgs.length === 0 && <div className="text-sm opacity-70">Ask me anything…</div>}
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`rounded-md border border-border p-2 ${m.role === "user" ? "bg-card/60" : "bg-secondary/60"}`}
          >
            <div className="text-xs opacity-70">{m.role === "user" ? "You" : "Jarvis"}</div>
            <div className="whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => {
            if (e.key === "Enter") send()
          }}
        />
        <Button onClick={send} disabled={loading}>
          {loading ? "Thinking…" : "Send"}
        </Button>
      </div>
    </div>
  )
}
