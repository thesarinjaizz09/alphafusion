'use client';

import { CircleEllipsis, Maximize2, Info, Cog, Trash2, HelpCircle, Mail, SquaresExclude, Sheet, Braces, Bot } from "lucide-react";
import { useState, ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const classes =
    "bg-[#0A0F1C]/95 border border-accent/30 text-gray-200 rounded-md p-2 text-[10px] shadow-lg min-w-[50px] max-w-[180px] whitespace-pre-wrap";

interface WindowLayoutProps {
    title: string;
    icon?: React.ElementType;
    children: ReactNode;
    height?: string;
    fit?: boolean;
    className?: string;
    max?: boolean;
    description?: string;
    full?: boolean;
    maximizedChildren?: ReactNode; // optional second layout
}

export default function WindowLayout({
    title,
    icon: Icon,
    children,
    height = '390px',
    fit = false,
    className = '',
    max = false,
    description,
    full = false,
    maximizedChildren,
}: WindowLayoutProps) {
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);

    const desc =
        description ||
        `The "${title}" component provides information or functionality related to ${title.toLowerCase()}.`;

    if (!isVisible) return null;

    // 🧱 Default maximized layout (used if none is provided)
    const defaultMaximizedLayout = (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-300 p-6">
            <Maximize2 className="w-10 h-10 text-accent mb-3" />
            <h2 className="text-accent text-sm font-semibold mb-2">
                {title} — Maximized View
            </h2>
            <p className="text-xs text-gray-400 max-w-md">
                This is the expanded workspace for <span className="text-accent">{title}</span>.
                You can place additional charts, analytics, or detailed content here.
            </p>
        </div>
    );

    return (
        <TooltipProvider>
            <div
                className={`col-span-2 bg-[#0A0F1C] border border-gray-800 rounded-sm w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden
          ${isMinimized ? "h-fit p-2 opacity-90" : "p-2 pt-0 scale-100 opacity-100"}
          ${full ? "h-full w-full" : ""}
          ${className}`}
                style={{
                    height: full
                        ? '100%'
                        : !isMinimized && !fit
                            ? height
                            : !isMinimized && fit
                                ? 'auto'
                                : undefined,
                    maxHeight:
                        !isMinimized && !fit && max && !full
                            ? height
                            : undefined,
                    overflow: !isMinimized ? 'auto' : undefined,
                }}
            >
                {/* Header - Sticky */}
                <div
                    className={`flex justify-between items-center sticky top-0 z-20 bg-[#0A0F1C]/95 backdrop-blur-md
                        ${isMinimized ? "mb-0" : "mb-3"}
                        ${!isMinimized ? "border-b py-2 border-accent" : "border-none pb-0"}
                    `}
                >
                    <div className="text-accent flex items-center justify-center gap-2 text-[9px] pt-1">
                        {Icon && <Icon className="w-3 h-3 inline" />}
                        <span className="text-accent font-semibold">{title}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        {/* Minimize */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="cursor-pointer w-2 h-2 rounded-full bg-yellow-500 hover:bg-yellow-600"
                                    onClick={() => setIsMinimized(!isMinimized)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                {isMinimized ? "Restore" : "Minimize"} Widget
                            </TooltipContent>
                        </Tooltip>

                        {/* Maximize */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="cursor-pointer w-2 h-2 rounded-full bg-green-500 hover:bg-green-600"
                                    onClick={() => setIsDialogOpen(true)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                Maximize Widget
                            </TooltipContent>
                        </Tooltip>

                        {/* Close */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="cursor-pointer w-2 h-2 rounded-full bg-red-500 hover:bg-red-600"
                                    onClick={() => setIsVisible(false)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                Close Widget
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Bot
                                    className="w-3 h-3 cursor-pointer text-gray-400 hover:text-accent transition"
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                Tradeshark Context
                            </TooltipContent>
                        </Tooltip>

                        {/* Info */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info
                                    className="w-3 h-3 cursor-pointer text-gray-400 hover:text-accent transition"
                                    onClick={() => setIsInfoDialogOpen(true)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                {desc}
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenu>
                            {/* Tooltip wraps around Dropdown trigger */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <CircleEllipsis
                                            className="w-3 h-3 cursor-pointer text-gray-400 hover:text-accent transition"
                                        />
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className={classes}>
                                    Click for more widget actions!
                                </TooltipContent>
                            </Tooltip>

                            {/* Dropdown menu itself */}
                            <DropdownMenuContent
                                side="bottom"
                                align="end"
                                className="text-[9px] w-40 bg-[#0A0F1C] text-gray-200 border-gray-700"
                            >
                                <DropdownMenuLabel className="text-[10px] text-accent">Widget Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem
                                    className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                                // onClick={onSettings}
                                >
                                    <Mail className="w-3 h-3 text-blue-400" />
                                    Subscribe
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                                // onClick={onHelp}
                                >
                                    <Sheet className="w-3 h-3 text-blue-400" />
                                    Link Sheets
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                                // onClick={onHelp}
                                >
                                    <SquaresExclude className="w-3 h-3 text-blue-400" />
                                    Export CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 hover:bg-primary cursor-pointer"
                                // onClick={onHelp}
                                >
                                    <Braces className="w-3 h-3 text-blue-400" />
                                    Export JSON
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Scrollable Content */}
                {!isMinimized && (
                    <div className="pt-2">
                        {children}
                    </div>
                )}

                {/* Info Dialog */}
                <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
                    <DialogContent className="sm:max-w-md bg-[#0A0F1C] border border-gray-800 text-gray-100">
                        <DialogHeader>
                            <DialogTitle className="text-accent text-sm">{title}</DialogTitle>
                            <DialogDescription className="text-xs mt-2 text-gray-300">
                                {desc}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Maximized Layout Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent
                        className="max-w-[95vw] max-h-[90vh] bg-[#0A0F1C] border border-accent/30 text-gray-100 overflow-y-auto"
                    >
                        <DialogHeader className="h-fit border-b border-accent/30 pb-5">
                            <DialogTitle className="text-accent text-sm">
                                {title} — Maximized View
                            </DialogTitle>
                            <DialogDescription className="text-xs text-gray-400">
                                Expanded workspace view for {title}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-3 h-[100%] w-[100%] overflow-y-auto">
                            {maximizedChildren || defaultMaximizedLayout}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    );
}
