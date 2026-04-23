"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
// icons
import CheckIcon from "./icons/CheckIcon";
import CopyIcon from "./icons/CopyIcon";

const ChatMessage = ({ msg, i }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(msg.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      key={i}
      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className="relative group max-w-[80%]">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute -top-2 right-0 p-1 cursor-pointer rounded bg-gray-200 
                     opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200 hover:bg-gray-300"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-600" />
          ) : (
            <CopyIcon className="w-4 h-4 text-gray-700" />
          )}
        </button>

        {/* Bubble */}
        <div
          className={`p-3 rounded-lg ${
            msg.role === "user"
              ? "bg-blue-600 text-white"
              : "bg-white border text-gray-800"
          }`}
        >
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                ul: (props) => (
                  <ul className="ml-6 list-disc space-y-1" {...props} />
                ),
                ol: (props) => (
                  <ol className="ml-6 list-decimal space-y-2" {...props} />
                ),
                li: (props) => <li className="ml-2" {...props} />,
                p: (props) => <p className="mb-2" {...props} />,
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
