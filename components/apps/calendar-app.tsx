"use client"

import { useMemo, useState } from "react"

function getMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1)
  const startDay = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function CalendarApp() {
  const [cursor, setCursor] = useState(new Date())
  const y = cursor.getFullYear()
  const m = cursor.getMonth()
  const grid = useMemo(() => getMonthGrid(y, m), [y, m])

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <button className="underline" onClick={() => setCursor(new Date(y, m - 1, 1))}>
          Prev
        </button>
        <div className="font-semibold">{cursor.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
        <button className="underline" onClick={() => setCursor(new Date(y, m + 1, 1))}>
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs opacity-70">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {grid.map((d, i) => (
          <div key={i} className="h-16 rounded-md border border-border/60 bg-card/50 p-1 text-right text-xs">
            {d ?? ""}
          </div>
        ))}
      </div>
    </div>
  )
}
