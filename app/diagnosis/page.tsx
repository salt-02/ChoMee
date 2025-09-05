"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"

const questions = [
  "インドア派？　アウトドア派？",
  "手を動かすのが好き？　頭を使うのが好き？",
  "想像するのが好き？　分析するのが好き？",
  "一人で仕事をするのが好き？　他人と一緒に仕事をするのが好き？",
  "あなたは暇な時間、遊びに行く？　リラックスする？",
  "計画的に行動したい？　感情のままに行動したい？",
  "新しいスキルに興味がある？　既存のスキルを磨くことに興味がある？",
  "競争的？　協力的？",
  "芸術的表現が好き？　技術的な問題解決が好き？",
  "短期間で活動するのが好き？　長期間で活動するのが好き？",
  "身体的に健康状態であることが好き？　挑戦していくのが好き？",
  "最新技術を使った方法が好き？　伝統的な方法が好き？",
  "グループ活動において、リーダーになる？　ならない？",
  "すぐに結果が出てほしい？　長期的に成長したい？",
  "他人を助けたい？　個人の目標を達成したい？",
  "日常が好き？　非日常が好き？",
  "映画が好き？　舞台が好き？",
  "正確性が必要な作業がしたい？　柔軟性が必要な作業がしたい？",
  "あなたが好きなコミュニティーは、ローカル？　グローバル？",
  "遠出が好き？　近場が好き？",
  "歴史が好き？　最新の出来事が好き？",
  "規則の中で活動したい？　制限なく活動したい？",
  "自然が好き？　都会が好き？",
  "収集が好き？　創作が好き？",
  "物理的な作品が好き？　デジタル作品が好き？",
  "平和な活動が好き？　刺激的な活動が好き？",
  "機能が好き？　見た目が好き？",
  "物語の分析が好き？　データの分析が好き？",
  "リラックスできる活動がすき？　挑戦的な活動が好き？",
  "音楽が好き？　写真が好き？",
  "他人と一緒に活動するのが好き？　一人で活動するのが好き？",
  "計画的に活動したい？　即興で活動したい？",
  "動いていたい？　静かにしていたい？",
  "社会に影響を与えたい？　自分だけの世界で生きていきたい？",
  "教えたい？　学びたい？",
  "競争的な活動が好き？　協力的な活動が好き？",
  "リスクを取る？　安全を取る？",
  "細かい作業が好き？　大胆な作業が好き？",
  "得たものを使うのが好き？　新しいものを得るのが好き？",
  "伝統文化に触れるのが好き？　新しい文化に触れるのが好き？",
]

const sliderLabels = [
  ["とても当てはまる", "当てはまる", "どちらでもない", "当てはまる", "とても当てはまる"],
  ["とても当てはまる", "当てはまる", "どちらでもない", "当てはまる", "とても当てはまる"],
  ["とても当てはまる", "当てはまる", "どちらでもない", "当てはまる", "とても当てはまる"],
  ["とても当てはまる", "当てはまる", "どちらでもない", "当てはまる", "とても当てはまる"],
  ["とても当てはまる", "当てはまる", "どちらでもない", "当てはまる", "とても当てはまる"],
]

export default function DiagnosisPage() {
  const [answers, setAnswers] = useState<number[]>(new Array(40).fill(2))
  const router = useRouter()

  const handleSliderChange = (questionIndex: number, value: number[]) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = value[0]
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    // Store answers in localStorage for the results page
    localStorage.setItem("hobbyDiagnosisAnswers", JSON.stringify(answers))
    router.push("/results")
  }

  const answeredQuestions = answers.filter((answer) => answer !== 2).length
  const progress = (answeredQuestions / questions.length) * 100

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-card-foreground text-center">趣味診断</CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {answeredQuestions} of {questions.length} 
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="space-y-4 pb-6 border-b border-border last:border-b-0">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {questionIndex + 1}
                    </span>
                    <h3 className="text-base font-medium text-card-foreground flex-1 pt-1">{question}</h3>
                  </div>

                  <div className="ml-11 space-y-3">
                    <Slider
                      value={[answers[questionIndex]]}
                      onValueChange={(value) => handleSliderChange(questionIndex, value)}
                      max={4}
                      min={0}
                      step={1}
                      className="w-full"
                    />

                    <div className="flex justify-between text-xs text-muted-foreground px-2">
                      {(sliderLabels[questionIndex % 5] || sliderLabels[0]).map((label, index) => (
                        <span key={index} className="text-center max-w-16">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button
                onClick={handleSubmit}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={answeredQuestions === 0}
              >
                診断結果を得る ({answeredQuestions}/{questions.length} answered)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
