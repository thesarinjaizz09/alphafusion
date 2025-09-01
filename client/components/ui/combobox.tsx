"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const tickers = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
]

const timeframes = [
    { value: "1M", label: "1M" },
    { value: "5M", label: "5M" },
    { value: "15M", label: "15M" },
    { value: "30M", label: "30M" },
    { value: "1H", label: "1H" },
    { value: "1D", label: "1D" },
]

const exchanges = [
    { value: "nasdaq", label: "NASDAQ" },
    { value: "nyse", label: "NYSE" },
    { value: "amex", label: "AMEX" },
    { value: "nse", label: "NSE" },
    { value: "bse", label: "BSE" },
]

interface ComboboxProps {
    mode: "ticker" | "timeframe" | "exchange"
}

export function Combobox({ mode }: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const items =
        mode === "ticker" ? tickers : mode === "timeframe" ? timeframes : exchanges

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "justify-between h-[36px] text-black text-xs",
                        mode === "ticker" && "w-full",
                    )}
                    style={mode === 'exchange' ? {
                        width: "49%"
                    } : mode === 'timeframe' ? {
                        width: '49%'
                    } : {}}
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : mode === "ticker"
                            ? "Ticker"
                            : mode === "timeframe"
                                ? "Timeframe"
                                : "Exchange"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
