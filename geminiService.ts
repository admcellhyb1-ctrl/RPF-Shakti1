import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const improveDescription = async (text: string): Promise<string> => {
  const client = getClient();
  if (!client) return text;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Rewrite the following complaint description to be more professional, clear, and actionable for official RPF records. Keep the facts, remove emotion, and make it concise. Input: "${text}"`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("AI Error:", error);
    return text;
  }
};

export const askSafetyBot = async (query: string): Promise<string> => {
  const client = getClient();
  if (!client) return "AI service is currently unavailable. Please check your network or API key.";

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an AI assistant for 'RPF Shakti', a women's safety app for the Railway Protection Force. 
      Answer the user's question regarding safety protocols, RPF guidelines, or legal rights for women in India. 
      Keep it brief (under 100 words) and supportive.
      Question: "${query}"`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("AI Error:", error);
    return "I am having trouble connecting right now. Please try again later.";
  }
};