import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SelectionPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground">Choose Your Path</CardTitle>
          <p className="text-muted-foreground">How would you like to explore hobbies today?</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/diagnosis" className="block">
            <Button
              variant="default"
              className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col gap-1"
            >
              <span className="font-semibold">Take Hobby Diagnosis</span>
              <span className="text-sm opacity-90">Discover hobbies that match your personality</span>
            </Button>
          </Link>

          <Link href="/community-selection" className="block">
            <Button
              variant="outline"
              className="w-full h-16 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground flex flex-col gap-1 bg-transparent"
            >
              <span className="font-semibold">Join Community</span>
              <span className="text-sm opacity-75">Browse and join hobby communities</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
