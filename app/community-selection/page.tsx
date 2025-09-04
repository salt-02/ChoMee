import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const communities = [
  {
    id: "photography",
    name: "Photography Enthusiasts",
    description:
      "Share your best shots, get feedback, and learn new techniques from fellow photographers. From beginners to professionals, everyone is welcome.",
    image: "/photography-community-camera.jpg",
    memberCount: 2847,
    tags: ["Creative", "Visual", "Technical"],
    recentActivity: "Very Active",
  },
  {
    id: "rock-climbing",
    name: "Rock Climbing Adventures",
    description:
      "Connect with climbers, share routes, plan trips, and discuss gear. Whether you're into bouldering or sport climbing, find your climbing partners here.",
    image: "/rock-climbing-community-mountain.jpg",
    memberCount: 1523,
    tags: ["Outdoor", "Adventure", "Fitness"],
    recentActivity: "Active",
  },
  {
    id: "cooking",
    name: "Culinary Creators",
    description:
      "Share recipes, cooking tips, and food photos. From home cooks to professional chefs, discover new flavors and techniques together.",
    image: "/cooking-community-kitchen.jpg",
    memberCount: 3921,
    tags: ["Creative", "Social", "Cultural"],
    recentActivity: "Very Active",
  },
  {
    id: "digital-art",
    name: "Digital Artists Hub",
    description:
      "Showcase your digital artwork, get constructive feedback, and learn about new tools and techniques in the digital art world.",
    image: "/digital-art-community-tablet.jpg",
    memberCount: 1876,
    tags: ["Creative", "Digital", "Artistic"],
    recentActivity: "Active",
  },
  {
    id: "gardening",
    name: "Garden Growers",
    description:
      "Share your garden progress, ask for plant care advice, and connect with fellow green thumbs. From houseplants to vegetable gardens.",
    image: "/gardening-community-plants.jpg",
    memberCount: 2134,
    tags: ["Nature", "Peaceful", "Sustainable"],
    recentActivity: "Moderate",
  },
  {
    id: "board-games",
    name: "Board Game Society",
    description:
      "Discuss strategy, review games, and find local gaming groups. From classic games to the latest releases, all board game lovers welcome.",
    image: "/board-games-community-table.jpg",
    memberCount: 1654,
    tags: ["Social", "Strategic", "Indoor"],
    recentActivity: "Active",
  },
]

const activityColors = {
  "Very Active": "bg-green-500",
  Active: "bg-yellow-500",
  Moderate: "bg-orange-500",
}

export default function CommunitySelectionPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-card-foreground">Join a Community</CardTitle>
            <p className="text-muted-foreground">
              Connect with like-minded people who share your interests and passions
            </p>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <Card
              key={community.id}
              className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={community.image || "/placeholder.svg"}
                  alt={community.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className="bg-background/90 text-foreground">
                    {community.memberCount.toLocaleString()} members
                  </Badge>
                  <div
                    className={`w-3 h-3 rounded-full ${activityColors[community.recentActivity as keyof typeof activityColors]}`}
                    title={community.recentActivity}
                  />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{community.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-pretty">{community.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {community.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{community.recentActivity}</span>
                  <Link href={`/community/${community.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Join Community</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium text-card-foreground mb-2">Don't see your hobby?</h3>
            <p className="text-muted-foreground mb-4">
              Take our hobby diagnosis to discover new interests that match your personality
            </p>
            <Link href="/diagnosis">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                Take Hobby Diagnosis
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
