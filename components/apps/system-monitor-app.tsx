"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Point = { t: number; cpu: number; mem: number }

export function SystemMonitorApp() {
  const [data, setData] = useState<Point[]>([])

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      setData((d) => {
        const t = Math.round((Date.now() - start) / 1000)
        const next = [...d, { t, cpu: 30 + Math.random() * 60, mem: 20 + Math.random() * 50 }].slice(-30)
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="t" stroke="var(--color-muted-foreground)" />
          <YAxis domain={[0, 100]} stroke="var(--color-muted-foreground)" />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke="var(--color-chart-1)" dot={false} />
          <Line type="monotone" dataKey="mem" stroke="var(--color-chart-2)" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs opacity-70">Live CPU/Memory (simulated)</div>
    </div>
  )
}
