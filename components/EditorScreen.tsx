import React, { useState } from 'react';
import { ArrowLeft, Save, Trash2, Clock, Camera, MessageSquare } from 'lucide-react';
import { Screenplay, Shot } from '../types';

interface EditorScreenProps {
  screenplay: Screenplay;
  onSave: (updatedScreenplay: Screenplay) => void;
  onCancel: () => void;
}

const EditorScreen: React.FC<EditorScreenProps> = ({ screenplay, onSave, onCancel }) => {
  const [editedScreenplay, setEditedScreenplay] = useState<Screenplay>(JSON.parse(JSON.stringify(screenplay)));

  const handleShotChange = (index: number, field: keyof Shot, value: string) => {
    const newShots = [...editedScreenplay.shots];
    newShots[index] = { ...newShots[index], [field]: value };
    setEditedScreenplay({ ...editedScreenplay, shots: newShots });
  };

  const handleDeleteShot = (index: number) => {
    if (editedScreenplay.shots.length <= 1) {
      alert("You must have at least one shot.");
      return;
    }
    if (confirm("Are you sure you want to remove this shot?")) {
      const newShots = editedScreenplay.shots.filter((_, i) => i !== index);
      // Re-number shots
      const renumberedShots = newShots.map((shot, i) => ({ ...shot, shot_number: i + 1 }));
      setEditedScreenplay({ ...editedScreenplay, shots: renumberedShots });
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10">
        <button onClick={onCancel} className="text-gray-400 hover:text-white flex items-center gap-1">
          <ArrowLeft size={18} /> Cancel
        </button>
        <h2 className="font-bold text-lg">Edit Reel</h2>
        <button 
          onClick={() => onSave(editedScreenplay)} 
          className="text-purple-400 font-medium hover:text-purple-300 flex items-center gap-1"
        >
          <Save size={18} /> Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Metadata Section */}
        <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div>
            <label className="text-xs text-gray-400 uppercase font-bold">Title</label>
            <input 
              type="text" 
              value={editedScreenplay.title}
              onChange={(e) => setEditedScreenplay({ ...editedScreenplay, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 mt-1 text-sm focus:border-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase font-bold">Caption</label>
            <textarea 
              value={editedScreenplay.caption}
              onChange={(e) => setEditedScreenplay({ ...editedScreenplay, caption: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 mt-1 text-sm focus:border-purple-500 outline-none resize-none h-20"
            />
          </div>
        </div>

        {/* Shots Editor */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase">Shots ({editedScreenplay.shots.length})</h3>
          </div>
          
          {editedScreenplay.shots.map((shot, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-3 relative group">
              <div className="flex justify-between items-start">
                <span className="bg-slate-700 text-xs px-2 py-1 rounded text-gray-300 font-mono">
                  Shot {shot.shot_number} • {shot.duration}
                </span>
                <button 
                  onClick={() => handleDeleteShot(index)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Visual Description */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500 flex items-center gap-1">
                  <Camera size={12} /> Visual
                </label>
                <textarea
                  value={shot.visual}
                  onChange={(e) => handleShotChange(index, 'visual', e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-2 text-sm text-gray-200 focus:border-purple-500 outline-none resize-none h-20"
                />
              </div>

              {/* Dialogue */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500 flex items-center gap-1">
                  <MessageSquare size={12} /> Dialogue (Optional)
                </label>
                <input
                  type="text"
                  value={shot.dialogue || ''}
                  onChange={(e) => handleShotChange(index, 'dialogue', e.target.value)}
                  placeholder="No dialogue..."
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-2 text-sm text-gray-200 focus:border-purple-500 outline-none"
                />
              </div>

              {/* Camera Angle Badge (Read only for simplicity in MVP, or editable if we want) */}
              <div className="flex gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded">
                   🎥 {shot.camera}
                </span>
                <span className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded">
                   🎵 {shot.music_mood}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorScreen;