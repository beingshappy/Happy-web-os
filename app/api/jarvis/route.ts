import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 })
    }

    const { text } = await generateText({
      // You can switch to Grok as: model: "xai/grok-4-fast"
      model: "openai/gpt-5-mini",
      prompt,
    })

    return NextResponse.json({ text })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "AI error" }, { status: 500 })
  }
}
