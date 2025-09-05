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
            <span className="text-xs">serch</span>
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
    <body>
  <header class="top-area">
    <h1 class="logo">ChoMee</h1>
    <svg class="wave-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <!-- オレンジの波：山3つ、左にシフト -->
      <path fill="#F49342" fill-opacity="0.5"
        d="M0,100 C240,200 480,0 720,100 C960,200 1200,0 1440,100 L1440,0 L0,0 Z"></path>
    </svg>
  </header>

  <main class="content">
   <div class="blob">趣味診断</div>
   <div class="blob2">コミュニティーに入る</div>
   
    <!-- メインコンテンツ -->
  </main>

 <footer class="bottom-area">
  <svg class="wave-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none" >
    <path fill="#1C668B" fill-opacity="0.5"
      d="M0,100 C240,0 480,200 720,100 C960,0 1200,200 1440,100 L1440,200 L0,200 Z"></path>
  </svg>
  <div class="icons">
    <!-- 左：検索 -->
    <a href="search.html" class="icon-btn">
      <i class="fas fa-search"></i>
    </a>

    <!-- 真ん中：人＋左矢印 -->
    <a href="community.html" class="icon-btn">
      <div class="custom-icon">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="16" r="11" fill="none" stroke="white" stroke-width="6"/>
          <path d="M25 25 Q20 40 21 48 M41 25 Q46 40 45 48" fill="none" stroke="white" stroke-width="6" stroke-linecap="round"/>
          <line x1="4" y1="28" x2="15" y2="28" stroke="white" stroke-width="4" stroke-linecap="round"/>
          <polyline points="9,23 4,28 9,33" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </a>

    <!-- 右：歯車 -->
    <a href="setting.html" class="icon-btn">
      <i class="fas fa-cog"></i>
    </a>
  </div>
</footer>

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
