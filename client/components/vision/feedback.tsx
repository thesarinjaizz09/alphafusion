'use client'

import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquareCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeedbackCard() {
    const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);

    return (
        <div className="col-span-5 bg-white border border-gray-200 shadow-lg rounded-sm px-2 py-3 flex flex-col">
            <div className="inline-block">
                <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                    <MessageSquareCode className="w-4 mr-2" /> Feedback
                </h3>
            </div>
            <p className="text-xs text-gray-600 mt-2">
                Share your feedback on this forecast to assist us in enhancing and developing this application.
            </p>

            {/* Textarea grows to fill remaining height */}
            <textarea
                name="feedback"
                id="feedback"
                className="border w-full mt-4 rounded-md flex-1 resize-none p-2 text-sm"
                placeholder="Write your feedback here..."
            ></textarea>

            {/* Footer actions */}
            <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-2">
                    {/* Like Button */}
                    <button
                        onClick={() => setReaction(reaction === "like" ? null : "like")}
                        className={`p-2 rounded-md transition-colors ${reaction === "like"
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-200 text-gray-700"
                            }`}
                    >
                        <ThumbsUp className="h-4 w-4" />
                    </button>

                    {/* Dislike Button */}
                    <button
                        onClick={() =>
                            setReaction(reaction === "dislike" ? null : "dislike")
                        }
                        className={`p-2 rounded-md transition-colors ${reaction === "dislike"
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-gray-200 text-gray-700"
                            }`}
                    >
                        <ThumbsDown className="h-4 w-4" />
                    </button>
                </div>

                <Button variant="secondary" className="cursor-pointer text-xs">
                    Submit
                </Button>
            </div>
        </div>
    );
}
