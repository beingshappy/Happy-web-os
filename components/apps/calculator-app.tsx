"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "(", ")", "%", "C"]

function safeEval(expr: string): string {
  const sanitized = expr.replace(/[^0-9+\-*/().% ]/g, "")
  try {
    // eslint-disable-next-line no-new-func
    const res = Function(`"use strict"; return (${sanitized || "0"})`)()
    if (!isFinite(res)) return "Error"
    return String(res)
  } catch {
    return "Error"
  }
}

export function CalculatorApp() {
  const [display, setDisplay] = useState("")

  const onKey = (k: string) => {
    if (k === "C") setDisplay("")
    else if (k === "=") setDisplay(safeEval(display))
    else setDisplay((d) => `${d}${k}`)
  }

  return (
    <div className="grid gap-3">
      <div className="rounded-md border border-border bg-card/60 p-3 text-right text-2xl font-mono">
        {display || "0"}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {keys.map((k) => (
          <Button
            key={k}
            variant={["/", "*", "-", "+", "=", "C", "%"].includes(k) ? "secondary" : "outline"}
            onClick={() => onKey(k)}
          >
            {k}
          </Button>
        ))}
      </div>
    </div>
  )
}
