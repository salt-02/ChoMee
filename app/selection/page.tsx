import Link from "next/link"
import { Search, Users } from "lucide-react"

export default function SelectionPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #D4B896 0%, #F5F1E8 50%, #8FA8B2 100%)",
      }}
    >
      <div className="absolute inset-0">
        {/* Top flowing shape */}
        <div
          className="absolute top-0 left-0 w-full h-64"
          style={{
            background: "#F5F1E8",
            clipPath: "polygon(0 0, 100% 0, 100% 60%, 80% 80%, 60% 70%, 40% 85%, 20% 75%, 0 90%)",
          }}
        />

        {/* Bottom flowing shape */}
        <div
          className="absolute bottom-0 left-0 w-full h-48"
          style={{
            background: "#8FA8B2",
            clipPath: "polygon(0 100%, 100% 100%, 100% 40%, 80% 20%, 60% 30%, 40% 15%, 20% 25%, 0 10%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-[#5B9BD5] mb-2">ChoMee</h1>
        </div>

        <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
          <Link href="/diagnosis" className="block w-full">
            <div
              className="relative w-full h-32 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              style={{
                background: "#E6D7B8",
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div className="text-center">
                <div className="text-xl font-semibold text-[#5B9BD5] mb-2">趣味診断</div>
                <Search className="w-6 h-6 text-[#5B9BD5] mx-auto" />
              </div>
            </div>
          </Link>

          <Link href="/community-selection" className="block w-full">
            <div
              className="relative w-full h-32 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              style={{
                background: "#E6D7B8",
                borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div className="text-center">
                <div className="text-xl font-semibold text-[#5B9BD5] mb-2">コミュニティに入る</div>
                <Users className="w-6 h-6 text-[#5B9BD5] mx-auto" />
              </div>
            </div>
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
