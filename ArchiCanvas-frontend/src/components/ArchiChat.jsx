// File: src/components/ArchiChat.jsx

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

// Access your API key from the .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Gemini AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const ArchiChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState(null);

    // This function initializes the chat with the system prompt
    const initializeChat = () => {
        const systemPrompt = `
            You are "Archi," an expert and friendly guide for the ArchiCanvas digital art platform. Your knowledge is strictly limited to ArchiCanvas, its features, and the traditional Indian art it promotes.
            Your rules are:
            1. Only answer questions about ArchiCanvas features (like artist registration, communities, watermarking, AI tools), traditional Indian art (like Madhubani and Warli), and how to use the platform.
            2. If you are asked about anything else (e.g., the weather, politics, programming, general knowledge), you must politely decline and guide the user back to the topic of ArchiCanvas.
            3. Be helpful, concise, and encouraging to artists and buyers.
        `;
        
        const newChat = model.startChat({
            history: [{ role: 'user', parts: [{ text: systemPrompt }] }, { role: 'model', parts: [{ text: 'Hello! I am Archi, your guide to the ArchiCanvas platform. How can I help you explore the world of traditional art today?' }] }],
            generationConfig: { maxOutputTokens: 1000 },
        });

        setMessages([{ role: 'model', text: 'Hello! I am Archi, your guide to the ArchiCanvas platform. How can I help you explore the world of traditional art today?' }]);
        return newChat;
    };
    
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const currentChat = chat || initializeChat();
        if (!chat) setChat(currentChat);

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setInput('');

        try {
            const result = await currentChat.sendMessageStream(input);
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                modelResponse += chunkText;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Gemini API Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I seem to be having some trouble right now. Please try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-lg border border-base-300 dark:border-slate-700 overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
            <div className="p-4 border-b dark:border-slate-700">
                <h2 className="text-xl font-bold text-center text-slate-800 dark:text-white">Chat with Archi</h2>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                        >
                            {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white"><Bot size={20}/></div>}
                            <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'}`}>
                                <div className="flex items-center gap-2">
                                    {msg.role === 'user' && <MessageCircle className="w-4 h-4 mr-1 text-white" />}
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                </div>
                            </div>
                            {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center text-white"><User size={20}/></div>}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && <div className="flex justify-start"><span className="loading loading-dots loading-md text-slate-500"></span></div>}
                {isLoading && (
                    <div className="flex justify-end items-center gap-2 mt-2">
                        <MessageCircle className="w-5 h-5 animate-spin text-blue-500" />
                        <span className="text-blue-500">Sending...</span>
                    </div>
                )}
            </div>

           <form onSubmit={sendMessage} className="p-4 border-t dark:border-slate-700 flex items-center gap-2">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Ask about ArchiCanvas..."
    className="input input-bordered w-full"
    disabled={isLoading}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        sendMessage(e);
      }
    }}
  />

  <button
    type="submit"
    className="btn btn-primary btn-square flex items-center justify-center"
    disabled={isLoading || input.trim() === ''}
  >
    <motion.div
      animate={{ rotate: isLoading ? 360 : 0 }}
      transition={{ repeat: isLoading ? Infinity : 0, duration: 1, ease: 'linear' }}
    >
      <Send size={20} />
    </motion.div>
  </button>
</form>

        </div>
    );
};

export default ArchiChat;