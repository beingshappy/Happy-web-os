"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function GalleryApp() {
  const [imgs, setImgs] = useLocalStorage<string[]>("hv_gallery", ["/placeholder.jpg", "/placeholder-user.jpg"])
  const fileRef = useRef<HTMLInputElement | null>(null)

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => setImgs((g) => [...g, String(reader.result)])
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  const clear = () => setImgs([])

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={onPick} className="hidden" />
        <Button onClick={() => fileRef.current?.click()}>Add Images</Button>
        <Button variant="destructive" onClick={clear}>
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {imgs.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src || "/placeholder.svg"}
            alt="Gallery item"
            className="h-24 w-full rounded-md object-cover"
          />
        ))}
      </div>
    </div>
  )
}
