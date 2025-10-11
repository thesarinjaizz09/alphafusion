'use client';
import { useState, ReactNode } from "react";

interface WindowLayoutProps {
    title: string;
    icon?: React.ElementType; // ✅ any Lucide or custom icon component
    children: ReactNode;
    height?: string; // optional height prop
    fit?: boolean; // if true, height fits content
}

export default function WindowLayout({ title, icon: Icon, children, height = '400px', fit = false }: WindowLayoutProps) {
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    if (!isVisible) {
        return null; // hidden if closed
    }

    return (
        <div
            className={`col-span-2 bg-[#0A0F1C] border border-gray-800 rounded-2xl w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden ${isMinimized ? "h-fit p-2 opacity-90" : "p-3 scale-100 opacity-100"}`}
            style={{
                maxHeight: !isMinimized && !fit ? height : undefined,
                height: !isMinimized && fit ? 'auto' : undefined,
                overflow: !isMinimized ? 'auto' : undefined,
            }}
        >



            {/* Top-right Mac-style buttons */}
            <div className={`flex ${isMinimized ? "justify-between" : "justify-between"} items-center ${isMinimized ? "mb-0" : "mb-3"} ${!isMinimized ? "border-b pb-2 border-accent" : "border-none pb-0"}`}>
                {/* Component name when minimized */}
                <div className="text-accent flex items-center gap-2">
                    {Icon && <Icon className="w-4 inline" />}
                    <span className="text-accent font-semibold">{title}</span>
                </div>
                <div className="flex gap-2">
                    {/* Minimize */}
                    <button
                        className="cursor-pointer w-2 h-2 rounded-full bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => setIsMinimized(!isMinimized)}
                    />
                    <button
                        className="cursor-pointer w-2 h-2 rounded-full bg-green-500 hover:bg-green-600"
                        onClick={() => setIsMinimized(!isMinimized)}
                    />
                    <button
                        className="cursor-pointer w-2 h-2 rounded-full bg-red-500 hover:bg-red-600"
                        onClick={() => setIsVisible(false)}
                    />
                </div>
            </div>

            {/* Content hidden when minimized */}
            {!isMinimized && children}
        </div>
    );
}