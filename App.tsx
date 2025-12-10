import React, { useState } from 'react';
import { Home, Film, User, PlusCircle } from 'lucide-react';

import HomeScreen from './components/HomeScreen';
import InputScreen from './components/InputScreen';
import SceneSelectionScreen from './components/SceneSelectionScreen';
import CustomizeScreen from './components/CustomizeScreen';
import GenerationScreen from './components/GenerationScreen';
import PreviewScreen from './components/PreviewScreen';
import EditorScreen from './components/EditorScreen';
import FeedScreen from './components/FeedScreen';
import PostScreen from './components/PostScreen';

import { analyzeContent, generateScreenplay } from './services/geminiService';
import { ScreenType, Screenplay, Scene, AnalysisResult, InputMethod } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [inputType, setInputType] = useState<InputMethod>('text');
  
  // Data Flow State
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [generatedScreenplay, setGeneratedScreenplay] = useState<Screenplay | null>(null);
  
  // Generation UI State
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Navigation Handlers
  const goHome = () => {
    setCurrentScreen('home');
    setAnalysisResult(null);
    setSelectedScene(null);
    setGeneratedScreenplay(null);
  };

  const handleInputSelect = (type: InputMethod) => {
    setInputType(type);
    setCurrentScreen('input');
  };

  const handleAnalyze = async (content: string, type: 'text' | 'image') => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeContent(content, type);
      setAnalysisResult(result);
      setCurrentScreen('scene_selection');
    } catch (e) {
      alert("Analysis failed. See console.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSceneSelect = (scene: Scene) => {
    setSelectedScene(scene);
    setCurrentScreen('customize');
  };

  const handleGenerate = async (config: any) => {
    if (!selectedScene) return;
    
    setCurrentScreen('generating');
    setGenerationProgress(0);
    
    try {
        setGenerationStep('Writing multi-lingual screenplay...');
        setGenerationProgress(20);
        
        const screenplay = await generateScreenplay(selectedScene, config);
        
        setGenerationStep('Generating visuals (Simulated)...');
        setGenerationProgress(50);
        await new Promise(r => setTimeout(r, 1500));
        
        setGenerationStep(`Adding ${config.audioLanguage} audio...`);
        setGenerationProgress(80);
        await new Promise(r => setTimeout(r, 1500));
        
        setGeneratedScreenplay(screenplay);
        setGenerationProgress(100);
        
        setTimeout(() => setCurrentScreen('preview'), 500);

    } catch (e) {
        alert("Generation failed");
        setCurrentScreen('customize');
    }
  };

  const handleSaveEdits = (updated: Screenplay) => {
    setGeneratedScreenplay(updated);
    setCurrentScreen('preview');
  };

  // Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={(screen, data) => {
            if (screen === 'input') handleInputSelect(data.type);
            else setCurrentScreen(screen as ScreenType);
        }} />;
      case 'input':
        return <InputScreen 
            inputType={inputType} 
            onBack={goHome} 
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
        />;
      case 'scene_selection':
        return analysisResult ? <SceneSelectionScreen 
            analysis={analysisResult} 
            onSelectScene={handleSceneSelect} 
            onBack={() => setCurrentScreen('input')}
        /> : null;
      case 'customize':
        return selectedScene && analysisResult ? <CustomizeScreen 
            scene={selectedScene}
            genre={analysisResult.detected_genre}
            onBack={() => setCurrentScreen('scene_selection')}
            onGenerate={handleGenerate}
        /> : null;
      case 'generating':
        return <GenerationScreen progress={generationProgress} currentStep={generationStep} />;
      case 'preview':
        return generatedScreenplay ? <PreviewScreen 
            screenplay={generatedScreenplay}
            onEdit={() => setCurrentScreen('editor')}
            onApprove={() => setCurrentScreen('post')}
            onBack={goHome}
        /> : null;
      case 'editor':
        return generatedScreenplay ? <EditorScreen 
            screenplay={generatedScreenplay}
            onSave={handleSaveEdits}
            onCancel={() => setCurrentScreen('preview')}
        /> : null;
      case 'post':
        return generatedScreenplay ? <PostScreen 
            screenplay={generatedScreenplay}
            onHome={goHome}
        /> : null;
      case 'feed':
        return <FeedScreen />;
      default:
        return <HomeScreen onNavigate={() => {}} />;
    }
  };

  const showNav = currentScreen === 'home' || currentScreen === 'feed';

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white">
        {!process.env.API_KEY && (
             <div className="bg-red-900/50 text-red-200 p-2 text-center text-xs border-b border-red-800">
                Warning: process.env.API_KEY is missing.
            </div>
        )}

      <main className="h-screen flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {renderScreen()}
        </div>

        {showNav && (
          <div className="h-16 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 grid grid-cols-3 items-center absolute bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50">
            <button 
              onClick={() => setCurrentScreen('home')}
              className={`flex flex-col items-center justify-center gap-1 ${currentScreen === 'home' ? 'text-purple-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <PlusCircle size={24} />
              <span className="text-[10px] font-medium">Create</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('feed')}
              className={`flex flex-col items-center justify-center gap-1 ${currentScreen === 'feed' ? 'text-purple-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Film size={24} />
              <span className="text-[10px] font-medium">My Reels</span>
            </button>
            <button 
              className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-300 opacity-50 cursor-not-allowed"
            >
              <User size={24} />
              <span className="text-[10px] font-medium">Profile</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;