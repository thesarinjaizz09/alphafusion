"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea as ShadTextarea } from "@/components/ui/textarea";
import { Notebook, Tag, Trash2 } from "lucide-react";
import WindowLayout from "./window-layout";

interface Note {
    id: number;
    text: string;
    tag?: string;
    time: string;
}

export default function UserNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<string>("");
    const [tag, setTag] = useState<string>("");

    // Load from localStorage once on mount
    useEffect(() => {
        const stored = localStorage.getItem("analystNotes");
        if (stored) setNotes(JSON.parse(stored));
    }, []);

    // Save to localStorage when notes change
    useEffect(() => {
        localStorage.setItem("analystNotes", JSON.stringify(notes));
    }, [notes]);

    const addNote = (): void => {
        if (!note.trim()) return;
        const newNote: Note = {
            id: Date.now(),
            text: note.trim(),
            tag: tag.trim(),
            time: new Date().toLocaleString("en-IN", { hour12: true }),
        };
        setNotes((prev) => [newNote, ...prev]);
        setNote("");
        setTag("");
    };

    const deleteNote = (id: number): void => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <WindowLayout title="Analyst Notes" icon={Notebook} max={true} height="515px">

            <textarea
                placeholder="Write your observation, trade idea, or quick note..."
                value={note}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-slate-200 rounded-sm resize-none placeholder:text-slate-500 text-[10px] p-2 focus:outline-none focus:ring-0"
            />

            <div className="flex gap-1">
                <input
                    type="text"
                    placeholder="#Tag (optional)"
                    value={tag}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTag(e.target.value)}
                    className="w-full bg-white/5 text-slate-300 rounded-sm placeholder:text-slate-500 text-[10px] p-2 border border-white/10 focus:outline-none focus:ring-0"
                />

                <button
                    onClick={addNote}
                    className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700 cursor-pointer"
                >
                    Save
                </button>
            </div>

            {/* Notes List */}
            <div className="flex flex-col h-88 mt-4">
                <div className="flex-grow overflow-y-auto bg-[#16223B]/80 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-2 py-3 rounded-sm h-full">
                    {notes.length === 0 ? (
                        <p className="flex items-center justify-center text-[10px] w-full h-full text-slate-500 text-center">
                            No notes yet. Start jotting your thoughts 💡
                        </p>
                    ) : (
                        notes.map((n) => (
                            <div key={n.id} className="p-3 bg-white/5 border border-white/10 rounded-sm flex justify-between items-start group hover:bg-white/10 transition-all duration-300">
                                <div className="flex flex-col">
                                    <p className="text-slate-200 text-[10px] whitespace-pre-wrap leading-snug">
                                        {n.text}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-500">
                                        {n.tag && (
                                            <span className="flex items-center gap-1 text-cyan-400">
                                                <Tag size={8} /> {n.tag}
                                            </span>
                                        )}
                                        <span>{n.time}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteNote(n.id)}
                                    className="opacity-0 group-hover:opacity-100 transition text-slate-500 hover:text-red-500"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>



        </WindowLayout>
    );
}
