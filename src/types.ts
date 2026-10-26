export interface ResourceLink { label: string; href: string }
export interface Publication {
  title: string; authors: string; venue: string;
  image: string | null; imageAlt: string | null; links: ResourceLink[];
}
export interface Presentation {
  status: string; title: string; authors: string; venue: string; location: string;
}
export interface Project {
  id: string; category: string; name: string; subtitle: string; date: string;
  teaser: string; tags: string[]; goal: string; contributionLabel: string;
  contributions: string[]; steps: string[]; code: string | null;
  relatedPublication: { title: string; venue: string; url?: string } | null;
  datasetExperience?: {
    title: string; description: string; source: ResourceLink;
    datasets: { name: string; task: string }[];
  }[];
  experimentalExperience?: { title: string; description: string }[];
  relatedExperience?: ResourceLink;
  studyFindings?: { highlights: string[]; scope: string; source: ResourceLink };
  stack: string[];
  image: { src: string; alt: string; caption?: string } | null;
}
export interface Award { date: string; title: string; organization: string; detail: string | null }
export interface TimelineEntry { title: string; description: string; date: string }
export type NewsCategory = 'Paper' | 'Award' | 'Career' | 'Education' | 'Activity';
export interface NewsItem { date: string; category: NewsCategory; title: string; detail?: string; }
export interface Competency { title: string; description: string; methods: string[]; }
export interface FutureDirection { label: string; title: string; description: string; tags: string[]; }
export interface PortfolioData {
  researchInterests: { title: string; description: string; raisedQuestion?: string }[];
  futureDirections: FutureDirection[];
  technicalSkills: { category: string; skills: string[] }[];
  activities: { title: string; role: string; date: string | null; description: string }[];
  patents: { title: string; inventors: string[]; date: string; number: string; status: string }[];
  publications: Publication[]; presentations: Presentation[]; projects: Project[];
  awards: Award[]; education: TimelineEntry[]; experience: TimelineEntry[];
  news: NewsItem[];
  competencies: Competency[];
}
