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


interface ComboboxProps {
    mode: string,
    items: { value: string; label: string }[],
    span: "half" | "full" | 'third' | 'oneth'
}

export function Combobox({ mode, items, span }: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "bg-[#16223B]/80 shadow-lg text-accent justify-between h-[34px] font-normal text-[9px] rounded-sm transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 overflow-hidden text-ellipsis",
                        span === "full" && "w-full",
                    )}
                    style={span === 'half' ? {
                        width: "49%"
                    } : span === 'third' ? {
                        width: '65%'
                    } : span === 'oneth' ? {
                        width: '33%'
                    } : {}}
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : mode}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 min-w-[var(--radix-popover-trigger-width)] w-fit">
                <Command>
                    <CommandInput placeholder="Search..." className="h-9 text-[9px]" />
                    <CommandList>
                        <CommandEmpty><span className="text-[9px]">
                            No results found.
                        </span>
                        </CommandEmpty>
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
