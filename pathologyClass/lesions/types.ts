
export interface Chapter {
  id: number;
  title: string;
}

export interface Lesion {
  id: string;
  name: string;
  chapterIds: number[]; // Changed from chapterId to support multiple chapters
  
  // Visuals
  clinicalImageUrls: string[];
  radiographicImageUrls: string[];
  microscopicImageUrls: string[];

  // Epidemiology & Etiology
  cause: string;
  location: string;
  prevalence: {
    age: string;
    gender: string;
    race: string;
  };

  // Clinical Presentation
  clinicalFeatures: string;
  radiographicFeatures: string | null;
  
  // Pathology
  histopathologicFeatures: string; // "Microscopic"

  // Diagnosis & Management
  diagnosticProcess: string[]; // From the 7 types
  treatmentAndPrognosis: string;
  differentialDiagnosis?: string[];
  
  // Extra Info
  consequences?: string;       // Red section
  patientEducation?: string;   // Green section
  clinicalPearls?: string;     // Amber/Gold section
  keyTakeaways?: string;       // Orange section

  isAiGenerated?: boolean;
}

export type ViewMode = 'browse' | 'search';
