"use-client";

import { useChat } from "@ai-sdk/react";
import { Button } from "./ui/button";

function AIAgentChat({ videoId }: { videoId: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    body: {
      videoId,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">AI Agent Chat</h2>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium  text-gray-700">
                  Welcome to AI Agent Chat
                </h3>
                <p className="text-sm text-gray-500">
                  Ask Any Question About Your Video!
                </p>
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id}>
              <p>{m.content}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Input Form */}
      <div className="border-t p-4 bg-white border-gray-100">
        <div className="-space-y-3">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Enter your question here."
              value={input}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600  transition-colors disabled:opacity-50 disbaled:cursor-not-allowed"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AIAgentChat;
