"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export interface FireflyCardConfig {
  temp: string
  subTempId?: string
  imgScale: number
  form: {
    title?: string
    content?: string
    author?: string
  }
  style?: {
    width?: number
    height?: number
    padding?: number
    color?: string[]
  }
}

interface FireflyCardConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  markdownContent: string
  articleTitle?: string
  onExport: (config: FireflyCardConfig) => Promise<void>
}

const TEMPLATE_OPTIONS = [
  { value: "tempA", label: "默认模板 A" },
  { value: "tempC", label: "默认模板 C" },
  { value: "tempJin", label: "金句模板" },
  { value: "tempB", label: "书摘模板" },
  { value: "tempEasy", label: "便当模板" },
  { value: "tempMemo", label: "备忘录模板" },
  { value: "tempBlackSun", label: "黑日模板" },
  { value: "tempE", label: "框界模板" },
]

export function FireflyCardConfigDialog({
  open,
  onOpenChange,
  markdownContent,
  articleTitle,
  onExport,
}: FireflyCardConfigDialogProps) {
  const { toast } = useToast()
  const [config, setConfig] = useState<FireflyCardConfig>({
    temp: "tempA",
    imgScale: 2,
    form: {
      title: articleTitle || "",
      content: markdownContent, // 使用完整内容
      author: "",
    },
    style: {
      width: 800,
      height: 1200,
      padding: 40,
    },
  })
  const [isExporting, setIsExporting] = useState(false)

  // 当弹窗打开时，初始化配置
  useEffect(() => {
    if (open) {
      setConfig({
        temp: "tempA",
        imgScale: 2,
        form: {
          title: articleTitle || "",
          content: markdownContent,
          author: "",
        },
        style: {
          width: 800,
          height: 1200,
          padding: 40,
        },
      })
    }
  }, [open, markdownContent, articleTitle])

  const handleExport = async () => {
    if (!config.form.content || config.form.content.trim().length === 0) {
      toast({
        title: "错误",
        description: "内容不能为空",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    try {
      await onExport(config)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "导出失败",
        description: error instanceof Error ? error.message : "生成图片时出错",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">流光卡片配置</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            配置流光卡片参数，将 Markdown 内容转换为精美图片
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 模板选择 */}
          <div className="space-y-2">
            <Label htmlFor="temp" className="text-sm font-medium text-foreground">
              模板类型
            </Label>
            <Select
              value={config.temp}
              onValueChange={(value) => setConfig({ ...config, temp: value })}
            >
              <SelectTrigger id="temp" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 表单信息 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">表单信息</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                标题
              </Label>
              <Input
                id="title"
                value={config.form.title || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    form: { ...config.form, title: e.target.value },
                  })
                }
                placeholder="输入标题"
                className="border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium text-foreground">
                内容
              </Label>
              <textarea
                id="content"
                value={config.form.content || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    form: { ...config.form, content: e.target.value },
                  })
                }
                placeholder="输入内容（Markdown 格式）"
                className="min-h-[120px] w-full rounded-md border border-border/50 bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                当前长度: {config.form.content?.length || 0} 字符
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium text-foreground">
                作者（可选）
              </Label>
              <Input
                id="author"
                value={config.form.author || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    form: { ...config.form, author: e.target.value },
                  })
                }
                placeholder="输入作者名称"
                className="border-border/50"
              />
            </div>
          </div>

          {/* 样式配置 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">样式配置</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width" className="text-sm font-medium text-foreground">
                  宽度 (px)
                </Label>
                <Input
                  id="width"
                  type="number"
                  value={config.style?.width || 800}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      style: {
                        ...config.style,
                        width: parseInt(e.target.value) || 800,
                      },
                    })
                  }
                  className="border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium text-foreground">
                  高度 (px)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={config.style?.height || 1200}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      style: {
                        ...config.style,
                        height: parseInt(e.target.value) || 1200,
                      },
                    })
                  }
                  className="border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="padding" className="text-sm font-medium text-foreground">
                  内边距 (px)
                </Label>
                <Input
                  id="padding"
                  type="number"
                  value={config.style?.padding || 40}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      style: {
                        ...config.style,
                        padding: parseInt(e.target.value) || 40,
                      },
                    })
                  }
                  className="border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imgScale" className="text-sm font-medium text-foreground">
                图像分辨率/清晰度
              </Label>
              <Select
                value={config.imgScale.toString()}
                onValueChange={(value) =>
                  setConfig({ ...config, imgScale: parseInt(value) })
                }
              >
                <SelectTrigger id="imgScale" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x (标准)</SelectItem>
                  <SelectItem value="2">2x (高清，推荐)</SelectItem>
                  <SelectItem value="3">3x (超高清)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
            className="w-full sm:w-auto border-border/50"
          >
            取消
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <ImageIcon className="h-4 w-4 mr-2" />
                导出图片
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

