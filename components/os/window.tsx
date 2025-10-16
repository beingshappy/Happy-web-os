"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useOS, type WindowState } from "./os-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function WindowSurface({ win, content }: { win: WindowState; content: React.ReactNode }) {
  const { closeWindow, toggleMinimize, toggleMaximize, focusWindow, moveWindow, resizeWindow } = useOS()
  const ref = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const resizeStart = useRef<{ w: number; h: number; x: number; y: number }>({ w: 0, h: 0, x: 0, y: 0 })

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (dragging && !win.maximized) {
        const x = e.clientX - dragOffset.current.x
        const y = e.clientY - dragOffset.current.y
        moveWindow(win.id, Math.max(0, x), Math.max(40, y))
      } else if (resizing && !win.maximized) {
        const dx = e.clientX - resizeStart.current.x
        const dy = e.clientY - resizeStart.current.y
        const newW = Math.max(320, resizeStart.current.w + dx)
        const newH = Math.max(240, resizeStart.current.h + dy)
        resizeWindow(win.id, newW, newH)
      }
    }
    function onUp() {
      setDragging(false)
      setResizing(false)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [dragging, resizing, moveWindow, resizeWindow, win.id, win.maximized])

  const onHeaderDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || win.maximized) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    setDragging(true)
    focusWindow(win.id)
  }

  const onHeaderDouble = () => toggleMaximize(win.id)

  const onResizeDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || win.maximized) return
    resizeStart.current = { w: win.width, h: win.height, x: e.clientX, y: e.clientY }
    setResizing(true)
    focusWindow(win.id)
  }

  const maximizedStyle = win.maximized
    ? { left: 8, top: 8, right: 8, bottom: 56, width: "auto", height: "auto" }
    : { left: win.x, top: win.y, width: win.width, height: win.height as number, zIndex: win.z }

  return (
    <div
      ref={ref}
      style={win.maximized ? maximizedStyle : { ...maximizedStyle, zIndex: win.z }}
      className={cn(
        "absolute select-none overflow-hidden rounded-xl glass-panel neon-edge soft-shadow smooth-md transition-[box-shadow,transform,opacity] will-change-transform",
        win.minimized ? "opacity-0 pointer-events-none scale-95" : "opacity-100",
      )}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        className="flex items-center justify-between bg-transparent/20 backdrop-blur-sm px-3 py-2 text-sm ring-1 ring-inset ring-border/70 glass-reflection"
        onMouseDown={onHeaderDown}
        onDoubleClick={onHeaderDouble}
      >
        <div className="font-serif font-medium tracking-wide">{win.title}</div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" aria-label="Minimize" onClick={() => toggleMinimize(win.id)}>
            <span className="sr-only">Minimize</span>
            <span className="h-3 w-3 rounded-sm bg-accent" />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Maximize" onClick={() => toggleMaximize(win.id)}>
            <span className="sr-only">Maximize</span>
            <span className="h-3 w-3 rounded-sm bg-primary" />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Close" onClick={() => closeWindow(win.id)}>
            <span className="sr-only">Close</span>
            <span className="h-3 w-3 rounded-sm bg-destructive" />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto bg-transparent p-3">{content}</div>
      {!win.maximized && (
        <div
          title="Resize"
          aria-label="Resize"
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
          onMouseDown={onResizeDown}
        />
      )}
    </div>
  )
}
