import React from 'react';
import { Search, PenTool, Image as ImageIcon, FileText, Link as LinkIcon, Flame, Book } from 'lucide-react';
import { TRENDING_SCENES } from '../constants';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 p-6 overflow-y-auto pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">BooksToReel</h1>
          <p className="text-xs text-gray-400">Discover. Convert. Go Viral.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
            <span className="text-xs">☰</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-slate-500" size={18} />
        <input 
          type="text" 
          placeholder="Search books, authors, genres..." 
          className="w-full bg-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Input Methods */}
      <div className="space-y-4 mb-8">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Start Creating</h2>
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => onNavigate('input', { type: 'text' })}
            className="flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-700 p-4 rounded-xl gap-2 transition-colors border border-slate-700"
          >
            <PenTool size={24} className="text-purple-400" />
            <span className="text-xs font-medium text-gray-300">Paste Text</span>
          </button>
          
          <button 
            onClick={() => onNavigate('input', { type: 'image' })}
            className="flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-700 p-4 rounded-xl gap-2 transition-colors border border-slate-700"
          >
            <ImageIcon size={24} className="text-pink-400" />
            <span className="text-xs font-medium text-gray-300">Upload Img</span>
          </button>
          
          <button 
            onClick={() => onNavigate('input', { type: 'pdf' })}
            className="flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-700 p-4 rounded-xl gap-2 transition-colors border border-slate-700"
          >
            <FileText size={24} className="text-blue-400" />
            <span className="text-xs font-medium text-gray-300">PDF</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center bg-slate-800/50 p-3 rounded-lg gap-2 text-xs text-gray-400 hover:bg-slate-800">
                <LinkIcon size={14} /> Paste URL
            </button>
            <button className="flex items-center justify-center bg-slate-800/50 p-3 rounded-lg gap-2 text-xs text-gray-400 hover:bg-slate-800">
                <Book size={14} /> Browse Library
            </button>
        </div>
      </div>

      {/* Trending */}
      <div>
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Flame size={16} className="text-orange-500" /> Trending Scenes
        </h2>
        <div className="space-y-3">
            {TRENDING_SCENES.map(scene => (
                <div key={scene.id} className="bg-slate-800 p-4 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-slate-750 border border-transparent hover:border-slate-600 transition-all">
                    <div>
                        <h3 className="font-bold text-sm text-white">{scene.title}</h3>
                        <p className="text-xs text-gray-400">{scene.source} • {scene.type}</p>
                    </div>
                    <div className="text-xs font-mono text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                        {scene.views}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;