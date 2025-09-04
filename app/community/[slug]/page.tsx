"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, Camera, Send, X, ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Navigation, DesktopNavigation } from "@/components/navigation"

interface Comment {
  id: string
  author: string
  username: string
  avatar: string
  content: string
  timestamp: string
}

interface Post {
  id: string
  author: string
  username: string
  avatar: string
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: Comment[]
  isLiked: boolean
  showComments: boolean
}

const communityData = {
  photography: {
    name: "Photography Enthusiasts",
    description: "Share your best shots and learn from fellow photographers",
    memberCount: 2847,
    color: "bg-blue-500",
  },
  "rock-climbing": {
    name: "Rock Climbing Adventures",
    description: "Connect with climbers and share your adventures",
    memberCount: 1523,
    color: "bg-green-500",
  },
  cooking: {
    name: "Culinary Creators",
    description: "Share recipes and cooking experiences",
    memberCount: 3921,
    color: "bg-orange-500",
  },
  "digital-art": {
    name: "Digital Artists Hub",
    description: "Showcase your digital artwork and get feedback",
    memberCount: 1876,
    color: "bg-purple-500",
  },
  gardening: {
    name: "Garden Growers",
    description: "Share your garden progress and plant care tips",
    memberCount: 2134,
    color: "bg-green-600",
  },
  "board-games": {
    name: "Board Game Society",
    description: "Discuss strategy and find gaming groups",
    memberCount: 1654,
    color: "bg-red-500",
  },
}

const samplePosts: Post[] = [
  {
    id: "1",
    author: "Sarah Chen",
    username: "sarahc_photos",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just captured this amazing sunset at the beach! The golden hour lighting was absolutely perfect. What's your favorite time of day to shoot?",
    image: "/sample-sunset-photo.jpg",
    timestamp: "2 hours ago",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: "Mike Photo",
        username: "mikep",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Blue hour is my favorite! Great shot!",
        timestamp: "1 hour ago",
      },
    ],
    isLiked: false,
    showComments: false,
  },
  {
    id: "2",
    author: "Mike Rodriguez",
    username: "mike_climbs",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Completed my first 5.12a route today! The overhang section was brutal but so rewarding. Thanks to everyone who gave me beta on this one 🧗‍♂️",
    timestamp: "4 hours ago",
    likes: 31,
    comments: [],
    isLiked: true,
    showComments: false,
  },
  {
    id: "3",
    author: "Emma Thompson",
    username: "emma_cooks",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Made homemade pasta from scratch for the first time! It was messy but so worth it. The texture is completely different from store-bought. Recipe in comments!",
    image: "/sample-pasta-dish.jpg",
    timestamp: "6 hours ago",
    likes: 18,
    comments: [
      {
        id: "c2",
        author: "Chef Anna",
        username: "anna_chef",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Looks delicious! What flour did you use?",
        timestamp: "5 hours ago",
      },
    ],
    isLiked: false,
    showComments: false,
  },
]

export default function CommunityPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [newPost, setNewPost] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentUser] = useState({
    name: "You",
    username: "your_username",
    avatar: "/placeholder.svg?height=40&width=40",
  })

  const community = communityData[slug as keyof typeof communityData]

  if (!community) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">Community Not Found</h2>
            <p className="text-muted-foreground">The community you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmitPost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: newPost,
      image: selectedImage || undefined,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      isLiked: false,
      showComments: false,
    }

    setPosts([post, ...posts])
    setNewPost("")
    setSelectedImage(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleComment = (postId: string) => {
    const commentText = commentInputs[postId]
    if (!commentText?.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: commentText,
      timestamp: "Just now",
    }

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post,
      ),
    )

    setCommentInputs({ ...commentInputs, [postId]: "" })
  }

  const toggleComments = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, showComments: !post.showComments } : post)))
  }

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.author} shared in ${community.name}`,
        text: post.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${post.content} - ${window.location.href}`)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <DesktopNavigation />

      <div className={`${community.color} text-white p-6`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{community.name}</h1>
              <p className="text-white/90">{community.description}</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white">{community.memberCount.toLocaleString()} members</Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Share with the community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="What's on your mind? Share your experiences, ask questions, or start a discussion..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-20 resize-none"
                />

                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Upload preview"
                      className="rounded-lg max-w-full h-48 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4" />
                      Add Photo
                    </Button>
                  </div>
                  <Button
                    onClick={handleSubmitPost}
                    disabled={!newPost.trim()}
                    className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={post.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-card-foreground">{post.author}</span>
                      <span className="text-muted-foreground">@{post.username}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                      <Badge variant="secondary" className="text-xs">
                        {community.name}
                      </Badge>
                    </div>

                    <p className="text-foreground text-pretty">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post content"
                        className="rounded-lg max-w-full h-auto"
                      />
                    )}

                    <div className="flex items-center gap-6 pt-2">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 text-sm transition-colors ${
                          post.isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                        {post.likes}
                      </button>

                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {post.comments.length}
                      </button>

                      <button
                        onClick={() => handleShare(post)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>

                    {post.showComments && (
                      <div className="space-y-3 pt-3 border-t border-border">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium text-card-foreground">{comment.author}</span>
                                <span className="text-muted-foreground">@{comment.username}</span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm text-foreground mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}

                        <div className="flex gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={commentInputs[post.id] || ""}
                              onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                              className="flex-1"
                              onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleComment(post.id)}
                              disabled={!commentInputs[post.id]?.trim()}
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  )
}
