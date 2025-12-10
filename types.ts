export type ScreenType = 'home' | 'input' | 'scene_selection' | 'customize' | 'generating' | 'preview' | 'editor' | 'post' | 'feed';

export type InputMethod = 'text' | 'image' | 'pdf' | 'url';

export type GenreType = 'Romance' | 'Action' | 'Horror' | 'Comedy' | 'Thriller' | 'Fantasy' | 'Manga' | 'Drama' | 'Sci-Fi';

export type StyleType = 'K-Drama' | 'Bollywood' | 'Hollywood' | 'Anime' | 'Manga' | 'Realistic' | 'Vintage' | 'Cinematic';

export interface Actor {
  id: string;
  name: string;
  image?: string;
}

export interface ActorCategory {
  male: Actor[];
  female: Actor[];
}

export interface ActorDatabase {
  [key: string]: ActorCategory;
}

export interface LanguageOption {
  code: string;
  name: string;
}

export interface MusicMoodOption {
  id: string;
  name: string;
  tags: string[];
}

export interface Scene {
  scene_id: number;
  scene_title: string;
  scene_text: string;
  scene_type: string;
  characters: {
    name: string;
    role: string;
    gender: string;
    key_action: string;
  }[];
  mood: string;
  estimated_duration_seconds: number;
  hook_line: string;
  reason?: string; // Why AI recommended it
}

export interface AnalysisResult {
  detected_genre: string;
  content_type: string;
  language_detected: string;
  scenes: Scene[];
}

export interface Shot {
  shot_number: number;
  duration: string;
  visual: string;
  camera: string;
  character: string;
  action: string;
  dialogue: string | null;
  music_mood: string;
  video_prompt?: string;
}

export interface Screenplay {
  title: string;
  duration: string;
  shots: Shot[];
  caption: string;
  hashtags: string[];
  genre: string;
  style: string;
  audio_language: string;
  subtitle_language: string;
}

export interface GeneratedReel {
  id: string;
  timestamp: number;
  screenplay: Screenplay;
  views: number;
}

export interface CaptionResult {
  caption_options: string[];
  hashtags: {
    primary: string[];
    trending: string[];
    niche: string[];
  };
  call_to_action: string;
}