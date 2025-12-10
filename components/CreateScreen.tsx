import React, { useState } from 'react';
import { BookOpen, Clapperboard, Sparkles, Music, Mic2, Languages } from 'lucide-react';
import { ACTOR_DB, STYLES, LANGUAGES, MUSIC_MOODS } from '../constants';
import { StyleType } from '../types';

interface CreateScreenProps {
  onGenerate: (
    text: string, 
    style: StyleType, 
    actors: { male: string; female: string; supporting: string },
    config: { audioLanguage: string; subtitleLanguage: string; musicMood: string }
  ) => void;
}

const CreateScreen: React.FC<CreateScreenProps> = ({ onGenerate }) => {
  const [text, setText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('K-Drama');
  const [leadActor, setLeadActor] = useState('');
  const [leadActress, setLeadActress] = useState('');
  const [supporting, setSupporting] = useState('');
  
  // New State Fields
  const [audioLanguage, setAudioLanguage] = useState('English');
  const [subtitleLanguage, setSubtitleLanguage] = useState('English');
  const [musicMood, setMusicMood] = useState(MUSIC_MOODS[0]);

  const handleGenerate = () => {
    if (!text.trim()) return alert("Please paste a book page first!");
    if (!leadActor || !leadActress) return alert("Please select lead actors.");
    
    onGenerate(text, selectedStyle, {
      male: leadActor,
      female: leadActress,
      supporting
    }, {
      audioLanguage,
      subtitleLanguage,
      musicMood
    });
  };

  const actors = ACTOR_DB[selectedStyle] || ACTOR_DB['K-Drama'];

  React.useEffect(() => {
     setLeadActor('');
     setLeadActress('');
     setSupporting('');
     // Optional: Set default languages based on style
     if (selectedStyle === 'K-Drama') setAudioLanguage('Korean');
     else if (selectedStyle === 'Bollywood') setAudioLanguage('Hindi');
     else if (selectedStyle === 'Anime') setAudioLanguage('Japanese');
     else setAudioLanguage('English');
  }, [selectedStyle]);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-6 space-y-6 overflow-y-auto pb-24">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent flex justify-center items-center gap-2">
          <Clapperboard className="text-purple-500" /> BookToReel
        </h1>
        <p className="text-gray-400 text-sm">Turn pages into professional reels instantly.</p>
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <BookOpen size={16} /> Paste Book Page
        </label>
        <textarea
          className="w-full h-32 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none placeholder-slate-500"
          placeholder="She stood by the window, watching the rain. Three years..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Style Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Cinematic Style</label>
        <div className="grid grid-cols-2 gap-2">
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`p-2 rounded-lg text-sm font-medium transition-all ${
                selectedStyle === style
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Actor Selection */}
      <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
        <h3 className="text-sm font-semibold text-gray-300">Cast Your Stars</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Lead Actor</label>
            <select 
              value={leadActor}
              onChange={(e) => setLeadActor(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-purple-500 outline-none appearance-none"
            >
              <option value="">Select...</option>
              {actors.male.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Lead Actress</label>
            <select 
              value={leadActress}
              onChange={(e) => setLeadActress(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-purple-500 outline-none appearance-none"
            >
              <option value="">Select...</option>
              {actors.female.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1">
            <label className="text-xs text-gray-400">Supporting (Optional)</label>
            <select 
                value={supporting}
                onChange={(e) => setSupporting(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-purple-500 outline-none appearance-none"
            >
                <option value="">Select Supporting...</option>
                {[...actors.male, ...actors.female].map(a => <option key={`sup-${a.id}`} value={a.name}>{a.name}</option>)}
            </select>
        </div>
      </div>

      {/* Sound & Atmosphere Selection */}
      <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Music size={14} className="text-purple-400"/> Sound & Atmosphere
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
                <label className="text-xs text-gray-400 flex items-center gap-1"><Mic2 size={10} /> Audio Lang</label>
                <select 
                    value={audioLanguage}
                    onChange={(e) => setAudioLanguage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-purple-500 outline-none appearance-none"
                >
                    {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-xs text-gray-400 flex items-center gap-1"><Languages size={10} /> Subtitles</label>
                <select 
                    value={subtitleLanguage}
                    onChange={(e) => setSubtitleLanguage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-purple-500 outline-none appearance-none"
                >
                    {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
            </div>
        </div>

        <div className="space-y-1">
            <label className="text-xs text-gray-400">Background Music Mood</label>
            <select 
                value={musicMood}
                onChange={(e) => setMusicMood(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-purple-500 outline-none appearance-none"
            >
                {MUSIC_MOODS.map(mood => <option key={mood} value={mood}>{mood}</option>)}
            </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!text || !leadActor || !leadActress}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-xl shadow-purple-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles size={20} className="animate-pulse" /> GENERATE REEL
      </button>
    </div>
  );
};

export default CreateScreen;