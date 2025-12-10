import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, Screenplay, CaptionResult, Scene } from "../types";

const getAiClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API Key not found in environment");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// --- Schemas ---

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    detected_genre: { type: Type.STRING },
    content_type: { type: Type.STRING },
    language_detected: { type: Type.STRING },
    scenes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          scene_id: { type: Type.INTEGER },
          scene_title: { type: Type.STRING },
          scene_text: { type: Type.STRING },
          scene_type: { type: Type.STRING },
          characters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                role: { type: Type.STRING },
                gender: { type: Type.STRING },
                key_action: { type: Type.STRING }
              }
            }
          },
          mood: { type: Type.STRING },
          estimated_duration_seconds: { type: Type.INTEGER },
          hook_line: { type: Type.STRING },
          reason: { type: Type.STRING }
        },
        required: ["scene_id", "scene_title", "scene_text", "scene_type", "characters", "mood", "estimated_duration_seconds", "hook_line"]
      }
    }
  },
  required: ["detected_genre", "content_type", "scenes"]
};

const screenplaySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    duration: { type: Type.STRING },
    genre: { type: Type.STRING },
    style: { type: Type.STRING },
    audio_language: { type: Type.STRING },
    subtitle_language: { type: Type.STRING },
    shots: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          shot_number: { type: Type.INTEGER },
          duration: { type: Type.STRING },
          visual: { type: Type.STRING },
          camera: { type: Type.STRING },
          character: { type: Type.STRING },
          action: { type: Type.STRING },
          dialogue: { type: Type.STRING, nullable: true },
          music_mood: { type: Type.STRING },
        },
        required: ["shot_number", "duration", "visual", "camera", "character", "action", "music_mood"]
      }
    },
    caption: { type: Type.STRING },
    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["title", "duration", "shots", "caption", "hashtags", "genre", "style", "audio_language"]
};

// --- Functions ---

export const analyzeContent = async (content: string, type: 'text' | 'image'): Promise<AnalysisResult> => {
  const ai = getAiClient();
  
  let parts: any[] = [];
  if (type === 'image') {
    // Content is base64 string
    parts = [
      { inlineData: { mimeType: 'image/jpeg', data: content } },
      { text: "Analyze this image (book page, manga panel, etc). Extract text and convertible scenes." }
    ];
  } else {
    parts = [{ text: `Analyze this text content and extract convertible scenes.\n\nCONTENT:\n${content}` }];
  }

  const prompt = `
    You are a content analyzer for BooksToReel.
    1. Identify the genre (Romance, Action, Manga, Horror, etc.)
    2. Extract ALL convertible scenes suitable for a 30-60s video reel.
    3. For images/manga, describe visual actions clearly.
  `;
  
  // Prepend instruction
  if(parts[0].text) {
      parts[0].text = prompt + "\n" + parts[0].text;
  } else {
      parts.push({text: prompt});
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Vision capable
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from Gemini");
    return JSON.parse(jsonText) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const generateScreenplay = async (
  scene: Scene,
  config: {
    style: string,
    leadActor: string,
    leadActress: string,
    supporting: string,
    audioLanguage: string,
    subtitleLanguage: string,
    musicMood: string,
    duration: string
  }
): Promise<Screenplay> => {
  const ai = getAiClient();

  const prompt = `
    You are a director creating a ${config.duration} Reel.
    
    INPUT:
    - Scene: ${JSON.stringify(scene)}
    - Style: ${config.style}
    - Leads: ${config.leadActor}, ${config.leadActress}
    - Audio Lang: ${config.audioLanguage}
    - Subtitle Lang: ${config.subtitleLanguage}
    - Music: ${config.musicMood}

    Construct a shot-by-shot breakdown.
    If Audio Lang is different from English, translate dialogue.
    If Subtitle Lang is 'None', do not include subtitles implication in visuals, but the app handles it.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: screenplaySchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from Gemini");
    return JSON.parse(jsonText) as Screenplay;
  } catch (error) {
    console.error("Gemini Screenplay Error:", error);
    throw error;
  }
};

export const generateSingleFramePrompt = async (shot: any, style: string): Promise<string> => {
    // Mock helper for regeneration
    return `Cinematic ${style}, ${shot.visual}, 9:16 aspect ratio`;
}