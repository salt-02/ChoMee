"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Camera, Send, X, Plus, Search, User } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

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
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #D4B896 0%, #F5F1E8 50%, #E6D7B8 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 opacity-30"
          style={{
            background: "#F5F1E8",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute top-20 -right-32 w-80 h-80 opacity-40"
          style={{
            background: "#E6D7B8",
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, #8FA8B2 0%, transparent 100%)",
            borderRadius: "50% 50% 0 0 / 20% 20% 0 0",
          }}
        />
      </div>

      <div
        className="fixed top-0 left-0 right-0 z-30 p-6 text-center"
        style={{
          background: "linear-gradient(135deg, #D4B896 0%, #F5F1E8 50%, #E6D7B8 100%)",
        }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#4A90A4" }}>
          ChoMee
        </h1>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 pt-20 pb-24 space-y-4">
        <div className="columns-2 gap-3 space-y-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden break-inside-avoid mb-3"
            >
              <CardContent className="p-0">
                {post.image && (
                  <div className="w-full">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Post content */}
                <div className="p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm">{post.author}</div>
                      <div className="text-xs text-gray-600 mt-1 leading-relaxed">{post.content}</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleLike(post.id)} className="flex items-center gap-1">
                        <div
                          className="w-6 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#E6D7B8" }}
                        >
                          <MessageCircle className="w-3 h-3 text-gray-600" />
                        </div>
                      </button>
                      <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1">
                        <div
                          className="w-6 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#E6D7B8" }}
                        >
                          <Heart
                            className={`w-3 h-3 ${post.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments section */}
                {post.showComments && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-2 pt-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-800">{comment.author}</span>
                            <span className="text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-2 pt-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex gap-2">
                        <Input
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          className="flex-1 rounded-full"
                          onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className="rounded-full"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-24 right-6 z-20">
        <Button
          className="w-14 h-14 rounded-full shadow-lg border-0"
          style={{ backgroundColor: "#D4B896" }}
          onClick={() => {
            // Toggle post creation modal or scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="h-20 flex items-center justify-center gap-12 px-8" style={{ backgroundColor: "#8FA8B2" }}>
          <Button variant="ghost" size="sm" className="p-3">
            <Search className="w-6 h-6 text-white" />
          </Button>
          <Button variant="ghost" size="sm" className="p-3">
            <User className="w-6 h-6 text-white" />
          </Button>
          <Button variant="ghost" size="sm" className="p-3">
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>

      {/* Hidden post creation form */}
      <div className="hidden">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Share with the community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-20 resize-none rounded-2xl"
                />

                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Upload preview"
                      className="rounded-2xl max-w-full h-48 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 rounded-full"
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
                      className="gap-2 rounded-full bg-transparent"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4" />
                      Add Photo
                    </Button>
                  </div>
                  <Button
                    onClick={handleSubmitPost}
                    disabled={!newPost.trim()}
                    className="gap-2 rounded-full"
                    style={{ backgroundColor: "#D4B896" }}
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
