import { useState, useEffect, useRef } from "react";
import user from "~/configs/user";

const SYSTEM_PROMPT = `
System Role: You are the "Ujjwal Bajpai AI," a highly intelligent, professional, and personalized digital twin of Ujjwal Bajpai. Your goal is to answer questions about Ujjwal’s background, skills, and projects with accuracy and a touch of his technical wit.

Core Identity & Education: * Name: Ujjwal Bajpai. * Current Status: Bachelor of Engineering in Electronics & Communication Engineering at RV College of Engineering, Bengaluru (Expected 2027). * Academic Standing: Current CGPA of 8.52/10.0. * Historical Excellence: Scored 97.4% in 10th and 91.8% in 12th from DAV Public School, Paradip.

Identification: USN 1RV23EC175.

Technical Expertise: * Languages: C++, C, Python, JavaScript, SQL, HTML5, CSS3. * Web Stack: React.js, Node.js, Express.js, MongoDB, RESTful APIs, Tailwind CSS. * CS Fundamentals: Data Structures & Algorithms (DSA), OOPs, DBMS, Operating Systems, System Design, and Machine Learning. * Tools: Git, GitHub, Postman, VS Code, Chrome DevTools.

Professional Experience: * IT Intern at IFFCO (Jul 2025 – Sep 2025): Developed a secure HRMS portal for 500+ employees, improving data accessibility by 40%. Worked on IT-OT integration and data visualization modules. * Technical Member at RVCE ACM Student Chapter: Lead workshops on full-stack development and DSA for 200+ students, increasing engagement by 35%.

Key Projects: * CodRev: An AI-powered code review platform using Gemini API for real-time bug detection and quality ratings. * FlowGuard AI: A smart traffic management system using ML for route optimization with 85% accuracy. * DocuMind: A document organization web app focused on JSON-based workflows and high performance.

VLSI/Hardware: Actively working on a 1-bit combinational ALU and a battery management system using STM32 Nucleo.

Achievements: * Hackathons: 2nd Runner-Up at BITS Pilani API Hackathon 2025. * Competitive Programming: 425+ problems solved on LeetCode (Top 10% globally). * Exams: AIR 913 (98.9 percentile) in COMEDK UGET 2023. * Scholarships: Awarded 1.7 Lakhs merit-based scholarship from IFFCO.

Instructions for the Model:

Use "I" when speaking as Ujjwal if the user asks "Who are you?" or "What are your skills?"
`;

export default function ChatGPT() {
  const [messages, setMessages] = useState<any[]>([
    {
      role: "model",
      parts: [
        {
          text: "Hi! I'm Ujjwal's AI assistant. Ask me anything about his work, skills, or projects."
        }
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", parts: [{ text: input }] };

    // Optimistic update
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key not configured.");
      }

      // Prepend system prompt context wrapper
      const historyPayload = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\nUser: Hello" }] },
        { role: "model", parts: [{ text: "Hello! I am ready." }] },
        ...messages.map((m) => ({ role: m.role, parts: [{ text: m.parts[0].text }] })),
        userMsg
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: historyPayload })
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure how to respond to that.";
      setMessages((prev) => [...prev, { role: "model", parts: [{ text: reply }] }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: `Error: ${error.message}` }] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#343541] text-gray-100 font-sans text-sm overflow-hidden">
      {/* Header */}
      <div className="h-10 flex items-center justify-center border-b border-white/10 bg-[#343541] shrink-0 text-gray-400 text-xs shadow-sm z-10">
        Model: Gemini 2.5 Flash
      </div>

      {/* Chat Area - Flex Grow with specific overflow handling */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide scroll-smooth"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "model" && (
              <div className="size-8 rounded p-1 bg-white flex items-center justify-center shrink-0">
                <img
                  src="img/icons/chatgpt.png"
                  alt="ChatGPT"
                  className="size-full object-contain"
                />
              </div>
            )}
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-[#444654] text-gray-100 rounded-bl-sm"
              }`}
            >
              {msg.parts[0].text}
            </div>
            {msg.role === "user" && (
              <div className="size-8 rounded-full overflow-hidden shrink-0 border border-white/20">
                <img src={user.avatar} alt="User" className="size-full object-cover" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-4 justify-start animate-pulse">
            <div className="size-8 rounded p-1 bg-white flex items-center justify-center shrink-0">
              <img
                src="img/icons/chatgpt.png"
                alt="ChatGPT"
                className="size-full object-contain"
              />
            </div>
            <div className="text-gray-400 self-center">Thinking...</div>
          </div>
        )}
      </div>

      {/* Input Area - Fixed height shrink-0 */}
      <div className="p-4 bg-[#343541] border-t border-white/10 shrink-0">
        <div className="relative flex items-center w-full bg-[#40414F] rounded-xl shadow-lg border border-white/10 focus-within:border-gray-500 transition-colors">
          <input
            type="text"
            className="flex-1 bg-transparent text-white p-3 pl-4 pr-10 outline-none w-full placeholder-gray-400"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="absolute right-2 p-1.5 rounded-lg hover:bg-black/20 text-gray-400 hover:text-white disabled:opacity-40 transition"
          >
            <div className="i-fa-solid:paper-plane text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
