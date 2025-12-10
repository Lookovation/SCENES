import React from 'react';
import { Download, Edit3, CheckCircle, ListVideo, ArrowLeft } from 'lucide-react';
import { Screenplay } from '../types';

interface PreviewScreenProps {
  screenplay: Screenplay;
  onEdit: () => void;
  onApprove: () => void;
  onBack: () => void;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ screenplay, onEdit, onApprove, onBack }) => {
  return (
    <div className="flex flex-col h-full max-w-md mx-auto overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/95 sticky top-0 z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-lg text-white">Review & Edit</h2>
        <div className="w-5" />
      </div>

      {/* Video Preview Placeholder */}
      <div className="relative w-full aspect-[9/16] bg-black group">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
           <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
             <span className="text-3xl">▶️</span>
           </div>
           <div>
             <h3 className="font-bold text-xl text-white mb-2">{screenplay.title}</h3>
             <p className="text-sm text-gray-400 italic">"{screenplay.shots[0].visual}"</p>
           </div>
           <div className="text-xs bg-slate-800 px-2 py-1 rounded text-gray-400 mt-2">
                🎵 {screenplay.shots[0].music_mood} | 🗣️ {screenplay.audio_language}
           </div>
        </div>
        
        {/* Overlay controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-4">
             <button onClick={onEdit} className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                <Edit3 size={20} />
            </button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 space-y-6 bg-slate-900">
        
        <button 
          onClick={onEdit}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-medium text-gray-300 flex items-center justify-center gap-2 transition-colors"
        >
          <ListVideo size={16} /> Frame Editor
        </button>

        {/* Caption */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Caption Preview</label>
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-sm text-gray-300">
                {screenplay.caption}
                <div className="mt-2 text-blue-400 flex flex-wrap gap-1">
                    {screenplay.hashtags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
            </div>
        </div>

        {/* Approve Action */}
        <button 
            onClick={onApprove}
            className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white shadow-lg shadow-green-900/30 flex items-center justify-center gap-2 transition-all"
        >
            APPROVE & POST <CheckCircle size={20} />
        </button>
        
        <button className="w-full py-3 text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2">
             <Download size={14} /> Download Only
        </button>

      </div>
    </div>
  );
};

export default PreviewScreen;