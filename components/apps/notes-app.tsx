"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

type Note = { id: string; title: string; body: string; createdAt: number }

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function NotesApp() {
  const [notes, setNotes] = useLocalStorage<Note[]>("hv_notes", [])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const add = () => {
    if (!title.trim() && !body.trim()) return
    setNotes([{ id: uid(), title: title.trim(), body: body.trim(), createdAt: Date.now() }, ...notes])
    setTitle("")
    setBody("")
  }

  const remove = (id: string) => setNotes(notes.filter((n) => n.id !== id))

  const update = (id: string, patch: Partial<Note>) =>
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...patch } : n)))

  return (
    <div className="grid gap-3">
      <Card className="bg-card/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">New Note</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea
            placeholder="Write something..."
            className="min-h-24"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={add}>Add</Button>
        </CardFooter>
      </Card>

      <div className="grid gap-2">
        {notes.length === 0 && <div className="text-sm opacity-70">No notes yet.</div>}
        {notes.map((n) => (
          <Card key={n.id} className="bg-card/70 backdrop-blur">
            <CardHeader>
              <Input value={n.title} onChange={(e) => update(n.id, { title: e.target.value })} />
            </CardHeader>
            <CardContent>
              <Textarea className="min-h-24" value={n.body} onChange={(e) => update(n.id, { body: e.target.value })} />
            </CardContent>
            <CardFooter className="flex justify-between text-xs opacity-70">
              <span>{new Date(n.createdAt).toLocaleString()}</span>
              <Button size="sm" variant="destructive" onClick={() => remove(n.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
