'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col flex-1 items-start justify-start w-full max-w-7xl h-auto mx-auto p-4 md:py-8">
      {messages.map((m) => (
        <div
          key={m.id}
          className="flex items-start justify-start w-full h-auto p-4 mb-2 bg-zinc-100 border border-zinc-200 rounded-lg"
        >
          {(() => {
            switch (m.role) {
              case 'user':
                return (
                  <img
                    src="https://img.freepik.com/free-vector/vibrant-summer-ombre-background-vector_53876-105765.jpg"
                    alt="User"
                    className="size-8 mr-4 rounded-full"
                  />
                );
              case 'assistant':
                return (
                  <img
                    src="https://thbot.vercel.app/techbot-logo.png"
                    alt="Bot"
                    className="size-8 p-1 mr-4"
                  />
                );
            }
          })()}

          <p className="mt-1">{m.content}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center w-full h-auto">
        <label
          htmlFor="say"
          className="group flex items-center w-full h-auto min-h-10 pl-4 pr-0 bg-zinc-100 border border-zinc-200 rounded-lg focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-500 divide-x divide-zinc-200 overflow-hidden aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:select-none aria-[disabled=true]:opacity-50"
          aria-disabled="false"
        >
          <input
            type="text"
            name="say"
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
            className="w-full h-full bg-transparent focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none"
          />
        </label>
      </form>
    </div>
  );
}
