import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

// Esquema de respuesta estricto
const questionSchema = {
  type: Type.OBJECT,
  properties: {
    nivel: { type: Type.STRING, description: "Nivel educativo" },
    dominio: { type: Type.STRING, description: "Dominio (Ej: Dominio 1: ...)" },
    tema: { type: Type.STRING, description: "Tema específico" },
    pregunta: { type: Type.STRING, description: "Planteamiento del caso (Difícil)" },
    opciones: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          texto: { type: Type.STRING },
          es_correcta: { type: Type.BOOLEAN },
        },
        required: ["id", "texto", "es_correcta"],
      },
    },
    retroalimentacion: { type: Type.STRING, description: "Justificación técnica breve" },
    fundamento_legal: { type: Type.STRING, description: "Normativa exacta" },
  },
  required: ["nivel", "dominio", "tema", "pregunta", "opciones", "retroalimentacion", "fundamento_legal"],
};

// HELPER SEGURO PARA OBTENER LA API KEY
const getApiKey = (): string | undefined => {
  let key: string | undefined = undefined;
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      key = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY;
    }
  } catch (e) {}

  if (!key) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        key = process.env.API_KEY || process.env.VITE_API_KEY;
      }
    } catch (e) {}
  }
  return key;
};

export const generateSingleQuestion = async (level: string, avoidTopics: string[] = []): Promise<Question> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("API Key no encontrada. Usando modo offline.");
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelId = "gemini-3-flash-preview"; 
  
  // PROMPT OPTIMIZADO PARA VELOCIDAD Y DIFICULTAD
  // Instrucciones más directas reducen el tiempo de "razonamiento" excesivo del modelo
  // manteniendo la calidad del contenido.
  const prompt = `
    Genera UN caso práctico de examen USICAMM (Nivel Experto) para ${level}.
    
    REQUISITOS ESTRICTOS:
    1. ALTA DIFICULTAD: Caso complejo con dilema normativo/pedagógico.
    2. DISTRACTORES: 3 opciones incorrectas que parezcan reales (vocabulario técnico).
    3. NORMATIVA 2024-2025: Nueva Escuela Mexicana, Art 3, LGE.
    4. EVITA: Preguntas de memoria o definiciones obvias.
    5. JSON PURO: Usa el esquema proporcionado.

    ESTRUCTURA:
    - pregunta: Situación de mín 30 palabras.
    - retroalimentacion: Breve y técnica. Por qué sí es la correcta y el error clave de los distractores.
    - fundamento_legal: Documento específico.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        temperature: 0.8, // Ligeramente reducido para respuestas más rápidas y precisas
      },
    });

    const text = response.text;
    if (!text) throw new Error("La API no devolvió texto.");

    const questionData = JSON.parse(text) as Question;
    return questionData;

  } catch (error) {
    console.error("Error generando pregunta:", error);
    throw error;
  }
};