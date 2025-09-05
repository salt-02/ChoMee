"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Users, Search, User } from "lucide-react"
import { usePathname } from "next/navigation"
import "./yuano.css";

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link href="/">
          <Button
            variant={pathname === "/" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Home className="w-4 h-4" />
            <span className="text-xs">Home</span>
          </Button>
        </Link>

        <Link href="/community-selection">
          <Button
            variant={pathname === "/community-selection" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Users className="w-4 h-4" />
            <span className="text-xs">Communities</span>
          </Button>
        </Link>

        <Link href="/diagnosis">
          <Button
            variant={pathname === "/diagnosis" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Search className="w-4 h-4" />
            <span className="text-xs">Discover</span>
          </Button>
        </Link>

        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
          <User className="w-4 h-4" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  )
}

export function DesktopNavigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-card border-b border-border p-4 z-50">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">HF</span>
          </div>
          <span className="font-bold text-card-foreground">Hobby Finder</span>
        </Link>

        <div className="flex gap-4">
          <Link href="/">
            <Button variant={pathname === "/" ? "default" : "ghost"}>Home</Button>
          </Link>
          <Link href="/community-selection">
            <Button variant={pathname === "/community-selection" ? "default" : "ghost"}>Communities</Button>
          </Link>
          <Link href="/diagnosis">
            <Button variant={pathname === "/diagnosis" ? "default" : "ghost"}>Discover</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
