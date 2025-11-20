
import React, { useState, useEffect } from 'react';
import { Chapter, Lesion } from '../types';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  lesions: Lesion[];
  selectedLesionId: string | null;
  onSelectLesion: (lesion: Lesion) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  isSearchActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  chapters, 
  lesions, 
  selectedLesionId, 
  onSelectLesion,
  isOpen,
  toggleSidebar,
  isSearchActive = false
}) => {
  // Track expanded chapters. Default to none.
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

  // Auto-expand/collapse based on search state
  useEffect(() => {
    if (isSearchActive) {
      // Expand all chapters that have matches
      setExpandedChapters(chapters.map(c => c.id));
    } else {
      // Reset to collapsed when search clears
      setExpandedChapters([]);
    }
  }, [isSearchActive, chapters]);

  const toggleChapter = (id: number) => {
    // Accordion logic: if clicking an open one, close it. 
    // If clicking a closed one, open it and close all others.
    setExpandedChapters(prev => 
      prev.includes(id) ? [] : [id]
    );
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-30 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 shadow-xl md:shadow-none
    `}>
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 h-16">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Pathology Index
        </h2>
        <button onClick={toggleSidebar} className="md:hidden text-slate-500 hover:text-slate-800">
           ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {chapters.map(chapter => {
          // Filter lesions that belong to this chapter (check if chapter.id is in the lesion's chapterIds array)
          // Sort alphabetically by name
          const chapterLesions = lesions
            .filter(l => l.chapterIds.includes(chapter.id))
            .sort((a, b) => a.name.localeCompare(b.name));
            
          const isExpanded = expandedChapters.includes(chapter.id);
          const hasMatches = chapterLesions.length > 0;

          // If searching, hide empty chapters entirely to reduce noise
          if (isSearchActive && !hasMatches) return null;

          return (
            <div key={chapter.id} className="border-b border-slate-50 last:border-0">
              <button 
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors ${isExpanded ? 'bg-slate-50' : ''}`}
              >
                <div className="mt-0.5 text-slate-400">
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                <span className={`text-sm font-medium leading-tight ${isExpanded ? 'text-primary' : 'text-slate-700'}`}>
                  {chapter.title}
                </span>
              </button>

              {isExpanded && (
                <div className="bg-slate-50/50 pb-2">
                  {chapterLesions.length > 0 ? (
                    chapterLesions.map(lesion => (
                      <button
                        key={lesion.id}
                        onClick={() => {
                          onSelectLesion(lesion);
                          if (window.innerWidth < 768) toggleSidebar(); // Close on mobile select
                        }}
                        className={`
                          w-full text-left pl-11 pr-4 py-3 text-sm block transition-colors border-l-4 border-b border-slate-100 last:border-b-0
                          ${selectedLesionId === lesion.id 
                            ? 'border-l-primary bg-blue-50 text-primary font-medium' 
                            : 'border-l-transparent text-slate-600 hover:text-slate-900 hover:border-l-slate-300'}
                        `}
                      >
                        {lesion.name}
                      </button>
                    ))
                  ) : (
                    <div className="pl-11 pr-4 py-2 text-xs text-slate-400 italic">
                      No entries found.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        
        {isSearchActive && lesions.length === 0 && (
          <div className="p-6 text-center text-slate-400 text-sm">
            No local results found.
          </div>
        )}
      </div>
      
      <div className="p-4 text-xs text-slate-400 text-center border-t border-slate-100">
        Oral Pathology Repository v1.3
      </div>
    </div>
  );
};
