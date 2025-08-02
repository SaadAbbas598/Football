import React from "react";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={`flex ${message.isUser ? "justify-end" : "justify-start"} px-2`}>
      <div
        className={`flex items-start gap-2 w-full max-w-3xl ${
          message.isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-gray-500 mt-1">
          {message.isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        <div className="flex flex-col space-y-1 w-full">
          <div
            className={`inline-block px-4 py-3 rounded-2xl border border-white/20 break-words whitespace-pre-wrap ${
              message.isUser
                ? "bg-gradient-to-r from-gray-500/80 to-purple-500/80 text-white self-end"
                : "bg-white/10 text-white self-start"
            }`}
            style={{ maxWidth: "90%" }}
          >
            <p className="text-base">{message.text}</p>
          </div>
          <div
            className={`text-xs text-gray-400 ${
              message.isUser ? "text-right self-end" : "text-left self-start"
            }`}
          >
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;