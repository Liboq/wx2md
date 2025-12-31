import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || !url.includes("mp.weixin.qq.com")) {
      return NextResponse.json({ error: "请提供有效的微信公众号文章链接" }, { status: 400 })
    }

    // Fetch the article HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch article")
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const title = $("#activity-name").text().trim()
    const htmlContent = $("#js_content").html() || ""

    return NextResponse.json({
      title,
      htmlContent,
      success: true,
    })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "获取失败，请检查URL是否正确" },
      { status: 500 },
    )
  }
}
