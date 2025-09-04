"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Hobby {
  name: string
  description: string
  image: string
  matchPercentage: number
  tags: string[]
}

const hobbies: Hobby[] = [
  {
    name: "Photography",
    description:
      "Capture beautiful moments and express your creativity through the lens. Perfect for those who love both technical precision and artistic expression.",
    image: "/camera-photography-nature.jpg",
    matchPercentage: 0,
    tags: ["Creative", "Technical", "Outdoor", "Solo"],
  },
  {
    name: "Rock Climbing",
    description:
      "Challenge yourself physically and mentally while connecting with nature. Great for adventure seekers who love problem-solving.",
    image: "/rock-climbing-mountain-adventure.jpg",
    matchPercentage: 0,
    tags: ["Physical", "Outdoor", "Challenge", "Community"],
  },
  {
    name: "Cooking",
    description:
      "Create delicious meals and explore different cultures through food. Perfect for those who enjoy hands-on creativity and sharing with others.",
    image: "/cooking-kitchen-chef-food.jpg",
    matchPercentage: 0,
    tags: ["Creative", "Hands-on", "Social", "Cultural"],
  },
  {
    name: "Digital Art",
    description:
      "Express your creativity using modern technology. Ideal for those who love visual arts and working with digital tools.",
    image: "/digital-art-tablet-drawing-creative.jpg",
    matchPercentage: 0,
    tags: ["Creative", "Digital", "Solo", "Artistic"],
  },
  {
    name: "Gardening",
    description:
      "Connect with nature and create beautiful spaces. Perfect for those who enjoy peaceful, nurturing activities with long-term rewards.",
    image: "/gardening-plants-flowers-nature.jpg",
    matchPercentage: 0,
    tags: ["Nature", "Peaceful", "Hands-on", "Long-term"],
  },
  {
    name: "Board Games",
    description:
      "Engage in strategic thinking while socializing with friends. Great for those who love mental challenges and community.",
    image: "/board-games-strategy-friends-social.jpg",
    matchPercentage: 0,
    tags: ["Social", "Strategic", "Indoor", "Community"],
  },
]

export default function ResultsPage() {
  const [suggestedHobbies, setSuggestedHobbies] = useState<Hobby[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const answers = localStorage.getItem("hobbyDiagnosisAnswers")
    if (!answers) {
      router.push("/diagnosis")
      return
    }

    // Simple algorithm to calculate hobby matches based on answers
    const parsedAnswers = JSON.parse(answers) as number[]
    const hobbiesWithScores = hobbies.map((hobby) => {
      // Simple scoring algorithm - in a real app this would be more sophisticated
      let score = Math.random() * 40 + 60 // Base score between 60-100

      // Adjust based on some answer patterns
      const outdoorScore = parsedAnswers[0] // Indoor vs Outdoor
      const creativityScore = parsedAnswers[2] // Creative vs Analytical
      const socialScore = parsedAnswers[3] // Alone vs With Others

      if (hobby.tags.includes("Outdoor") && outdoorScore > 2) score += 10
      if (hobby.tags.includes("Creative") && creativityScore < 2) score += 10
      if (hobby.tags.includes("Social") && socialScore > 2) score += 10

      return {
        ...hobby,
        matchPercentage: Math.min(Math.round(score), 100),
      }
    })

    // Sort by match percentage and take top 3
    const topHobbies = hobbiesWithScores.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 3)

    setSuggestedHobbies(topHobbies)
    setLoading(false)
  }, [router])

  const getCommunitySlug = (hobbyName: string) => {
    const slugMap: { [key: string]: string } = {
      Photography: "photography",
      "Rock Climbing": "rock-climbing",
      Cooking: "cooking",
      "Digital Art": "digital-art",
      Gardening: "gardening",
      "Board Games": "board-games",
    }
    return slugMap[hobbyName] || hobbyName.toLowerCase().replace(/\s+/g, "-")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your responses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-card-foreground">Your Hobby Matches</CardTitle>
            <p className="text-muted-foreground">
              Based on your responses, here are the hobbies that best match your personality
            </p>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {suggestedHobbies.map((hobby, index) => (
            <Card key={hobby.name} className="bg-card border-border overflow-hidden">
              <div className="relative">
                <img src={hobby.image || "/placeholder.svg"} alt={hobby.name} className="w-full h-48 object-cover" />
                <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                  {hobby.matchPercentage}% Match
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{hobby.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-pretty">{hobby.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hobby.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={`/community/${getCommunitySlug(hobby.name)}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Join {hobby.name} Community
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium text-card-foreground mb-4">Explore More Communities</h3>
            <p className="text-muted-foreground mb-6">
              Discover other hobby communities and connect with people who share different interests.
            </p>
            <Link href="/community-selection">
              <Button
                variant="outline"
                className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                Browse All Communities
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
