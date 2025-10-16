"use client"
import { useMemo, useState } from "react"

function TicTacToeApp() {
  const [board, setBoard] = useState<(null | "X" | "O")[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<"X" | "O">("X")
  const winner = useMemo(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a]
    }
    return null
  }, [board])
  const move = (i: number) => {
    if (board[i] || winner) return
    const next = board.slice()
    next[i] = turn
    setBoard(next)
    setTurn(turn === "X" ? "O" : "X")
  }
  return (
    <div className="h-full w-full p-4 bg-(--card) text-(--foreground)">
      <div className="grid grid-cols-3 gap-2 w-56">
        {board.map((v, i) => (
          <button
            key={i}
            onClick={() => move(i)}
            className="h-16 rounded-md border border-(--border) bg-(--popover) text-2xl font-semibold"
          >
            {v}
          </button>
        ))}
      </div>
      <div className="mt-3">
        {winner ? `Winner: ${winner}` : `Turn: ${turn}`}
        <button
          className="ml-3 px-2 py-1 text-xs rounded-md bg-(--popover) border border-(--border)"
          onClick={() => {
            setBoard(Array(9).fill(null))
            setTurn("X")
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default TicTacToeApp
export { TicTacToeApp }
