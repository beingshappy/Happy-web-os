"use client"

import { useEffect, useRef } from "react"

export function XApp() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = "x-widgets"
    if (!document.getElementById(id)) {
      const s = document.createElement("script")
      s.id = id
      s.async = true
      s.src = "https://platform.twitter.com/widgets.js"
      document.body.appendChild(s)
    } else {
      // @ts-ignore
      window.twttr?.widgets?.load(ref.current)
    }
  }, [])

  return (
    <div ref={ref} className="h-full w-full overflow-auto p-2">
      <a className="twitter-timeline" data-theme="light" href="https://twitter.com/Twitter">
        Tweets by Twitter
      </a>
    </div>
  )
}

export default XApp
