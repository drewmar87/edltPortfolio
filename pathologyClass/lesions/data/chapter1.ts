
import { Lesion } from '../types';

export const CHAPTER_1_LESIONS: Lesion[] = [
  {
    id: 'c1-01',
    name: 'Fordyce Granules',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Fordyce+Granules+Buccal+Mucosa',
      'https://placehold.co/600x400/e2e8f0/475569?text=Fordyce+Granules+Lip'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Fordyce+Granules+Histology'
    ],
    cause: 'Variant of normal (**ectopic sebaceous glands**).',
    location: 'Most common on the **buccal mucosa** and **vermilion of lips**.',
    prevalence: {
      age: 'Adults',
      gender: 'Equal',
      race: 'No racial predilection'
    },
    clinicalFeatures: '- Tiny, yellow papules in clusters\n- Ectopic sebaceous glands\n- **Asymptomatic**',
    radiographicFeatures: null,
    histopathologicFeatures: 'Normal sebaceous gland lobules located immediately beneath the epithelium.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: '- None required\n- **Asymptomatic** condition',
    differentialDiagnosis: ['Candida', 'Milia'],
    clinicalPearls: 'These are considered "ectopic" because sebaceous glands are normally found in the skin associated with hair follicles, but intraorally they are isolated. Over **80% of the adult population** has them.',
    consequences: 'None. This is a completely benign condition with no malignant potential.',
    patientEducation: 'Reassure the patient that these spots are **normal anatomy** and not a disease. They do not need to be removed.',
    keyTakeaways: 'Fordyce granules are simply **sebaceous glands** in the mouth. No treatment is ever needed.'
  },
  {
    id: 'c1-02',
    name: 'Torus Palatinus',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Torus+Palatinus+Clinical'
    ],
    radiographicImageUrls: [
      'https://placehold.co/600x400/1e293b/94a3b8?text=Torus+Palatinus+Occlusal+View'
    ],
    microscopicImageUrls: [],
    cause: 'Genetic. May enlarge due to environmental factors like occlusal forces.',
    location: 'Midline of the hard palate.',
    prevalence: {
      age: 'Develops after age 13',
      gender: 'Females > Males',
      race: 'Increased in Native Americans and Asians'
    },
    clinicalFeatures: 'Bony hard exophytic structure (nodular or lobulated). Overlying mucosa is thin and may ulcerate if traumatized.',
    radiographicFeatures: 'Radiopaque mass observed on occlusal films.',
    histopathologicFeatures: 'Dense compact lamellar bone.',
    diagnosticProcess: ['Clinical', 'Radiographic'],
    treatmentAndPrognosis: 'None, unless interference with speech, swallowing, or denture fabrication.',
    differentialDiagnosis: ['Palatal Abscess', 'Salivary Gland Tumor']
  },
  {
    id: 'c1-03',
    name: 'Mandibular Tori',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Mandibular+Tori+Clinical'
    ],
    radiographicImageUrls: [
      'https://placehold.co/600x400/1e293b/94a3b8?text=Mandibular+Tori+Radiograph'
    ],
    microscopicImageUrls: [],
    cause: 'Genetic. May enlarge due to occlusal forces/bruxism.',
    location: 'Lingual aspect of the mandible in the premolar area. Usually bilateral.',
    prevalence: {
      age: 'Develops after age 13',
      gender: 'Equal distribution',
      race: 'Higher in Asians and Inuit populations'
    },
    clinicalFeatures: 'Bony hard exophytic structures. Overlying mucosa is thin and easily ulcerated.',
    radiographicFeatures: 'Radiopacities superimposed on the roots of the premolars.',
    histopathologicFeatures: 'Dense compact bone.',
    diagnosticProcess: ['Clinical', 'Radiographic'],
    treatmentAndPrognosis: 'None, unless required for denture fabrication.',
    differentialDiagnosis: ['Exostosis', 'Osteoma']
  },
  {
    id: 'c1-04',
    name: 'Melanin Pigmentation',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Physiologic+Pigmentation'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Melanin+Histology'
    ],
    cause: 'Variant of normal (Physiologic Pigmentation). Increased prevalence with increased skin pigmentation.',
    location: 'Attached gingiva and other oral mucosa.',
    prevalence: {
      age: 'Any age',
      gender: 'Equal',
      race: 'Most prominent in dark-skinned individuals'
    },
    clinicalFeatures: 'Brown to gray-black diffuse or localized pigmentation. Color is constant and does not change.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Increased melanin pigment in the basal cell layer of the epithelium and subjacent connective tissue.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None. Biopsy may be needed if recent onset or change to rule out melanoma.',
    differentialDiagnosis: ['Smokers Melanosis', 'Addison Disease', 'Melanoma', 'Amalgam Tattoo']
  },
  {
    id: 'c1-05',
    name: 'Retrocuspid Papilla',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Retrocuspid+Papilla'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Retrocuspid+Papilla+Microscopic'
    ],
    cause: 'Developmental.',
    location: 'Lingual gingival margin of the mandibular cuspids (canines).',
    prevalence: {
      age: 'Children and young adults',
      gender: 'Equal',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Pink to red, small sessile papule (1-4mm). Usually bilateral.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Fibrous connective tissue with large stellate-shaped fibroblasts.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None. Usually regresses with age.',
    differentialDiagnosis: ['Fibroma', 'Papilloma']
  },
  {
    id: 'c1-06',
    name: 'Lingual Varicosities',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Lingual+Varicosities'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [],
    cause: 'Aging process (loss of connective tissue tone).',
    location: 'Ventral and lateral surfaces of the tongue.',
    prevalence: {
      age: 'Older adults (>60 years)',
      gender: 'Equal',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Red-to-purple enlarged, tortuous blood vessels (blebs). Blanch under pressure.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Dilated, thick-walled blood vessels (veins).',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None.',
    differentialDiagnosis: ['Hemangioma', 'Kaposi Sarcoma']
  },
  {
    id: 'c1-07',
    name: 'Linea Alba',
    chapterIds: [1, 2], // Defined in Ch1, also appears in Ch2
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Linea+Alba'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Hyperkeratosis'
    ],
    cause: 'Friction, clenching, or bruxing habit (pressure from teeth).',
    location: 'Buccal mucosa at the occlusal plane.',
    prevalence: {
      age: 'Adults',
      gender: 'Equal',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Horizontal anterior-posterior white line on the buccal mucosa, matching the occlusal plane.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Epithelial hyperplasia and hyperkeratosis (thickening of the keratin layer).',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None. Spontaneous regression if habit stops.',
    differentialDiagnosis: ['Lichen Planus', 'Cheek Biting (Morsicatio Buccarum)']
  },
  {
    id: 'c1-08',
    name: 'Leukoedema',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Leukoedema+Clinical'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Intracellular+Edema'
    ],
    cause: 'Unknown. Considered a variant of normal.',
    location: 'Buccal mucosa (usually bilateral).',
    prevalence: {
      age: 'Adults',
      gender: 'Equal',
      race: 'More common in Black individuals'
    },
    clinicalFeatures: 'Gray-white film diffusing throughout buccal mucosa giving an opalescent or milky quality. Disappears when the mucosa is stretched.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Intracellular edema of spinous cells and acanthosis of the epithelium.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None.',
    differentialDiagnosis: ['Leukoplakia', 'White Sponge Nevus']
  },
  {
    id: 'c1-09',
    name: 'Lingual Thyroid',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Lingual+Thyroid'
    ],
    radiographicImageUrls: [
      'https://placehold.co/600x400/1e293b/94a3b8?text=Iodine+Scan'
    ],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Thyroid+Follicles'
    ],
    cause: 'Developmental. Thyroid tissue fails to descend to the neck and remains entrapped.',
    location: 'Posterior dorsal tongue, between foramen cecum and epiglottis.',
    prevalence: {
      age: 'Any age (symptoms often at puberty/pregnancy)',
      gender: 'Females > Males (4:1)',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Exophytic nodular mass at the base of the tongue. Can cause dysphagia (difficulty swallowing), dysphonia, or dyspnea.',
    radiographicFeatures: 'Iodine thyroid scan shows accumulation of isotope in the tongue.',
    histopathologicFeatures: 'Normal thyroid tissue (follicles containing colloid).',
    diagnosticProcess: ['Clinical', 'Radiographic', 'Laboratory'],
    treatmentAndPrognosis: 'None if asymptomatic. Thyroid hormone suppression or surgery if obstructive. Risk of hypothyroidism if removed without checking for other thyroid tissue.',
    differentialDiagnosis: ['Thyroglossal Duct Cyst', 'Squamous Cell Carcinoma']
  },
  {
    id: 'c1-10',
    name: 'Median Rhomboid Glossitis',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Median+Rhomboid+Glossitis'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Fungal+Hyphae+PAS+Stain'
    ],
    cause: 'Unknown; strongly associated with chronic Candida albicans infection.',
    location: 'Midline of posterior dorsal tongue.',
    prevalence: {
      age: 'Adults (rare in children)',
      gender: 'Males > Females',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Flat or slightly raised erythematous (red), rectangular/rhomboid area anterior to the circumvallate papillae. Devoid of filiform papillae.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Epithelial hyperplasia (PEH). Biopsy or culture may show Candida organisms (hyphae).',
    diagnosticProcess: ['Clinical', 'Microscopic'],
    treatmentAndPrognosis: 'None if asymptomatic. Antifungals if burning/symptomatic.',
    differentialDiagnosis: ['Erythroplakia', 'Granular Cell Tumor']
  },
  {
    id: 'c1-11',
    name: 'Erythema Migrans',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Geographic+Tongue+1',
      'https://placehold.co/600x400/e2e8f0/475569?text=Geographic+Tongue+2'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Psoriasiform+Mucositis'
    ],
    cause: 'Unknown. Genetic factors. Associated with stress and psoriasis.',
    location: 'Dorsal and lateral borders of the tongue.',
    prevalence: {
      age: 'Adults',
      gender: 'Females > Males (2:1)',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Erythematous, depapillated patches surrounded by white/yellow borders. Lesions "migrate" or change pattern over time. Occasional burning with spicy foods.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Psoriasiform mucositis. Epithelial hyperplasia with collections of neutrophils (Munro abscesses) in the superficial spinous layer.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None. Avoid spicy foods if symptomatic. Corticosteroids for severe pain.',
    differentialDiagnosis: ['Candidiasis', 'Erythroplakia', 'Lichen Planus']
  },
  {
    id: 'c1-12',
    name: 'Ectopic Geographic Tongue',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Ectopic+Geographic+Tongue'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [],
    cause: 'Unknown. Same etiology as Erythema Migrans.',
    location: 'Mucosa other than the tongue (e.g., labial mucosa, buccal mucosa, soft palate).',
    prevalence: {
      age: 'Adults',
      gender: 'Females > Males',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Erythematous patches with yellow-white borders appearing on the mucosa. Appearance is identical to geographic tongue but in an unusual location.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Same as Erythema Migrans (Psoriasiform mucositis).',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None.',
    differentialDiagnosis: ['Candidiasis', 'Lupus Erythematosus']
  },
  {
    id: 'c1-13',
    name: 'Fissured Tongue',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Fissured+Tongue'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [],
    cause: 'Unknown. Strong genetic component. Associated with aging.',
    location: 'Dorsal tongue.',
    prevalence: {
      age: 'Prevalence increases with age',
      gender: 'Males > Females',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Deep fissures or grooves on the dorsal surface. Strongly associated with Geographic Tongue.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Hyperplasia of rete ridges and loss of keratin hairs on filiform papillae.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'None. Gently brush tongue to keep fissures clean.',
    differentialDiagnosis: ['Melkersson-Rosenthal Syndrome']
  },
  {
    id: 'c1-14',
    name: 'White Hairy Tongue',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=White+Hairy+Tongue'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [
      'https://placehold.co/600x400/f1f5f9/334155?text=Elongated+Papillae'
    ],
    cause: 'Hypertrophy of filiform papillae and retardation of normal desquamation. Associated with smoking, peroxide rinses, alcohol, antibiotics.',
    location: 'Dorsal mid-posterior tongue.',
    prevalence: {
      age: 'Adults',
      gender: 'Males > Females (due to habits)',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Elongated filiform papillae appearing white due to keratin accumulation. Can cause gagging or bad taste.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Marked elongation and hyperkeratosis of filiform papillae. Bacteria often seen on surface.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'Eliminate predisposing factors. Gently brush tongue (tongue scraper) without toothpaste.',
    differentialDiagnosis: ['Hairy Leukoplakia', 'Candidiasis']
  },
  {
    id: 'c1-15',
    name: 'Black Hairy Tongue',
    chapterIds: [1],
    clinicalImageUrls: [
      'https://placehold.co/600x400/e2e8f0/475569?text=Black+Hairy+Tongue'
    ],
    radiographicImageUrls: [],
    microscopicImageUrls: [],
    cause: 'Same as White Hairy Tongue, plus chromogenic bacteria, tobacco, or food staining.',
    location: 'Dorsal mid-posterior tongue.',
    prevalence: {
      age: 'Adults',
      gender: 'Males > Females',
      race: 'No racial predilection'
    },
    clinicalFeatures: 'Elongated filiform papillae appearing brown or black. Can be frightening to the patient but is harmless.',
    radiographicFeatures: null,
    histopathologicFeatures: 'Elongated papillae with heavy bacterial colonization.',
    diagnosticProcess: ['Clinical'],
    treatmentAndPrognosis: 'Eliminate predisposing factors (smoking). Gently brush/scrape tongue.',
    differentialDiagnosis: ['Pigmented Fungiform Papillae', 'Bismuth Staining']
  }
];
