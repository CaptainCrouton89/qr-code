"use client"

import * as React from "react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

const presetColors = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
  "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#800000",
  "#000080", "#808080", "#C0C0C0", "#FF69B4", "#32CD32", "#87CEEB",
  "#FFD700", "#DC143C", "#4169E1", "#FF1493", "#00CED1", "#FF4500",
  "#8B4513", "#2E8B57", "#B22222", "#191970", "#556B2F", "#8B0000"
]

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !color && "text-muted-foreground",
            className
          )}
        >
          <div
            className="h-4 w-4 rounded border mr-2"
            style={{ backgroundColor: color }}
          />
          {color || "Pick a color"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Pick a Color</h4>
            <p className="text-sm text-muted-foreground">
              Choose from presets or use the color picker below.
            </p>
          </div>
          
          {/* Preset Colors */}
          <div className="grid grid-cols-10 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className={cn(
                  "h-6 w-6 rounded border-2 hover:scale-110 transition-transform",
                  color === presetColor ? "border-gray-800 dark:border-gray-200" : "border-gray-300"
                )}
                style={{ backgroundColor: presetColor }}
                onClick={() => onChange(presetColor)}
              />
            ))}
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <HexColorPicker color={color} onChange={onChange} />
            
            {/* Hex Input */}
            <div className="flex items-center space-x-2">
              <label htmlFor="hex-input" className="text-sm font-medium">
                Hex:
              </label>
              <HexColorInput
                id="hex-input"
                color={color}
                onChange={onChange}
                prefixed
                alpha={false}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 font-mono"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}