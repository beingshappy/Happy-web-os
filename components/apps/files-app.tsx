"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FilesApp() {
  const keys = Object.keys(localStorage ?? {})
  const noteCount = (JSON.parse(localStorage.getItem("hv_notes") ?? "[]") as any[]).length
  const galleryCount = (JSON.parse(localStorage.getItem("hv_gallery") ?? "[]") as any[]).length

  return (
    <div className="grid gap-3">
      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">Library</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <div>Notes: {noteCount}</div>
          <div>Gallery images: {galleryCount}</div>
        </CardContent>
      </Card>
      <Card className="bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">Local Storage Keys</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-1 text-xs opacity-80">
          {keys.length ? keys.map((k) => <div key={k}>{k}</div>) : <div>No keys</div>}
        </CardContent>
      </Card>
    </div>
  )
}
