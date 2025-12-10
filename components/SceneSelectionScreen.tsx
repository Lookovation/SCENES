import React from 'react';
import { ArrowLeft, Film, Clock, User, ArrowRight } from 'lucide-react';
import { Scene, AnalysisResult } from '../types';

interface SceneSelectionScreenProps {
  analysis: AnalysisResult;
  onSelectScene: (scene: Scene) => void;
  onBack: () => void;
}

const SceneSelectionScreen: React.FC<SceneSelectionScreenProps> = ({ analysis, onSelectScene, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <div>
            <h1 className="text-xl font-bold text-white">Select a Scene</h1>
            <p className="text-xs text-purple-400 font-medium uppercase tracking-wide">
                Detected: {analysis.detected_genre} • {analysis.scenes.length} Scenes
            </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-24">
        {analysis.scenes.map((scene) => (
          <div 
            key={scene.scene_id}
            onClick={() => onSelectScene(scene)}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 cursor-pointer hover:border-purple-500 hover:bg-slate-750 transition-all group relative overflow-hidden"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {scene.scene_title}
                </h3>
                <span className="bg-slate-900 text-xs font-mono px-2 py-1 rounded text-gray-400">
                    {scene.estimated_duration_seconds}s
                </span>
            </div>
            
            <p className="text-sm text-gray-400 mb-4 line-clamp-2 italic">
                "{scene.hook_line}"
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded text-gray-300 flex items-center gap-1">
                    <Film size={12} /> {scene.scene_type}
                </span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded text-gray-300 flex items-center gap-1">
                    <User size={12} /> {scene.characters.length} chars
                </span>
            </div>

            {scene.reason && (
                <div className="bg-purple-900/20 p-2 rounded text-xs text-purple-300 mb-2">
                    ✨ AI Recommends: {scene.reason}
                </div>
            )}

            <div className="w-full flex items-center justify-end text-purple-400 text-sm font-medium gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Create Reel <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneSelectionScreen;