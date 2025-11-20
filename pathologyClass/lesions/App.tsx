import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LesionDetail } from './components/LesionDetail';
import { CHAPTERS, INITIAL_LESIONS } from './constants';
import { Lesion } from './types';
import { Menu, Search, Loader2, PlusCircle } from 'lucide-react';
import { generateLesionData } from './services/geminiService';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const [selectedLesion, setSelectedLesion] = useState<Lesion | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lesions, setLesions] = useState<Lesion[]>(INITIAL_LESIONS);
  
  // AI Generation State
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter logic
  const filteredLesions = lesions.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.clinicalFeatures.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.histopathologicFeatures.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLesion = (lesion: Lesion) => {
    setSelectedLesion(lesion);
    // On mobile, close sidebar after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    // Scroll to top of content
    const mainContent = document.querySelector('main');
    if (mainContent) mainContent.scrollTop = 0;
  };

  const handleAiGenerate = async () => {
    if (!searchTerm) return;
    setIsGenerating(true);
    
    // For this skeleton, we default new entries to Chapter 1 (Introduction/General)
    // In a full app, you might show a modal to select the chapter.
    const defaultChapterId = 1; 
    
    const newLesion = await generateLesionData(searchTerm, defaultChapterId); 
    
    if (newLesion) {
      setLesions(prev => [...prev, newLesion]);
      setSelectedLesion(newLesion);
      setSearchTerm(''); // Clear search to show the new item in context
    } else {
      alert("Could not generate data. Please try a different term.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        chapters={CHAPTERS} 
        lesions={filteredLesions}
        selectedLesionId={selectedLesion?.id || null}
        onSelectLesion={handleSelectLesion}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isSearchActive={searchTerm.length > 0}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative transition-all">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-4 shadow-sm z-20 h-16">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search lesions (e.g. 'Fibroma', 'Ameloblastoma')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-all"
            />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth bg-slate-100/50">
          {selectedLesion ? (
            <LesionDetail 
              lesion={selectedLesion} 
              allLesions={lesions}
              onLinkClick={handleSelectLesion}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center min-h-[400px]">
              {searchTerm && filteredLesions.length === 0 ? (
                <div className="max-w-md animate-fadeIn">
                   <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Search size={32} className="text-slate-300" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-700 mb-2">No local matches found</h3>
                   <p className="mb-8 text-slate-500">We couldn't find "{searchTerm}" in the current repository.</p>
                   
                   <button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="w-full bg-primary hover:bg-sky-700 text-white px-6 py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                   >
                     {isGenerating ? (
                       <>
                        <Loader2 className="animate-spin" size={20} />
                        Researching...
                       </>
                     ) : (
                       <>
                        <PlusCircle size={20} />
                        Generate "{searchTerm}" Page
                       </>
                     )}
                   </button>
                   <p className="text-xs mt-4 text-slate-400 max-w-xs mx-auto">
                     This will use AI to structure a new lesion entry and add it to your temporary session.
                   </p>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🦷</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">Oral Pathology Repository</h2>
                  <p className="max-w-md mx-auto text-slate-500 leading-relaxed">
                    Select a chapter from the sidebar or search for a specific lesion to view its clinical, radiographic, and histopathologic features.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      
      {/* Mobile overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-20 md:hidden backdrop-blur-[1px] transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
