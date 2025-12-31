export interface HistoryArticle {
  id: string
  url: string
  title?: string
  htmlContent?: string
  markdown?: string
  images?: Array<{
    originalUrl: string
    filename: string
    data: string
    mimeType: string
  }>
  savedAt: string
}

const HISTORY_KEY = "weixin-converter-history"
const MAX_HISTORY_ITEMS = 50

export function saveToHistory(article: HistoryArticle) {
  try {
    const history = getHistory()

    // Check if article already exists (by URL)
    const existingIndex = history.findIndex((item) => item.url === article.url)

    if (existingIndex >= 0) {
      // Update existing item
      history[existingIndex] = { ...article, savedAt: new Date().toISOString() }
    } else {
      // Add new item at the beginning
      history.unshift({ ...article, savedAt: new Date().toISOString() })

      // Keep only the latest MAX_HISTORY_ITEMS
      if (history.length > MAX_HISTORY_ITEMS) {
        history.pop()
      }
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch (error) {
    console.error("Failed to save to history:", error)
  }
}

export function getHistory(): HistoryArticle[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    if (!stored) return []

    return JSON.parse(stored)
  } catch (error) {
    console.error("Failed to load history:", error)
    return []
  }
}

export function removeFromHistory(id: string) {
  try {
    const history = getHistory().filter((item) => item.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch (error) {
    console.error("Failed to remove from history:", error)
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.error("Failed to clear history:", error)
  }
}
