import React from 'react';
import { Play } from 'lucide-react';
import { DUMMY_REELS } from '../constants';

const FeedScreen: React.FC = () => {
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 px-2">My Reels</h2>
      <div className="grid grid-cols-2 gap-4">
        {DUMMY_REELS.map((reel) => (
          <div key={reel.id} className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className={`absolute inset-0 ${reel.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
            <div className="absolute inset-0 flex flex-col justify-between p-3">
               <div className="self-end bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                 <Play size={10} fill="white" /> {reel.views}
               </div>
               <div>
                 <h3 className="font-bold text-sm text-white leading-tight shadow-black drop-shadow-md">{reel.title}</h3>
               </div>
            </div>
          </div>
        ))}
        {/* Add a "ghost" card for new creation */}
        <div className="aspect-[9/16] rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 gap-2 cursor-not-allowed opacity-50">
            <span>+</span>
            <span className="text-xs">Draft</span>
        </div>
      </div>
    </div>
  );
};

export default FeedScreen;