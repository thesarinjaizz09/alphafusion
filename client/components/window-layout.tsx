'use client';

import { Info } from "lucide-react";
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

const classes =
    "bg-[#0A0F1C]/95 border border-accent/30 text-gray-200 rounded-md p-2 text-[10px] shadow-lg min-w-[100px] max-w-[180px] whitespace-pre-wrap";

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
}: WindowLayoutProps) {
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isMaximized, setIsMaximized] = useState<boolean>(false);

    const desc =
        description ||
        `The "${title}" component provides information or functionality related to ${title.toLowerCase()}.`;

    if (!isVisible) return null;

    return (
        <TooltipProvider>
            <div
                className={`col-span-2 bg-[#0A0F1C] border border-gray-800 rounded-sm w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden
          ${isMinimized ? "h-fit p-2 opacity-90" : "p-2 pt-0 scale-100 opacity-100"}
          ${full ? "h-full w-full" : ""}
          ${className}`}
                style={{
                    // Priority order: full → maximized → normal/fitted
                    height: full
                        ? '100%'
                        : isMaximized
                            ? '100%'
                            : !isMinimized && !fit
                                ? height
                                : !isMinimized && fit
                                    ? 'auto'
                                    : undefined,
                    maxHeight:
                        !isMinimized && !fit && max && !isMaximized && !full
                            ? height
                            : undefined,
                    overflow: !isMinimized ? 'auto' : undefined,
                }}
            >
                {/* Header - now sticky */}
                <div
                    className={`flex justify-between items-center sticky top-0 z-20 bg-[#0A0F1C]/95 backdrop-blur-md
                        ${isMinimized ? "mb-0" : "mb-3"}
                        ${!isMinimized ? "border-b py-2 border-accent" : "border-none pb-0"}
                    `}
                >
                    <div className="text-accent flex items-center gap-2">
                        {Icon && <Icon className="w-4 inline" />}
                        <span className="text-accent font-semibold">{title}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        {/* Action Buttons with Tooltips */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="cursor-pointer w-2 h-2 rounded-full bg-yellow-500 hover:bg-yellow-600"
                                    onClick={() => setIsMinimized(!isMinimized)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                {isMinimized ? "Restore" : "Minimize"}
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="cursor-pointer w-2 h-2 rounded-full bg-green-500 hover:bg-green-600"
                                    onClick={() => setIsMaximized(!isMaximized)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                {isMaximized ? "Restore" : "Maximize"}
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="cursor-pointer w-2 h-2 rounded-full bg-red-500 hover:bg-red-600"
                                    onClick={() => setIsVisible(false)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>Close</TooltipContent>
                        </Tooltip>

                        {/* Info Tooltip + Dialog */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info
                                    className="w-3 h-3 cursor-pointer text-gray-400 hover:text-accent transition"
                                    onClick={() => setIsDialogOpen(true)}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className={classes}>
                                {desc}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {/* Scrollable Content */}
                {!isMinimized && (
                    <div className="pt-2">
                        {children}
                    </div>
                )}

                {/* Info Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md bg-[#0A0F1C] border border-gray-800 text-gray-100">
                        <DialogHeader>
                            <DialogTitle className="text-accent text-sm">{title}</DialogTitle>
                            <DialogDescription className="text-xs mt-2 text-gray-300">
                                {desc}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    );
}
