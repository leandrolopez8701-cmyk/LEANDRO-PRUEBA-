import { GoogleGenAI } from "@google/genai";
import { Category, FactData, GroundingSource } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateFact = async (category: Category): Promise<FactData> => {
  try {
    const prompt = category === Category.RANDOM
      ? "Genera un dato curioso, sorprendente y poco común. Debe ser verificable y educativo. Responde solo con el dato en Español. Máximo 2 oraciones."
      : `Genera un dato curioso e interesante específicamente sobre el tema: ${category}. Debe ser verificable. Responde solo con el dato en Español. Máximo 2 oraciones.`;

    // Use the 2.5 flash model for speed and grounding capabilities
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        tools: [{ googleSearch: {} }], // Enable Google Search Grounding
      },
    });

    const text = response.text || "No se pudo generar un dato en este momento.";
    
    // Extract grounding sources if available
    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || new URL(chunk.web.uri).hostname
          });
        }
      });
    }

    return {
      text,
      sources,
      category,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error("Error fetching fact:", error);
    throw new Error("Hubo un problema al conectar con Gemini. Por favor intenta de nuevo.");
  }
};