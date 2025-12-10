import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface GenerationScreenProps {
  progress: number; // 0 to 100
  currentStep: string;
}

const steps = [
  { id: 1, label: "Analyzing scene & emotions" },
  { id: 2, label: "Writing screenplay" },
  { id: 3, label: "Generating visual prompts" },
  { id: 4, label: "Composing audio & voice" },
  { id: 5, label: "Final rendering" }
];

const GenerationScreen: React.FC<GenerationScreenProps> = ({ progress, currentStep }) => {
  // We can infer active step index based on currentStep string match roughly or just passed progress
  // For MVP, let's map progress ranges to steps visually
  
  const getStepStatus = (index: number) => {
    // 5 steps, 20% each
    const stepThreshold = (index + 1) * 20;
    if (progress >= stepThreshold) return 'completed';
    if (progress >= stepThreshold - 20) return 'active';
    return 'pending';
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto p-8 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white animate-pulse">Creating Your Reel...</h2>
        <p className="text-gray-400">{currentStep}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="w-full space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div key={step.id} className="flex items-center gap-3 transition-colors duration-300">
              {status === 'completed' ? (
                <CheckCircle2 className="text-green-500 w-6 h-6" />
              ) : status === 'active' ? (
                <Loader2 className="text-purple-500 w-6 h-6 animate-spin" />
              ) : (
                <Circle className="text-slate-700 w-6 h-6" />
              )}
              
              <span className={`text-sm font-medium ${
                status === 'completed' ? 'text-gray-300' :
                status === 'active' ? 'text-white' : 'text-gray-600'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center w-full">
        <p className="text-xs text-gray-400">Est. time remaining</p>
        <p className="text-lg font-mono text-purple-400">{Math.max(0, Math.ceil((100 - progress) * 0.4))} seconds</p>
      </div>
    </div>
  );
};

export default GenerationScreen;