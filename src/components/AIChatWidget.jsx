import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import contextData from "./contextPrompts.json";
import { supabase } from "../lib/supabaseClient";


const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    // ✅ Load saved conversation from localStorage
    const saved = localStorage.getItem("vybrant_chat_history");
    return saved
      ? JSON.parse(saved)
      : [{ sender: "ai", text: "👋 Hello! I'm Vybrant AI Assistant. How can I help you today?" }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [askedInfo, setAskedInfo] = useState(false);
  const [awaitingConsent, setAwaitingConsent] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const messagesEndRef = useRef(null);

  // ✅ Save messages to localStorage on change
  useEffect(() => {
    localStorage.setItem("vybrant_chat_history", JSON.stringify(messages));
  }, [messages]);

  // ✅ Auto-scroll to bottom
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleWhatsAppClick = () => {
    const phoneNumber = "447828402043";
    const text = encodeURIComponent("Hello! I’d like to ask about your services.");
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };
const saveLead = async ({ name, email, phone }) => {
  const { error } = await supabase.from("contact_messages").insert([
    {
      name,
      email,
      phone,
      message: "Submitted via AI assistant widget",
      source: "chat_widget",
      subscribe: true,
    },
  ]);

  if (error) return error;

  await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ name, email, phone }),
    }
  );

  return null;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const error = await saveLead(formData);

  if (error) {
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: "⚠️ Sorry, something went wrong saving your details." }
    ]);
    return;
  }

  setMessages((prev) => [
    ...prev,
    { sender: "ai", text: `✅ Thanks ${formData.name}! Your details have been saved.` }
  ]);

  setFormVisible(false);
  setFormData({ name: "", email: "", phone: "" });
};


  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // ✅ Handle consent for showing form
    if (awaitingConsent) {
      const text = input.toLowerCase();
      if (text.includes("yes") || text.includes("sure") || text.includes("ok") || text.includes("okay")) {
        setTimeout(() => {
          setFormVisible(true);
          setAwaitingConsent(false);
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: "Great! Please fill in your details below 👇" },
          ]);
        }, 600);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "No problem! We can continue without your contact details." },
        ]);
        setAwaitingConsent(false);
      }
      setLoading(false);
      return;
    }

    // ✅ Ask for Name/Email/Phone after first 2 exchanges
    const userMessagesCount = updatedMessages.filter((m) => m.sender === "user").length;
    if (userMessagesCount >= 2 && !askedInfo) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `Before we continue, may I please have your **name**, **email**, and **phone number** so our care team can assist you better?`,
          },
          { sender: "ai", text: `Would you like to provide that now? (Yes / No)` },
        ]);
        setAskedInfo(true);
        setAwaitingConsent(true);
      }, 1000);
    }

    // ✅ Detect request for human help
    if (
      input.toLowerCase().includes("chat with human") ||
      input.toLowerCase().includes("speak to someone")
    ) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "You can chat with one of our friendly human team members on WhatsApp below 👇",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const prompt = `${contextData.prompt}\n\n${updatedMessages
        .map((m) => `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`)
        .join("\n")}\nAssistant:`;

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      const payload = { contents: [{ parts: [{ text: prompt }] }] };

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const aiReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm here to assist you further!";
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Sorry, I’m having trouble connecting right now. Please try again later or use our WhatsApp contact below.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/`([^`]+)`/g, "<code class='bg-gray-200 px-1 rounded text-sm'>$1</code>")
      .replace(/\n/g, "<br>");

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-up {
          animation: fadeUp 0.4s ease-out;
        }
      `}</style>

      {!isOpen && (
        <button
          onClick={toggleChat}
          data-track="chat_widget_open"
          className="bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 animate-bounce transform hover:scale-105 transition-all"
        >
          <FaComments size={20} />
        </button>
      )}

      {isOpen && (
        <div className="fade-up w-80 md:w-96 h-[470px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-pink-600 text-white flex justify-between items-center px-4 py-3">
            <h3 className="font-bold text-lg">Vybrant AI Assistant</h3>
            <button 
              onClick={toggleChat} 
              data-track="chat_widget_close"
              className="text-2xl font-light hover:text-gray-100">
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-xl max-w-[80%] text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-pink-600 text-white"
                      : "bg-white border text-gray-800"
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
              </div>
            ))}
            {loading && <div className="italic text-gray-500 text-sm">Vybrant AI is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Contact Form (with fade-up animation) */}
          {formVisible && (
            <form
              onSubmit={handleFormSubmit}
              data-track="chat_contact_form_submit"
              className="fade-up bg-white border-t p-3 space-y-2 text-sm"
            >
            <p className="text-gray-700">Please provide your contact details:</p>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-2 border text-gray-300 rounded-md"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full p-2 border text-gray-300 rounded-md"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Your Phone Number"
                required
                className="w-full p-2 border text-gray-300 rounded-md"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <button
                type="submit"
                className="bg-pink-600 w-full text-white py-2 rounded-md hover:bg-pink-700"
              >
                Save Info
              </button>
            </form>
          )}

          {/* Input */}
          {!formVisible && (
            <form onSubmit={handleSend} className="flex p-3 border-t bg-white items-center">
              <input
                type="text"
                placeholder="Ask about care or services..."
                className="flex-1 p-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                data-track="chat_message_send"
                className="ml-2 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          )}

          {/* WhatsApp Button */}
          <div className="border-t bg-gray-50 flex justify-center items-center p-3">
            <button
              onClick={handleWhatsAppClick}
              data-track="chat_whatsapp_redirect"
              className="flex items-center space-x-2 text-green-600 font-semibold hover:text-green-700"
            >
              <FaWhatsapp size={22} />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
