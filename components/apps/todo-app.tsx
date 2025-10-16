"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Todo = { id: string; text: string; done: boolean }
function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("hv_todos", [])
  const [text, setText] = useState("")

  function add() {
    if (!text.trim()) return
    setTodos([{ id: uid(), text: text.trim(), done: false }, ...todos])
    setText("")
  }
  function toggle(id: string) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }
  function remove(id: string) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <Button onClick={add}>Add</Button>
      </div>
      <div className="grid gap-2">
        {todos.length === 0 && <div className="text-sm opacity-70">Nothing yet.</div>}
        {todos.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-md border border-border bg-card/60 p-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span className={t.done ? "line-through opacity-60" : ""}>{t.text}</span>
            </label>
            <Button size="sm" variant="destructive" onClick={() => remove(t.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
