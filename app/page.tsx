"use client"

import { Desktop } from "@/components/os/desktop"
import { Taskbar } from "@/components/os/taskbar"
import { StartMenu } from "@/components/os/start-menu"
import { OSProvider } from "@/components/os/os-provider"
import { Topbar } from "@/components/os/topbar"

export default function Page() {
  return (
    <OSProvider>
      <main className="relative h-[100dvh] w-full overflow-hidden text-foreground">
        <Topbar />
        <Desktop />
        <StartMenu />
        <Taskbar />
      </main>
    </OSProvider>
  )
}
