import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clapperboard, Sparkles, Music, Mic2, Languages, Clock } from 'lucide-react';
import { ACTOR_DB, STYLES, LANGUAGES, MUSIC_MOODS } from '../constants';
import { Scene } from '../types';

interface CustomizeScreenProps {
  scene: Scene;
  genre: string;
  onBack: () => void;
  onGenerate: (config: any) => void;
}

const CustomizeScreen: React.FC<CustomizeScreenProps> = ({ scene, genre, onBack, onGenerate }) => {
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [leadActor, setLeadActor] = useState('');
  const [leadActress, setLeadActress] = useState('');
  const [supporting, setSupporting] = useState('');
  
  const [audioLanguage, setAudioLanguage] = useState('English');
  const [subtitleLanguage, setSubtitleLanguage] = useState('English');
  const [musicMood, setMusicMood] = useState('auto');
  const [duration, setDuration] = useState('30s');

  // Smart defaults based on genre
  useEffect(() => {
    if (genre === 'Manga' || genre === 'Anime') setSelectedStyle('Anime');
    else if (genre === 'Romance') setSelectedStyle('K-Drama');
    else if (genre === 'Action') setSelectedStyle('Hollywood');
  }, [genre]);

  const getActorList = () => {
    // Attempt to map style to DB, else fallback
    const dbKey = ACTOR_DB[selectedStyle] ? selectedStyle : 
                  ACTOR_DB[genre] ? genre : 'Hollywood';
    return ACTOR_DB[dbKey] || ACTOR_DB['Hollywood'];
  };

  const actorList = getActorList();

  const handleGenerate = () => {
    onGenerate({
        style: selectedStyle,
        leadActor,
        leadActress,
        supporting,
        audioLanguage,
        subtitleLanguage,
        musicMood,
        duration
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 p-6 overflow-y-auto pb-24">
       <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Customize Reel</h1>
      </div>

      <div className="space-y-6">
        {/* Style */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Visual Style</label>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {STYLES.map(style => (
                    <button
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                            selectedStyle === style 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                        }`}
                    >
                        {style}
                    </button>
                ))}
            </div>
        </div>

        {/* Casting */}
        <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Clapperboard size={14} className="text-purple-400" /> Cast
            </h3>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Lead Male</label>
                    <select 
                        value={leadActor} onChange={e => setLeadActor(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none"
                    >
                        <option value="">Select...</option>
                        {actorList.male.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Lead Female</label>
                    <select 
                        value={leadActress} onChange={e => setLeadActress(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none"
                    >
                        <option value="">Select...</option>
                        {actorList.female.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                    </select>
                </div>
            </div>
        </div>

        {/* Audio & Music */}
        <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
             <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Music size={14} className="text-pink-400" /> Audio
            </h3>
            <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="text-xs text-gray-400 mb-1 block flex items-center gap-1"><Mic2 size={10}/> Voice Language</label>
                    <select 
                        value={audioLanguage} onChange={e => setAudioLanguage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none"
                    >
                        {LANGUAGES.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1 block flex items-center gap-1"><Languages size={10}/> Subtitles</label>
                    <select 
                        value={subtitleLanguage} onChange={e => setSubtitleLanguage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none"
                    >
                        <option value="None">None</option>
                        {LANGUAGES.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label className="text-xs text-gray-400 mb-1 block">Background Music</label>
                <select 
                    value={musicMood} onChange={e => setMusicMood(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none"
                >
                    {MUSIC_MOODS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                </select>
            </div>
        </div>

        {/* Duration */}
        <div>
             <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Duration</label>
             <div className="flex bg-slate-800 rounded-lg p-1">
                 {['15s', '30s', '45s', '60s'].map(d => (
                     <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`flex-1 py-2 rounded text-xs font-medium transition-colors ${
                            duration === d ? 'bg-slate-600 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                     >
                         {d}
                     </button>
                 ))}
             </div>
        </div>

        <button
            onClick={handleGenerate}
            disabled={!leadActor && !leadActress} // Loose validation for MVP
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-xl shadow-purple-900/30 flex items-center justify-center gap-2 mt-4"
        >
            <Sparkles size={20} className="animate-pulse" /> GENERATE REEL
        </button>

      </div>
    </div>
  );
};

export default CustomizeScreen;