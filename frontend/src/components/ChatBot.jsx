import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Bot } from "lucide-react"; // Keep Bot icon for branding
import ChatMessage from "./Chat";
import VoiceRecorder from "./Voice";
import TextareaAutosize from "react-textarea-autosize";
import { IoIosSend } from "react-icons/io"; // <-- new send icon

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      text: "Hey there! 👋 Ask me anything — I'm your Fantasy Football AI 🤖",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      const data = await res.json();

      const botMessage = {
        id: crypto.randomUUID(),
        text: data?.answer || "Hmm... I couldn't find an answer 🧐",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "Oops! Something went wrong 🥲",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleVoiceInput = (transcript) => {
    setInputText(transcript);
    handleSendMessage(transcript);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleSendMessage(inputText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-blue-400" />
          <div>
            <h2 className="text-lg font-semibold">Fantasy Football</h2>
            <p className="text-xs text-gray-400">Powered by AI</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-400" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg p-3 max-w-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="px-4 py-3 bg-black">
        <div className="max-w-4xl mx-auto w-full flex items-end gap-2">
          <TextareaAutosize
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about players, trades, rankings, or injuries..."
            className="flex-grow resize-none text-base min-h-[2.75rem] max-h-40 border text-white placeholder:text-gray-400 rounded-lg py-3 px-4 focus:outline-none"
            minRows={1}
            maxRows={6}
            disabled={isLoading}
          />

          <VoiceRecorder
            onVoiceInput={handleVoiceInput}
            isListening={isListening}
            setIsListening={setIsListening}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 disabled:opacity-50 text-white"
            aria-label="Send message"
          >
            <IoIosSend className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
