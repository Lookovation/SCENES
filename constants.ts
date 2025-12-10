import { ActorDatabase, GenreType, LanguageOption, MusicMoodOption, StyleType } from './types';

export const GENRES: GenreType[] = ['Romance', 'Action', 'Horror', 'Comedy', 'Thriller', 'Fantasy', 'Manga', 'Drama', 'Sci-Fi'];

export const STYLES: StyleType[] = ['K-Drama', 'Bollywood', 'Hollywood', 'Anime', 'Manga', 'Realistic', 'Vintage', 'Cinematic'];

export const ACTOR_DB: ActorDatabase = {
  'K-Drama': {
    male: [{ name: "Park Seo Joon", id: "psj" }, { name: "Kim Soo Hyun", id: "ksh" }, { name: "V (BTS)", id: "v" }, { name: "Cha Eunwoo", id: "cew" }],
    female: [{ name: "Park Bo Young", id: "pby" }, { name: "IU", id: "iu" }, { name: "Song Hye Kyo", id: "shk" }, { name: "Jennie", id: "jen" }]
  },
  'Bollywood': {
    male: [{ name: "Shah Rukh Khan", id: "srk" }, { name: "Ranbir Kapoor", id: "rk" }, { name: "Ranveer Singh", id: "rs" }],
    female: [{ name: "Deepika Padukone", id: "dp" }, { name: "Alia Bhatt", id: "ab" }, { name: "Priyanka Chopra", id: "pc" }]
  },
  'Hollywood': {
    male: [{ name: "Timothée Chalamet", id: "tc" }, { name: "Tom Holland", id: "th" }, { name: "Ryan Gosling", id: "rg" }],
    female: [{ name: "Zendaya", id: "zen" }, { name: "Florence Pugh", id: "fp" }, { name: "Anya Taylor-Joy", id: "atj" }]
  },
  'Anime': {
    male: [{ name: "Shonen Protagonist", id: "am1" }, { name: "Mysterious Rival", id: "am2" }],
    female: [{ name: "Magical Girl", id: "af1" }, { name: "Tsundere Lead", id: "af2" }]
  },
  'Action': {
    male: [{ name: "Jason Statham Type", id: "actm1" }, { name: "John Wick Type", id: "actm2" }],
    female: [{ name: "Action Heroine", id: "actf1" }, { name: "Spy", id: "actf2" }]
  }
};

// Fallback for genres not explicitly mapped
ACTOR_DB['Manga'] = ACTOR_DB['Anime'];
ACTOR_DB['Romance'] = ACTOR_DB['K-Drama'];
ACTOR_DB['Drama'] = ACTOR_DB['K-Drama'];
ACTOR_DB['Horror'] = { male: [{name: "Scared Victim", id: "h1"}], female: [{name: "Final Girl", id: "h2"}]};

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English" },
  { code: "ko", name: "Korean" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Chinese" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "th", name: "Thai" }
];

export const MUSIC_MOODS: MusicMoodOption[] = [
  { id: "auto", name: "Auto-match to scene", tags: [] },
  { id: "romantic_soft", name: "Romantic / Soft", tags: ["piano", "strings"] },
  { id: "dramatic_intense", name: "Dramatic / Intense", tags: ["orchestral", "epic"] },
  { id: "action_epic", name: "Action / Epic", tags: ["fast", "drums"] },
  { id: "sad_emotional", name: "Sad / Emotional", tags: ["slow", "minor key"] },
  { id: "happy_upbeat", name: "Happy / Upbeat", tags: ["pop", "bright"] },
  { id: "mysterious_suspense", name: "Mysterious / Suspense", tags: ["ambient", "dark"] },
  { id: "horror_dark", name: "Horror / Dark", tags: ["dissonant", "scary"] },
  { id: "comedy_playful", name: "Comedy / Playful", tags: ["quirky"] },
  { id: "none", name: "No Music", tags: [] }
];

export const DUMMY_REELS = [
  { id: '1', title: 'The Silent Goodbye', views: '45K', color: 'bg-rose-500' },
  { id: '2', title: 'Midnight Rain', views: '12K', color: 'bg-blue-600' },
  { id: '3', title: 'Solo Leveling Ep.1', views: '89K', color: 'bg-purple-600' },
];

export const TRENDING_SCENES = [
  { id: 1, title: "The Silent Confession", source: "Love in Seoul", views: "45K", type: "Romance" },
  { id: 2, title: "Final Battle", source: "Shadow Warriors", views: "38K", type: "Action" },
  { id: 3, title: "Awkward First Date", source: "Clumsy Hearts", views: "29K", type: "Comedy" },
];