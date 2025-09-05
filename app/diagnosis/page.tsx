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
  "Are you more drawn to visual arts or performing arts?",
  "Do you prefer activities that require precision or those that allow flexibility?",
  "Are you more interested in local community or global connections?",
  "Do you like activities that involve travel or staying close to home?",
  "Are you more interested in history and tradition or innovation and trends?",
  "Do you prefer activities with clear rules or open-ended exploration?",
  "Are you more drawn to nature or urban environments?",
  "Do you like activities that involve collecting or creating?",
  "Are you more interested in physical crafts or digital creation?",
  "Do you prefer activities that are quiet and peaceful or energetic and exciting?",
  "Are you more interested in understanding how things work or how to make them beautiful?",
  "Do you like activities that involve storytelling or data analysis?",
  "Are you more drawn to activities that help you relax or challenge you?",
  "Do you prefer activities that involve music or visual elements?",
  "Are you more interested in activities that connect you with others or provide solitude?",
  "Do you like activities that involve planning or improvisation?",
  "Are you more drawn to activities that involve movement or stillness?",
  "Do you prefer activities that have a social impact or personal fulfillment?",
  "Are you more interested in activities that involve teaching or learning?",
  "Do you like activities that involve competition or cooperation?",
  "Are you more drawn to activities that involve risk-taking or safety?",
  "Do you prefer activities that involve detailed work or big-picture thinking?",
  "Are you more interested in activities that involve self-expression or skill mastery?",
  "Do you like activities that connect you with your cultural heritage or explore new cultures?",
]

const sliderLabels = [
  ["Strongly Indoor", "Indoor", "Neutral", "Outdoor", "Strongly Outdoor"],
  ["Hands", "Mostly Hands", "Both", "Mostly Mind", "Mind"],
  ["Very Creative", "Creative", "Balanced", "Analytical", "Very Analytical"],
  ["Alone", "Mostly Alone", "Either", "With Others", "Large Groups"],
  ["Very Active", "Active", "Moderate", "Relaxed", "Very Relaxed"],
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
            <CardTitle className="text-2xl text-card-foreground text-center">Hobby Diagnosis</CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {answeredQuestions} of {questions.length} questions answered
                </span>
                <span>{Math.round(progress)}% Complete</span>
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
                Get Results ({answeredQuestions}/{questions.length} answered)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
