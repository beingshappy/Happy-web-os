"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [color, setColor] = useState("#00c17a")
  const [size, setSize] = useState(6)
  const drawing = useRef(false)

  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext("2d")!
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-card")
    ctx.fillRect(0, 0, cvs.width, cvs.height)
  }, [])

  const pos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onDown = (e: React.MouseEvent) => {
    drawing.current = true
    draw(e)
  }
  const onUp = () => (drawing.current = false)
  const draw = (e: React.MouseEvent) => {
    if (!drawing.current) return
    const ctx = canvasRef.current!.getContext("2d")!
    const { x, y } = pos(e)
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-3">
        <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-16 p-1" />
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-70">Size</span>
          <Slider value={[size]} min={1} max={20} onValueChange={(v) => setSize(v[0] ?? 6)} className="w-40" />
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={640}
        height={360}
        className="rounded-md border border-border bg-card"
        onMouseDown={onDown}
        onMouseMove={draw}
        onMouseUp={onUp}
        onMouseLeave={onUp}
      />
    </div>
  )
}
