import React from "react";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      } px-2 sm:px-4 py-2 animate-fade-in`}
    >
      <div
        className={`flex items-start gap-2 sm:gap-3 w-full max-w-full ${
          message.isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
            message.isUser
              ? "bg-gradient-to-r from-gray-500 to-purple-600"
              : "bg-gradient-to-r from-blue-500 to-cyan-400"
          }`}
        >
          {message.isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message bubble and timestamp */}
        <div className="flex flex-col space-y-1 w-full max-w-[90%] sm:max-w-[80%]">
          <div
            className={`rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/20 break-words whitespace-pre-wrap ${
              message.isUser
                ? "bg-gradient-to-r from-gray-500/80 to-purple-500/80 text-white self-end"
                : "bg-white/20 text-white self-start"
            } transition-all duration-300 hover:transform hover:scale-[1.02]`}
          >
            <p className="text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">
              {message.text}
            </p>
          </div>

          <div
            className={`text-[10px] sm:text-xs text-white/60 px-1 sm:px-2 ${
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
