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
  relatedPublication: { title: string; venue: string } | null;
  stack: string[];
  image: { src: string; alt: string; caption?: string } | null;
}
export interface Award { date: string; title: string; organization: string; detail: string | null }
export interface TimelineEntry { title: string; description: string; date: string }
export interface PortfolioData {
  researchInterests: { title: string; description: string }[];
  publications: Publication[]; presentations: Presentation[]; projects: Project[];
  awards: Award[]; education: TimelineEntry[]; experience: TimelineEntry[];
}
