"use client"

export function Topbar() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[9999] flex h-10 items-center justify-center">
      <div className="pointer-events-auto glass-panel neon-edge soft-shadow smooth glass-reflection rounded-full px-4 py-1 text-sm font-serif tracking-wide text-foreground/90">
        <span className="title-shine">HAPPY OS</span>
      </div>
    </header>
  )
}
