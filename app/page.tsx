"use client";

import { useState, useEffect } from "react";
import { sendLangflowMessage } from "./actions";
import ReactMarkdown from "react-markdown";
//import { v4 as uuidv4 } from "uuid"; // npm install uuid && npm install --save-dev @types/uuid

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("conto-termico-test");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    const aiResponse = await sendLangflowMessage(userMessage, sessionId);

    setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="w-full h-full items-center justify-center">
      <div className="flex flex-col h-screen mx-auto w-full lg:max-w-[80%] p-4 bg-gray-50 ">
        <header className="py-4 border-b flex justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold">Conto Termico ChatBot</h1>
            <p className="text-xs text-gray-500">Session: {sessionId}</p>
          </div>
          <div className="bg-[url('/smart.jpg')] bg-cover bg-center w-30 h-18" />
        </header>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto scrollbar-gutter-stable py-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      ul: ({ node, ...props }) => (
                        <ul className="ml-6 list-disc space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="ml-6 list-decimal space-y-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="ml-2" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-2" {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-gray-400 text-sm animate-pulse">
              L'IA sta pensando...
            </div>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="flex gap-2 p-4 bg-white border-t"
        >
          <input
            className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digita il tuo messaggio..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400 cursor-pointer hover:bg-blue-700 transition"
          >
            Invia
          </button>
        </form>
      </div>
    </div>
  );
}
