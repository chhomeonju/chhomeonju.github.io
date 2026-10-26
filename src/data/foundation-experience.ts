import type { Project } from '../types';

const paper = { title: 'Continuous-Latent Predictive Modeling with Semantic Alignment for EEG-Language Foundation Models', venue: 'arXiv:2608.11656', url: 'https://arxiv.org/abs/2608.11656' };

export const blpmExperience: Pick<Project, 'datasetExperience' | 'experimentalExperience' | 'relatedPublication' | 'studyFindings'> = {
  relatedPublication: paper,
  studyFindings: {
    highlights: [
      'Highest balanced accuracy among compared models on 6 of 7 datasets (Table 1).',
      'FACED: 34.3 ± 0.6%; +2.3 percentage points over REVE.',
      'PhysioNet-MI: second at 68.2 ± 0.7%; REVE reaches 69.4 ± 0.9%.',
      'Removing semantic alignment lowers FACED balanced accuracy by 6.91 points (Table 3).',
    ],
    scope: 'Five-run mean ± standard deviation. BLPM uses multi-task training; baselines are adapted per dataset. These results do not establish zero-shot transfer to unseen tasks.',
    source: { label: 'Evidence · Tables 1 & 3', href: 'https://arxiv.org/html/2608.11656#S5' },
  },
  datasetExperience: [
    {
      title: 'BLPM study', description: 'Pretraining and evaluation datasets used in my EEG–language foundation model study.',
      source: { label: 'BLPM · Experimental Setup & Appendix B', href: 'https://arxiv.org/pdf/2608.11656' },
      datasets: [
        { name: 'TUEG', task: 'Self-supervised pretraining' },
        { name: 'COG-BCI', task: 'Mental workload classification' },
        { name: 'Mental Arithmetic', task: 'Mental stress detection' },
        { name: 'TUAB', task: 'Abnormal EEG detection' },
        { name: 'TUEV', task: 'EEG event classification' },
        { name: 'PhysioNet-MI', task: 'Motor imagery classification' },
        { name: 'FACED', task: 'Emotion recognition' },
        { name: 'HMC', task: 'Sleep staging' },
      ],
    },
    {
      title: 'Additional EEG dataset experience', description: 'Other datasets I have worked with from the CBraMod benchmark suite.',
      source: { label: 'CBraMod · Table 1', href: 'https://arxiv.org/pdf/2412.07236' },
      datasets: [
        { name: 'SEED-V', task: 'Emotion recognition' },
        { name: 'SHU-MI', task: 'Motor imagery classification' },
        { name: 'ISRUC', task: 'Sleep staging' },
        { name: 'CHB-MIT', task: 'Seizure detection' },
        { name: 'BCIC2020-3', task: 'Imagined speech classification' },
        { name: 'Mumtaz2016', task: 'Mental disorder diagnosis' },
        { name: 'SEED-VIG', task: 'Vigilance estimation' },
      ],
    },
  ],
  experimentalExperience: [
    { title: 'Pretraining & alignment', description: 'TUEG-based latent prediction, semantic alignment, and multi-task LoRA tuning.' },
    { title: 'Evaluation pipeline', description: 'NeuralSet / NeuralBench, subject-level splits, and validation-selected checkpoints.' },
    { title: 'Model comparison', description: 'EEGNet, EEGConformer, BIOT, LaBraM, CBraMod, REVE, and LUNA.' },
    { title: 'Repeated evaluation', description: 'Five-seed runs; balanced accuracy, Cohen’s κ, weighted F1, AUPRC, and AUROC.' },
    { title: 'Analysis', description: 'Component ablations and t-SNE of latent and semantic representations.' },
    { title: 'Training environment', description: 'Python / PyTorch on four NVIDIA RTX 3090 GPUs.' },
  ],
};

export const celpExperience: Pick<Project, 'relatedPublication' | 'relatedExperience'> = {
  relatedPublication: paper,
  relatedExperience: { label: 'See datasets and experimental experience in the BLPM study →', href: 'projects/blpm.html#datasets' },
};
