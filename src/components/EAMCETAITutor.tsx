import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, X, MessageSquare, Bot, HelpCircle, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
}

export default function EAMCETAITutor() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hi there engineering aspirant! 🌟 I am your EAMCET AI Tutor doubt-solver. You can ask me to explain any Mathematics, Physics, or Chemistry concept or break down EAMCET formulas step-by-step!"
    }
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const rawText = textToSend || input;
    if (!rawText.trim() || isLoading) return;

    const userMsg: Message = {
      id: "user_" + Date.now(),
      role: "user",
      text: rawText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/gemini/eamcet-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }

      const data = await res.json();
      const botMsg: Message = {
        id: "bot_" + Date.now(),
        role: "model",
        text: data.text || "Sorry, I am having trouble understanding that. Please ask again!"
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          role: "model",
          text: "I couldn't contact my server-side Gemini system. Please ensure your backend is running perfectly and you have provided the GEMINI_API_KEY."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const chips = [
    "Steps for Cramer's Rule",
    "Derivation of Escape Velocity",
    "De Broglie Wavelength"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="w-80 sm:w-96 h-[500px] bg-[#0c0c16] border border-white/10 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-950 via-indigo-950 to-neutral-900 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">EAMCET AI Doubts Tutor</h4>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-semibold">Active & Online</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-full border border-white/5 text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((m) => {
                const isModel = m.role === "model";
                return (
                  <div
                    key={m.id}
                    className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed font-light ${
                        isModel
                          ? "bg-white/[0.02] border border-white/5 text-gray-200"
                          : "bg-indigo-600 text-white font-medium"
                      } whitespace-pre-wrap`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl px-4 py-3 text-gray-400 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    <span>Gemini is calculating explanation...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggest chips */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="text-[10px] font-mono bg-white/5 hover:bg-indigo-600/20 text-gray-400 hover:text-indigo-300 border border-white/5 hover:border-indigo-500/20 px-2.5 py-1 rounded-full cursor-pointer transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/5 bg-neutral-950 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask doubt: e.g. What is Joule-Thomson effect?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 focus:border-indigo-500 focus:outline-none rounded-xl px-3 text-xs text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white rounded-xl transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            layoutId="ai-tutor-bubble"
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 hover:from-blue-500 hover:to-purple-400 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 cursor-pointer hover:scale-105 active:scale-95 transition-all relative border border-white/10 group"
          >
            {/* Soft pulse effect */}
            <span className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping opacity-60 group-hover:opacity-80" />
            <Sparkles className="w-5 h-5 text-white animate-pulse relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
