
import { GoogleGenAI } from "@google/genai";

// Inicialización estricta siguiendo las guías
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analiza un objeto de entrenamiento o un resumen de sesión para dar consejos tácticos.
 */
export const getWorkoutSuggestions = async (workoutSummary: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres el Analista Táctico de IRONFORGE. Analiza este entrenamiento reciente y da 3 consejos cortos, directos y motivadores para mejorar en la próxima sesión. No uses introducciones largas. Datos del entreno: ${workoutSummary}. Responde en español.`
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "¡Manten la intensidad! No he podido procesar los datos, pero tu esfuerzo es lo que cuenta.";
  }
};

/**
 * Análisis profundo de una sesión específica (usado en el detalle de entrenamiento).
 */
export const analyzeWorkoutPaste = async (workoutText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analiza detalladamente este entrenamiento: "${workoutText}". Evalúa la selección de ejercicios, el volumen de series y la gestión de intensidad (RIR). Sugiere optimizaciones basadas en ciencia del deporte 2025. Sé crítico pero motivador (estilo IRONFORGE). Responde en Markdown.`
    });
    return response.text;
  } catch (error) {
    return "Error en la transmisión de datos tácticos. Sigue entrenando duro.";
  }
};
