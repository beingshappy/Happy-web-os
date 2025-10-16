"use client"
import { useEffect, useState } from "react"

const SIZE = 4
function spawn(board: number[][]) {
  const empty: [number, number][] = []
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!board[y][x]) empty.push([x, y])
  if (!empty.length) return board
  const [x, y] = empty[Math.floor(Math.random() * empty.length)]
  board[y][x] = Math.random() < 0.9 ? 2 : 4
  return board
}
function slide(row: number[]) {
  const arr = row.filter((n) => n)
  for (let i = 0; i < arr.length - 1; i++)
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2
      arr[i + 1] = 0
    }
  return [...arr.filter((n) => n), ...Array(SIZE - arr.filter((n) => n).length).fill(0)]
}
function Game2048App() {
  const [board, setBoard] = useState<number[][]>(() =>
    spawn(spawn(Array.from({ length: SIZE }, () => Array(SIZE).fill(0)))),
  )
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      let b = board.map((r) => [...r])
      if (e.key === "ArrowLeft") {
        b = b.map(slide)
      } else if (e.key === "ArrowRight") {
        b = b.map((r) => slide(r.reverse()).reverse())
      } else if (e.key === "ArrowUp") {
        const t = b[0].map((_, i) => b.map((r) => r[i]))
        const tt = t.map(slide)
        b = tt[0].map((_, i) => tt.map((r) => r[i]))
      } else if (e.key === "ArrowDown") {
        const t = b[0].map((_, i) => b.map((r) => r[i]))
        const tt = t.map((r) => slide(r.reverse()).reverse())
        b = tt[0].map((_, i) => tt.map((r) => r[i]))
      } else return
      e.preventDefault()
      setBoard(spawn(b))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [board])
  return (
    <div className="h-full w-full p-4 bg-(--card) text-(--foreground)">
      <div
        className="inline-grid gap-2 p-2 rounded-lg bg-(--popover)"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 64px)` }}
      >
        {board.flat().map((n, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-md flex items-center justify-center text-xl font-semibold border border-(--border)"
            style={{ background: n ? "rgba(22,119,255,0.2)" : "rgba(255,255,255,0.06)", color: "var(--foreground)" }}
          >
            {n || ""}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Game2048App
export { Game2048App }
