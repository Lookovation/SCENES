import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, FileText, X, ScanSearch, Loader2 } from 'lucide-react';
import { InputMethod } from '../types';

interface InputScreenProps {
  inputType: InputMethod;
  onBack: () => void;
  onAnalyze: (content: string, type: 'text' | 'image') => void;
  isAnalyzing: boolean;
}

const InputScreen: React.FC<InputScreenProps> = ({ inputType, onBack, onAnalyze, isAnalyzing }) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (inputType === 'text') {
        if (!text.trim()) return;
        onAnalyze(text, 'text');
    } else if (inputType === 'image') {
        if (!imagePreview) return;
        // Strip base64 header for API
        const base64Data = imagePreview.split(',')[1];
        onAnalyze(base64Data, 'image');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white capitalize">
            {inputType === 'text' ? 'Paste Text' : 
             inputType === 'image' ? 'Upload Image' : 
             'Upload Content'}
        </h1>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {/* Helper Text */}
        <div className="bg-blue-900/20 border border-blue-800 p-3 rounded-lg">
            <p className="text-xs text-blue-200">
                {inputType === 'text' ? 'Paste a paragraph, dialogue, or chapter excerpt. The AI will detect the genre.' :
                 inputType === 'image' ? 'Upload a photo of a book page, manga panel, or screenshot. We use OCR to read it.' :
                 'Upload your content.'}
            </p>
        </div>

        {/* Input Area */}
        {inputType === 'text' && (
            <textarea
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none placeholder-slate-500"
                placeholder="Paste your content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        )}

        {inputType === 'image' && (
            <div className="flex-1 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center bg-slate-800/30 relative overflow-hidden group">
                {imagePreview ? (
                    <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                        <button 
                            onClick={() => setImagePreview(null)}
                            className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:bg-red-500/80 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-center cursor-pointer p-8 w-full h-full flex flex-col items-center justify-center"
                    >
                        <Upload size={48} className="text-slate-500 mb-4 group-hover:text-purple-400 transition-colors" />
                        <p className="text-gray-300 font-medium">Tap to Upload Image</p>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG, WEBP supported</p>
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        )}

        {inputType === 'pdf' && (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                 <FileText size={64} />
                 <p className="text-center">PDF Support coming soon to MVP.</p>
             </div>
        )}

        {/* Action Button */}
        <button
            onClick={handleSubmit}
            disabled={isAnalyzing || (inputType === 'text' && !text) || (inputType === 'image' && !imagePreview)}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-xl shadow-purple-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isAnalyzing ? (
                <>Analyzing <Loader2 className="animate-spin" size={20} /></>
            ) : (
                <>Analyze & Find Scenes <ScanSearch size={20} /></>
            )}
        </button>
      </div>
    </div>
  );
};

export default InputScreen;