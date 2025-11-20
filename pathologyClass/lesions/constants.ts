import { Chapter, Lesion } from './types';
import { CHAPTER_1_LESIONS } from './data/chapter1';
import { CHAPTER_2_LESIONS } from './data/chapter2';
import { CHAPTER_3_LESIONS } from './data/chapter3';

export const CHAPTERS: Chapter[] = [
  { id: 1, title: "1. Introduction to Preliminary Diagnosis of Oral Lesions" },
  { id: 2, title: "2. Inflammation and Repair" },
  { id: 3, title: "3. Immunity and Immunologic Oral Lesions" },
  { id: 4, title: "4. Infectious Diseases" },
  { id: 5, title: "5. Developmental Disorders" },
  { id: 6, title: "6. Genetics" },
  { id: 7, title: "7. Neoplasia" },
  { id: 8, title: "8. Nonneoplastic Diseases of Bone" },
  { id: 9, title: "9. Oral Manifestations of Systemic Diseases" },
  { id: 10, title: "10. Orofacial Pain and Temporomandibular Disorders" },
];

export const INITIAL_LESIONS: Lesion[] = [
  ...CHAPTER_1_LESIONS,
  ...CHAPTER_2_LESIONS,
  ...CHAPTER_3_LESIONS,
];
