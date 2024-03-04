'use client';

import { useChat } from 'ai/react';
import { useRef } from 'react';

import { Icon } from '@/components/icon';
import useAutosizeTextArea from '@/hooks/useAutosizeTextArea';

export default function Chat() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleSendMessage,
  } = useChat();

  const textArea = textAreaRef ? textAreaRef.current : null;

  useAutosizeTextArea(textArea, input);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (!formRef || (formRef && !formRef.current) || !formRef.current) return;

      formRef.current.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 items-start justify-start gap-2 w-full max-w-lg h-screen max-h-screen mx-auto p-4 md:py-8 overflow-hidden">
      <header className="flex flex-col items-center justify-center w-full h-auto mb-4">
        <h1 className="text-4xl font-bold text-zinc-900 -mb-1">Notify</h1>
        <p className="mt-2 text-zinc-600">NoteX&apos;s AI Chatbot</p>
      </header>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col items-center justify-start w-full min-h-full h-full gap-4 overflow-hidden"
      >
        <section
          className={`flex flex-1 flex-col items-center ${
            messages && messages.length > 0 ? 'justify-start' : 'justify-center'
          } w-full min-h-full h-full gap-6 sm:bg-zinc-100 max-sm:border-transparent sm:border border-zinc-200 rounded-lg sm:p-2 transition-all duration-300 ease-in-out overflow-y-auto`}
        >
          {messages && messages.length > 0 ? (
            messages.map((m) => (
              <div
                key={m.id}
                className="flex items-start justify-start w-full h-auto"
              >
                {(() => {
                  switch (m.role) {
                    case 'user':
                      return (
                        <img
                          src="https://github.com/gelzinn.png"
                          alt="User"
                          className="size-8 mr-3 rounded-full"
                        />
                      );
                    case 'assistant':
                      return (
                        <img
                          src="https://static.thenounproject.com/png/1913797-200.png"
                          alt="Bot"
                          className="size-8 p-1 mr-3"
                        />
                      );
                  }
                })()}

                <div className="flex flex-col items-start justify-start w-full">
                  <span
                    className="
                      text-xs font-bold text-zinc-600 -mb-1"
                  >
                    {m.role === 'user' ? 'You' : 'Notify'}
                  </span>

                  <p className="flex flex-col items-start justify-start w-full h-auto mt-1">
                    {m.content.split('\n').map((c, i) => (
                      <span key={i} className="first-of-type:mt-0 mt-2">
                        {c}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full min-h-32 h-auto text-center px-4 py-8">
              <img
                src="https://static.thenounproject.com/png/1913797-200.png"
                alt="Bot"
                className="w-16 h-16 pointer-events-none select-none"
              />

              <span className="w-full max-w-52 mt-4 text-sm text-zinc-600 text-pretty">
                Start a conversation by saying something...
              </span>
            </div>
          )}
        </section>

        <section className="flex items-center justify-center gap-2 w-full min-h-10 h-auto mt-auto transition-all duration-300 ease-in-out bg-zinc-100 border border-zinc-200 rounded-lg pl-4 pr-2 py-1.5">
          <label
            htmlFor="say"
            className="group flex items-center w-full h-auto min-h-10 overflow-hidden"
          >
            <textarea
              ref={textAreaRef}
              name="say"
              placeholder="Say something..."
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full min-h-6 h-auto max-h-32 bg-transparent focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none group-aria-[disabled=true]:opacity-50 resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={!input}
            className="flex items-center justify-center w-10 h-10 text-zinc-500 focus:outline-none rounded-lg hover:bg-zinc-200/65 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Icon name="Send" className="w-4 h-4" />
          </button>
        </section>
      </form>
    </div>
  );
}
