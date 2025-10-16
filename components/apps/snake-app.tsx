"use client"
import { useEffect, useRef, useState } from "react"

type Cell = { x: number; y: number }
const W = 24,
  H = 16,
  SPEED = 160

function SnakeGame() {
  const [snake, setSnake] = useState<Cell[]>([{ x: 12, y: 8 }])
  const [dir, setDir] = useState<Cell>({ x: 1, y: 0 })
  const [food, setFood] = useState<Cell>({ x: 5, y: 5 })
  const [dead, setDead] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && dir.y !== 1) setDir({ x: 0, y: -1 })
      if (e.key === "ArrowDown" && dir.y !== -1) setDir({ x: 0, y: 1 })
      if (e.key === "ArrowLeft" && dir.x !== 1) setDir({ x: -1, y: 0 })
      if (e.key === "ArrowRight" && dir.x !== -1) setDir({ x: 1, y: 0 })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [dir])

  useEffect(() => {
    if (dead) return
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = { x: (prev[0].x + dir.x + W) % W, y: (prev[0].y + dir.y + H) % H }
        const hit = prev.some((c) => c.x === head.x && c.y === head.y)
        if (hit) {
          setDead(true)
          return prev
        }
        const newSnake = [head, ...prev]
        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H) })
          return newSnake
        } else {
          newSnake.pop()
          return newSnake
        }
      })
    }, SPEED)
    return () => clearInterval(id)
  }, [dir, food, dead])

  return (
    <div className="h-full w-full p-4 bg-(--card) text-(--foreground)">
      <div
        ref={ref}
        className="grid"
        style={{ gridTemplateColumns: `repeat(${W}, 16px)`, gridTemplateRows: `repeat(${H},16px)`, gap: 2 }}
      >
        {Array.from({ length: W * H }).map((_, i) => {
          const x = i % W,
            y = Math.floor(i / W)
          const isSnake = snake.some((c) => c.x === x && c.y === y)
          const isFood = food.x === x && food.y === y
          return (
            <div
              key={i}
              className="w-4 h-4 rounded-sm"
              style={{
                background: isSnake ? "var(--os-accent)" : isFood ? "var(--os-highlight)" : "rgba(255,255,255,0.06)",
              }}
            />
          )
        })}
      </div>
      <div className="mt-2">{dead ? "Game over" : "Use arrow keys"}</div>
      <button
        className="mt-2 px-2 py-1 text-xs rounded-md bg-(--popover) border border-(--border)"
        onClick={() => {
          setSnake([{ x: 12, y: 8 }])
          setDir({ x: 1, y: 0 })
          setFood({ x: 5, y: 5 })
          setDead(false)
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default SnakeGame
export { SnakeGame }
