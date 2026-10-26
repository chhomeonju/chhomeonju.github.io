import { Activity, Brain, BrainCircuit, ChartSpline, Cpu, Database, Layers, Network, Workflow, Zap, type LucideIcon } from 'lucide-react';

const brands: Record<string, string> = {
  Python: 'python', C: 'c', PyTorch: 'pytorch', TensorFlow: 'tensorflow',
  'Scikit-learn': 'scikitlearn', 'Hugging Face Transformers': 'huggingface',
  CUDA: 'nvidia', MySQL: 'mysql', 'Weights & Biases': 'weightsandbiases',
  Git: 'git', Linux: 'linux', Docker: 'docker', Conda: 'anaconda', LaTeX: 'latex',
};
const symbols: Record<string, LucideIcon> = {
  MATLAB: ChartSpline, SQL: Database, PEFT: Layers, Accelerate: Zap,
  'MNE-Python': BrainCircuit, EEGLAB: Activity, SPM: Brain, fMRIPrep: Workflow,
  'Multi-GPU Training': Cpu, 'Distributed Training': Network, LMDB: Database,
};

export function SkillIcon({ skill }: { skill: string }) {
  if (brands[skill]) return <img className="skill-icon" src={`assets/icons/${brands[skill]}.svg`} alt="" aria-hidden="true" width={22} height={22} />;
  const Icon = symbols[skill] ?? Layers;
  return <Icon className="skill-icon skill-symbol" size={22} strokeWidth={1.7} aria-hidden="true" />;
}
