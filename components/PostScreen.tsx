import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Share2, Download, Calendar, Music2, Youtube, Instagram, Home } from 'lucide-react';
import { Screenplay } from '../types';

interface PostScreenProps {
  screenplay: Screenplay;
  onHome: () => void;
}

const PostScreen: React.FC<PostScreenProps> = ({ screenplay, onHome }) => {
  const [posted, setPosted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = () => {
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setPosted(true);
    }, 2000);
  };

  if (posted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 bg-slate-900">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Posted Successfully!</h2>
        <button onClick={onHome} className="px-6 py-3 bg-slate-800 rounded-full text-white mt-4 flex items-center gap-2">
            <Home size={18} /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 p-6 overflow-y-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onHome} className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Finalize & Post</h1>
      </div>

      <div className="space-y-6 pb-24">
        {/* Thumb */}
        <div className="flex gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
            <div className="w-20 aspect-[9/16] bg-black rounded-lg flex items-center justify-center text-xs text-gray-500">
                Thumb
            </div>
            <div>
                <h3 className="font-bold text-white line-clamp-1">{screenplay.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{screenplay.duration} • {screenplay.style}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle size={10} /> Ready</span>
                </div>
            </div>
        </div>

        {/* Platforms */}
        <div>
            <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">Post to</h3>
            <div className="space-y-2">
                <label className="flex items-center justify-between p-4 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-750">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-slate-700">
                            <Music2 size={16} className="text-white" />
                         </div>
                         <span className="text-sm font-medium text-white">TikTok</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600 rounded" />
                </label>

                <label className="flex items-center justify-between p-4 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-750">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-purple-600 flex items-center justify-center">
                            <Instagram size={16} className="text-white" />
                         </div>
                         <span className="text-sm font-medium text-white">Instagram Reels</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600 rounded" />
                </label>
                
                <label className="flex items-center justify-between p-4 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-750">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                            <Youtube size={16} className="text-white" />
                         </div>
                         <span className="text-sm font-medium text-white">YouTube Shorts</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600 rounded" />
                </label>
            </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
             <button className="p-3 bg-slate-800 rounded-xl text-xs text-gray-300 flex items-center justify-center gap-2 hover:bg-slate-700">
                <Calendar size={16} /> Schedule
             </button>
             <button className="p-3 bg-slate-800 rounded-xl text-xs text-gray-300 flex items-center justify-center gap-2 hover:bg-slate-700">
                <Download size={16} /> Save Draft
             </button>
        </div>

        {/* Post Button */}
        <button 
            onClick={handlePost}
            disabled={isPosting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
        >
            {isPosting ? 'Posting...' : 'POST NOW'} <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default PostScreen;