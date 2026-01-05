
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getExplanation(topic: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain the concept of '${topic}' in the context of full-stack authentication (Node/Express/React/MongoDB). Keep it concise, professional, and educational for a junior developer. Use markdown.`,
      });
      return response.text || "No explanation available.";
    } catch (error) {
      return "Unable to fetch explanation. Please ensure your API_KEY is valid.";
    }
  }
}

export const geminiService = new GeminiService();
