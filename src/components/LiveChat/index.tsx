import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { addMessage } from "@/lib/features/chatSlice";
import { generateName, getRandomMessage } from "@/utils/helper";
import { Send, Users, Zap } from "lucide-react";

export default function LiveChat() {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector((store) => store.chat.messages);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    dispatch(
      addMessage({
        name: "You",
        message: message.trim(),
      })
    );
    setMessage("");
  };

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateName(),
          message: getRandomMessage(20),
        })
      );
    }, 1500);
    return () => clearInterval(i);
  }, [dispatch]);

  return (
    <div className="ms-2 flex flex-col h-[500px] bg-white shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">Live Chat</h2>
              <p className="text-blue-100 text-sm flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {chatMessages.length} participants online
              </p>
            </div>
          </div>
          <div className="px-3 py-1 bg-white/10 rounded-full">
            <span className="text-white text-sm font-medium">LIVE</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        id="chat-container"
        className="h-[300px] overflow-y-auto px-4 py-4 custom-scrollbar"
      >
        <div className="flex flex-col-reverse gap-3 min-h-full">
          {chatMessages?.map((c, i) => (
            <ChatMessage key={i} name={c.name} message={c.message} />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 bg-white px-6 py-4">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              className="w-full pl-5 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Type your message..."
              maxLength={200}
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
