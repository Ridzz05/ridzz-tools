'use client'

import { Select, SelectItem } from "@nextui-org/react"

const models = [
  { value: "gpt-4o-mini", label: "GPT-4 Mini" },
  { value: "gpt-4-turbo-2024-04-09", label: "GPT-4 Turbo (04/09)" },
  { value: "gpt-4o-2024-08-06", label: "GPT-4 2024 (08/06)" },
  { value: "grok-2", label: "Grok-2" },
  { value: "grok-2-mini", label: "Grok-2 Mini" },
  { value: "grok-beta", label: "Grok Beta" },
  { value: "claude-3-opus-20240229", label: "Claude-3 Opus (02/29)" },
  { value: "claude-3-sonnet-20240229", label: "Claude-3 Sonnet (02/29)" },
  { value: "claude-3-5-sonnet-20240620", label: "Claude-3.5 Sonnet (06/20)" },
  { value: "claude-3-5-sonnet-20241022", label: "Claude-3.5 Sonnet (10/22)" },
  { value: "gemini-1.5-flash-exp-0827", label: "Gemini 1.5 (08/27)" }
]

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const selectedLabel = models.find(model => model.value === selectedModel)?.label || ''

  return (
    <Select
      label="Model"
      selectedKeys={[selectedModel]}
      onChange={(e) => onModelChange(e.target.value)}
      className="max-w-[250px]"
      size="sm"
      variant="flat"
      classNames={{
        trigger: [
          "bg-default-100",
          "dark:bg-default-50",
          "hover:bg-default-200",
          "dark:hover:bg-default-100",
          "shadow-[2px_2px_0px_rgba(0,0,0,0.15)]",
          "transition-all",
          "duration-200",
          "data-[open=true]:shadow-none",
          "data-[open=true]:translate-x-[2px]",
          "data-[open=true]:translate-y-[2px]",
          "!cursor-pointer",
          "border-0",
          "h-unit-10",
          "min-h-unit-10",
          "px-3"
        ],
        value: [
          "text-foreground",
          "pr-0",
          "text-sm"
        ],
        label: [
          "text-foreground",
          "text-sm"
        ],
        innerWrapper: "border-0",
        base: "border-0",
        mainWrapper: "h-unit-10",
        popover: [
          "bg-default-100",
          "dark:bg-default-50",
          "shadow-[2px_2px_0px_rgba(0,0,0,0.15)]",
          "w-[250px]"
        ],
        listbox: [
          "p-0",
          "gap-0"
        ],
        listboxWrapper: "p-0",
        selectorIcon: "text-foreground"
      }}
      renderValue={() => (
        <div className="flex items-center gap-2">
          <span className="text-sm truncate">{selectedLabel}</span>
        </div>
      )}
    >
      {models.map((model) => (
        <SelectItem 
          key={model.value} 
          value={model.value}
          className="text-foreground data-[selected=true]:bg-default-200 dark:data-[selected=true]:bg-default-100 text-sm"
        >
          {model.label}
        </SelectItem>
      ))}
    </Select>
  )
} 