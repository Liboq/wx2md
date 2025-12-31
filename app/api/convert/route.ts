import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"
import TurndownService from "turndown"

interface ImageData {
  originalUrl: string
  filename: string
  data: string
  mimeType: string
}

async function downloadImage(url: string): Promise<ImageData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Referer: "https://mp.weixin.qq.com/",
      },
    })

    if (!response.ok) return null

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString("base64")

    const contentType = response.headers.get("content-type") || "image/jpeg"
    const extension = contentType.split("/")[1] || "jpg"

    // Generate filename from URL or use hash
    const urlParts = url.split("/")
    const filename = `image_${Date.now()}_${Math.random().toString(36).substring(7)}.${extension}`

    return {
      originalUrl: url,
      filename,
      data: base64,
      mimeType: contentType,
    }
  } catch (error) {
    console.error("[v0] Failed to download image:", url, error)
    return null
  }
}

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
    const contentHtml = $("#js_content").html() || ""

    const $content = cheerio.load(contentHtml)

    const imageUrls: string[] = []
    $content("img").each((_, img) => {
      const $img = $content(img)
      const dataSrc = $img.attr("data-src")
      const src = $img.attr("src")
      const imageUrl = dataSrc || src

      if (imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("//"))) {
        const fullUrl = imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl
        imageUrls.push(fullUrl)
      }
    })

    // Download all images
    const imagePromises = imageUrls.map((url) => downloadImage(url))
    const imageResults = await Promise.all(imagePromises)
    const images: ImageData[] = imageResults.filter((img): img is ImageData => img !== null)

    // Create URL to filename mapping
    const imageMap = new Map<string, string>()
    images.forEach((img) => {
      imageMap.set(img.originalUrl, img.filename)
    })

    // Replace image URLs with relative paths in HTML
    $content("img").each((_, img) => {
      const $img = $content(img)
      const dataSrc = $img.attr("data-src")
      const src = $img.attr("src")
      const imageUrl = dataSrc || src

      if (imageUrl) {
        const fullUrl = imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl
        const filename = imageMap.get(fullUrl)
        if (filename) {
          $img.attr("src", `./images/${filename}`)
          $img.removeAttr("data-src")
        }
      }
    })

    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    })

    const markdown = turndownService.turndown($content.html())

    return NextResponse.json({
      title,
      markdown,
      images,
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "转换失败，请检查URL是否正确" },
      { status: 500 },
    )
  }
}
