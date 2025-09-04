import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation, DesktopNavigation } from "@/components/navigation"
import Link from "next/link"

export default function TitlePage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <DesktopNavigation />

      <div className="flex items-center justify-center p-4 min-h-screen md:min-h-[calc(100vh-5rem)]">
        <Card className="w-full max-w-md bg-card border-border">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-card-foreground text-balance">Hobby Finder</h1>
              <p className="text-muted-foreground text-pretty">
                Discover your perfect hobby and connect with a community of like-minded enthusiasts
              </p>
            </div>

            <Link href="/selection" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  )
}
