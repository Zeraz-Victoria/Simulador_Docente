import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

// Esquema de respuesta estricto
const questionSchema = {
  type: Type.OBJECT,
  properties: {
    nivel: { type: Type.STRING, description: "Nivel educativo (Primaria, Secundaria, etc.)" },
    dominio: { type: Type.STRING, description: "Dominio del perfil docente (Ej: Dominio 1: Una maestra que...)" },
    tema: { type: Type.STRING, description: "Tema específico de la pregunta (Ej: Inclusión, Ley General de Educación)" },
    pregunta: { type: Type.STRING, description: "El planteamiento del caso o pregunta" },
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
    retroalimentacion: { type: Type.STRING, description: "Explicación detallada de la respuesta correcta" },
    fundamento_legal: { type: Type.STRING, description: "Referencia legal o normativa exacta" },
  },
  required: ["nivel", "dominio", "tema", "pregunta", "opciones", "retroalimentacion", "fundamento_legal"],
};

export const generateSingleQuestion = async (level: string): Promise<Question> => {
  // CORRECCIÓN CRÍTICA:
  // Inicializamos la IA DENTRO de la función.
  // Si lo hacemos afuera, y la API KEY falta o 'process' no existe al cargar la página,
  // la app se rompe completamente (pantalla blanca/cargando) antes de iniciar React.
  
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key no configurada. Usando modo offline.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelId = "gemini-3-flash-preview"; 
  
  const prompt = `
    Actúa como un experto evaluador del Servicio Profesional Docente en México (USICAMM).
    Genera UNA sola pregunta de examen de opción múltiple, difícil y basada en casos prácticos.
    
    Contexto:
    - Nivel educativo: ${level}
    - Normatividad: Art 3 Constitucional, Ley General de Educación, Nueva Escuela Mexicana (NEM).
    - Formato: Caso práctico donde el docente debe tomar una decisión.
    
    Requisitos:
    - 4 Opciones (A, B, C, D).
    - Solo una correcta.
    - Retroalimentación pedagógica sólida.
    - Fundamento legal explícito.
    - El campo 'dominio' debe comenzar con 'Dominio 1', 'Dominio 2', 'Dominio 3' o 'Dominio 4'.
    - RESPUESTA OBLIGATORIA EN JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("La API respondió pero no devolvió texto.");

    const questionData = JSON.parse(text) as Question;
    return questionData;

  } catch (error) {
    console.error("Error detallado generando pregunta con Gemini:", error);
    throw error;
  }
};