
import React from 'react';
import { Lesion } from '../types';
import { 
  Activity, 
  Eye, 
  Microscope, 
  Stethoscope, 
  AlertCircle, 
  Sparkles, 
  BookOpen,
  MapPin,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  UserCheck,
  Key
} from 'lucide-react';

interface LesionDetailProps {
  lesion: Lesion;
  allLesions: Lesion[];
  onLinkClick: (lesion: Lesion) => void;
}

// --- Markdown Renderer ---
// Handles **bold**, *italics*, - lists, and 1. lists
const MarkdownRenderer: React.FC<{ content: string | null | undefined, className?: string }> = ({ content, className = "" }) => {
  if (!content || content === 'null' || content === '') return null;

  const safeContent = content.trim();

  // 1. Handle Ordered Lists (e.g. "1. Item")
  // Detects if content starts with number or has newlines followed by number
  const isOrderedList = /^(?:1\.|[0-9]+\.)\s/.test(safeContent) || safeContent.includes('\n1. ');

  if (isOrderedList) {
    const lines = safeContent.split('\n').filter(line => line.trim().length > 0);
    return (
      <ol className={`space-y-2 list-decimal list-inside marker:text-slate-400 marker:font-medium ${className}`}>
        {lines.map((line, idx) => {
          // Remove the hardcoded number from text so CSS can handle it cleanly
          const cleanLine = line.replace(/^[0-9]+\.\s+/, '');
          return (
            <li key={idx} className="pl-1 leading-relaxed">
               <span className="inline-block align-top">
                 <InlineMarkdown text={cleanLine} />
               </span>
            </li>
          );
        })}
      </ol>
    );
  }

  // 2. Handle Unordered Lists (e.g. "- Item" or "* Item")
  const isUnorderedList = /^[-*]\s/.test(safeContent) || safeContent.includes('\n- ') || safeContent.includes('\n* ');

  if (isUnorderedList) {
    const lines = safeContent.split('\n').filter(line => line.trim().length > 0);
    return (
      <ul className={`space-y-2 ${className}`}>
        {lines.map((line, idx) => {
          // Remove bullet marker
          const cleanLine = line.replace(/^[-*]\s+/, '');
          return (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
              <span className="leading-relaxed">
                 <InlineMarkdown text={cleanLine} />
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  // 3. Handle Paragraphs / Newlines
  // We split by single newline \n to ensure that if the user puts a line break, it shows up.
  // This prevents "blob of text" issues in Cause/Location sections.
  const lines = safeContent.split('\n');
  return (
    <div className={`space-y-2 ${className}`}>
      {lines.map((line, idx) => {
        if (line.trim() === '') return null;
        return (
          <p key={idx} className="leading-relaxed">
            <InlineMarkdown text={line} />
          </p>
        );
      })}
    </div>
  );
};

// Helper to render inline bold/italics
const InlineMarkdown: React.FC<{ text: string }> = ({ text }) => {
  // Split by bold syntax (**text**)
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
        }
        // Handle italics inside normal text
        const italicParts = part.split(/(\*.*?\*)/g);
        return (
          <React.Fragment key={i}>
            {italicParts.map((subPart, j) => {
              if (subPart.startsWith('*') && subPart.endsWith('*')) {
                return <em key={j} className="italic">{subPart.slice(1, -1)}</em>;
              }
              return subPart;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};


const DetailSection: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  content: string | null | React.ReactNode; 
  fallbackText?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ title, icon, content, fallbackText = "Not applicable.", className = "", children }) => {
  
  const hasContent = content && content !== 'null' && content !== '';

  return (
    <section className={`mb-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 uppercase text-sm tracking-wide">
        <span className="text-slate-500 p-1.5 bg-slate-50 rounded-md">{icon}</span>
        {title}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Text Content */}
        <div className={`text-slate-600 leading-relaxed ${children ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
           {hasContent ? (
             <MarkdownRenderer content={content as string} />
           ) : (
             <span className="text-slate-400 italic">{fallbackText}</span>
           )}
        </div>
        
        {/* Right side content (Images) */}
        {children && (
          <div className="lg:col-span-1">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

const ImageGrid: React.FC<{ images: string[], altPrefix: string, isDark?: boolean }> = ({ images, altPrefix, isDark = false }) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
      {images.map((url, idx) => (
        <div key={idx} className={`aspect-[4/3] rounded-lg overflow-hidden border relative group shadow-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
            <img src={url} alt={`${altPrefix} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-1.5 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {altPrefix} Fig {idx + 1}
            </div>
        </div>
      ))}
    </div>
  );
}

const CardSection: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  children: string; 
}> = ({ title, icon, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="text-slate-400">{icon}</span> {title}
       </h3>
       <div className="flex-grow text-slate-700 font-medium leading-snug">
         <MarkdownRenderer content={children} />
       </div>
    </div>
  );
};

const PrevalenceItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-100 flex flex-col">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-sm font-semibold text-slate-700">{value}</span>
  </div>
);

// Generic Colored Box for special sections
const InfoBox: React.FC<{ 
  title: string; 
  content?: string; 
  icon: React.ReactNode; 
  bgColor: string; 
  borderColor: string; 
  textColor: string;
  iconColor: string;
}> = ({ title, content, icon, bgColor, borderColor, textColor, iconColor }) => {
  if (!content) return null;
  
  return (
    <section className={`p-6 rounded-xl border shadow-sm mb-8 ${bgColor} ${borderColor}`}>
      <h3 className={`text-lg font-bold flex items-center gap-2 mb-4 ${textColor}`}>
        <span className={`p-1.5 rounded-md bg-white/50 border border-white/50 ${iconColor}`}>
          {icon}
        </span>
        {title}
      </h3>
      <div className={`${textColor} opacity-90 font-medium`}>
         <MarkdownRenderer content={content} />
      </div>
    </section>
  );
};

export const LesionDetail: React.FC<LesionDetailProps> = ({ lesion, allLesions, onLinkClick }) => {
  const diagnosticPathways = [
    'Clinical', 'Radiographic', 'Historical', 'Laboratory', 
    'Microscopic', 'Surgical', 'Therapeutic'
  ];

  // Format chapter string (e.g., "Chapter 1" or "Chapters 1, 2")
  const chapterLabel = lesion.chapterIds.length > 1 
    ? `Chapters ${lesion.chapterIds.join(', ')}` 
    : `Chapter ${lesion.chapterIds[0]}`;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 min-h-full pb-20">
      
      {/* Header Section */}
      <header className="mb-8">
        {/* Breadcrumbs / Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 font-medium mb-3">
          <span className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-primary" />
            {chapterLabel}
          </span>
          {lesion.isAiGenerated && (
            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs border border-indigo-100 flex items-center gap-1">
              <Sparkles size={10} /> AI Generated
            </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{lesion.name}</h1>
        
        {/* Diagnostic Process & Prevalence Container */}
        <div className="space-y-6">
          
          {/* 1. Diagnostic Process Badges */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Diagnostic Process:</span>
            {diagnosticPathways.map(path => {
              const isActive = lesion.diagnosticProcess.some(p => p.toLowerCase() === path.toLowerCase());
              if (!isActive) return null; 
              return (
                <span 
                  key={path} 
                  className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1"
                >
                  <CheckCircle2 size={10} className="text-white/80" />
                  {path}
                </span>
              );
            })}
          </div>

          {/* 2. Prevalence Data */}
          <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <PrevalenceItem label="Age" value={lesion.prevalence.age} />
                <PrevalenceItem label="Gender" value={lesion.prevalence.gender} />
                <PrevalenceItem label="Race" value={lesion.prevalence.race} />
             </div>
          </div>

        </div>
      </header>

      {/* Primary Attributes (Cause & Location) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CardSection title="Etiology / Cause" icon={<HelpCircle size={18} />}>
          {lesion.cause}
        </CardSection>

        <CardSection title="Location" icon={<MapPin size={18} />}>
          {lesion.location}
        </CardSection>
      </div>

      {/* Clinical Features */}
      <DetailSection 
        title="Clinical Features" 
        icon={<Eye size={18} />} 
        content={lesion.clinicalFeatures}
        fallbackText="No significant clinical features are typically associated with this condition."
      >
         {lesion.clinicalImageUrls && lesion.clinicalImageUrls.length > 0 && (
            <div className="mt-4 lg:mt-0">
               <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Clinical Images</h4>
               <ImageGrid images={lesion.clinicalImageUrls} altPrefix="Clinical" />
            </div>
         )}
      </DetailSection>

      {/* Radiographic Features */}
      <DetailSection 
        title="Radiographic Features" 
        icon={<Activity size={18} />} 
        content={lesion.radiographicFeatures}
        fallbackText="No significant radiographic features are typically associated with this condition."
      >
          {lesion.radiographicImageUrls && lesion.radiographicImageUrls.length > 0 && (
              <div className="mt-4 lg:mt-0">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Radiographs</h4>
                  <ImageGrid images={lesion.radiographicImageUrls} altPrefix="Radiograph" isDark={true} />
              </div>
          )}
      </DetailSection>

      {/* Microscopic Features */}
      <DetailSection 
        title="Microscopic Features" 
        icon={<Microscope size={18} />} 
        content={lesion.histopathologicFeatures}
        fallbackText="No significant histopathologic features are typically associated with this condition."
      >
        {lesion.microscopicImageUrls && lesion.microscopicImageUrls.length > 0 && (
           <div className="mt-4 lg:mt-0">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Histopathology</h4>
              <ImageGrid images={lesion.microscopicImageUrls} altPrefix="Microscopic" />
           </div>
        )}
      </DetailSection>

      {/* Management & DDx Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Management */}
        <section className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 uppercase text-sm tracking-wide">
            <span className="text-slate-500 p-1.5 bg-slate-50 rounded-md"><Stethoscope size={18} /></span>
            Treatment & Prognosis
          </h3>
          <div className="text-slate-600 leading-relaxed">
             <MarkdownRenderer content={lesion.treatmentAndPrognosis || "No specific treatment required."} />
          </div>
        </section>

        {/* Differential Diagnosis */}
        <section className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 uppercase text-sm tracking-wide">
            <span className="text-slate-500 p-1.5 bg-slate-50 rounded-md"><AlertCircle size={18} /></span>
            Differential Diagnosis
          </h3>
          {lesion.differentialDiagnosis && lesion.differentialDiagnosis.length > 0 ? (
            <ul className="space-y-2">
              {lesion.differentialDiagnosis.map((ddx, index) => {
                const linkedLesion = allLesions.find(l => l.name.toLowerCase() === ddx.toLowerCase());
                
                return (
                  <li key={index} className="flex items-center justify-between group p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                    {linkedLesion ? (
                      <button 
                        onClick={() => onLinkClick(linkedLesion)}
                        className="text-primary font-semibold flex items-center gap-2 text-left w-full"
                      >
                        {ddx} 
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-slate-400" />
                      </button>
                    ) : (
                      <span className="text-slate-600 flex items-center gap-2">
                        {ddx}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-slate-400 italic">None listed</p>
          )}
        </section>
      </div>

      {/* --- NEW SECTIONS --- */}

      {/* Consequences (Red) */}
      <InfoBox 
        title={`Consequences of ${lesion.name}`}
        content={lesion.consequences}
        icon={<AlertTriangle size={20} />}
        bgColor="bg-red-50"
        borderColor="border-red-200"
        textColor="text-red-900"
        iconColor="text-red-500"
      />

      {/* Patient Education (Green) */}
      <InfoBox 
        title="Patient Education"
        content={lesion.patientEducation}
        icon={<UserCheck size={20} />}
        bgColor="bg-green-50"
        borderColor="border-green-200"
        textColor="text-green-900"
        iconColor="text-green-500"
      />

      {/* Clinical Pearls (Amber) */}
      <InfoBox 
        title="Clinical Pearls"
        content={lesion.clinicalPearls}
        icon={<Lightbulb size={20} />}
        bgColor="bg-amber-50"
        borderColor="border-amber-200"
        textColor="text-amber-900"
        iconColor="text-amber-500"
      />

      {/* Key Takeaway (Orange) */}
      <InfoBox 
        title="Key Takeaway"
        content={lesion.keyTakeaways}
        icon={<Key size={20} />}
        bgColor="bg-orange-50"
        borderColor="border-orange-200"
        textColor="text-orange-900"
        iconColor="text-orange-500"
      />

    </div>
  );
};
