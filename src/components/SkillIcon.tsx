import { Cpu, Database, Layers, Network, BarChart2, type LucideIcon } from 'lucide-react';

const brands: Record<string, string> = {
  Python: 'python', C: 'c', PyTorch: 'pytorch', TensorFlow: 'tensorflow',
  'Scikit-learn': 'scikitlearn', 'Hugging Face': 'huggingface',
  CUDA: 'nvidia', MySQL: 'mysql', 'Weights & Biases': 'weightsandbiases',
  Git: 'git', Linux: 'linux', Docker: 'docker', Conda: 'anaconda', LaTeX: 'latex',
  MATLAB: 'matlab', Bash: 'gnubash',
};
const symbols: Record<string, LucideIcon> = {
  SQL: Database, PEFT: Layers,
  'Multi-GPU Training': Cpu, 'Distributed Training': Network, LMDB: Database,
  TensorBoard: BarChart2,
};

export function SkillIcon({ skill }: { skill: string }) {
  if (skill === 'EEGLAB') return <span className="skill-icon eeglab-icon" aria-hidden="true"><img src="/assets/icons/eeglab.jpg" alt="" /></span>;
  const neuroLogos: Record<string, string> = { 'MNE-Python': 'mne-python.svg', SPM: 'spm.png', fMRIPrep: 'fmriprep.svg' };
  if (neuroLogos[skill]) return <img className={`skill-icon neuro-logo${skill === 'fMRIPrep' ? '' : ' neuro-wordmark'}`} src={`/assets/icons/${neuroLogos[skill]}`} alt="" aria-hidden="true" width={44} height={26} />;
  if (brands[skill]) return <img className="skill-icon" src={`/assets/icons/${brands[skill]}.svg`} alt="" aria-hidden="true" width={22} height={22} />;
  const Icon = symbols[skill] ?? Layers;
  return <Icon className="skill-icon skill-symbol" size={22} strokeWidth={1.7} aria-hidden="true" />;
}
