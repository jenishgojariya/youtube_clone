import React from "react";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  name: string;
  message: string;
  isUser?: boolean;
}

export default function ChatMessage({
  name,
  message,
  isUser,
}: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-gradient-to-r from-blue-500 to-purple-500"
            : "bg-gradient-to-r from-gray-400 to-gray-500"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      <div className={`max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`text-xs font-medium mb-1 ${
            isUser ? "text-right text-blue-600" : "text-gray-600"
          }`}
        >
          {name}
        </div>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          } shadow-sm`}
        >
          {message}
        </div>
        <div
          className={`text-xs text-gray-400 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
