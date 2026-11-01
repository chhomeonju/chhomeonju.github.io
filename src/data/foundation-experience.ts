import type { Project } from '../types';
import { blpmResults } from './blpm-results';

const paper = { title: 'Continuous Latent Predictive Modeling with Predictive Semantic Alignment for EEG-Language Foundation Models', venue: 'arXiv:2608.11656', url: 'https://arxiv.org/abs/2608.11656' };

export const blpmExperience: Pick<Project, 'datasetExperience' | 'experimentalExperience' | 'experimentalExperienceLabel' | 'relatedPublication' | 'resultTables' | 'resultsNote' | 'relatedExperience'> = {
  relatedPublication: paper,
  relatedExperience: { label: 'CELP — Stage 1 latent predictive pretraining →', href: 'projects/celp.html' },
  datasetExperience: [
    {
      title: 'Seven downstream datasets',
      description: 'Clinical, sleep, internal-state, and motor imagery tasks. TUEG-based encoder pretraining is covered on the CELP page.',
      datasets: [
        { name: 'COG-BCI', task: 'Mental workload · 3 classes' },
        { name: 'Mental Arithmetic', task: 'Resting vs. mental arithmetic · 2 classes' },
        { name: 'TUAB', task: 'Normal vs. abnormal EEG · 2 classes' },
        { name: 'TUEV', task: 'EEG event types · 6 classes' },
        { name: 'PhysioNet-MI', task: 'Motor imagery · 4 classes' },
        { name: 'FACED', task: 'Emotion recognition · 9 classes' },
        { name: 'HMC', task: 'Sleep staging · 5 classes' },
      ],
    },
  ],
  experimentalExperienceLabel: 'Evaluation & analysis',
  experimentalExperience: [
    { title: 'Evaluation protocol', description: 'NeuralSet / NeuralBench pipelines with subject-level partitions, dataset-specific preprocessing, and validation-selected checkpoints. Reported comparisons use five independent runs.' },
    { title: 'Comparison setting', description: 'BLPM uses one jointly tuned model for all seven tasks. EEGNet, EEGConformer, and CTNet are trained per dataset; BIOT, LaBraM, CBraMod, REVE, and LUNA are fine-tuned separately with task-specific heads.' },
    { title: 'Component evidence', description: 'Ablations isolate the pretraining objective, PSA, answer prediction target, label semantics, and query mechanism. Removing PSA lowers FACED balanced accuracy by 6.91 percentage points.' },
    { title: 'Held-out class analysis', description: 'Zero-shot prediction of excluded label semantics remains limited. Class-balanced adaptation with 2, 4, or 8 labeled examples per class improves performance; this evaluates unseen classes rather than unseen tasks.' },
  ],
  resultsNote: 'Balanced accuracy (%). Main comparison: mean ± standard deviation over five independent runs. The paper reports ablations as point estimates without standard deviations.',
  resultTables: blpmResults,
};

export const celpExperience: Pick<Project, 'relatedPublication' | 'relatedExperience' | 'datasetExperience' | 'experimentalExperience'> = {
  relatedPublication: paper,
  datasetExperience: [
    {
      title: 'Stage 1 pretraining corpus',
      description: 'CELP is pretrained on large-scale unlabeled continuous EEG. The primary corpus is TUEG (Temple University EEG), one of the largest publicly available clinical EEG datasets, providing diverse recording conditions, electrode configurations, and subject variability for robust self-supervised learning.',
      source: { label: 'TUEG · Temple University EEG Corpus', href: 'https://isip.piconepress.com/projects/tuh_eeg/' },
      datasets: [
        { name: 'TUEG', task: 'Self-supervised latent predictive pretraining (Stage 1)' },
      ],
    },
  ],
  experimentalExperience: [
    { title: 'Structured multi-block masking', description: 'Temporal-span masks (contiguous time blocks) and channel-block masks (full electrode groups) applied jointly over the C × P channel-time token grid to expose both temporal continuity and spatial channel dependencies.' },
    { title: 'Dual-branch patch embedding', description: 'Each EEG token passes through a temporal branch (1D conv) and a spectral branch (FFT magnitude projection) independently; outputs are fused additively before depthwise convolutional positional encoding.' },
    { title: 'EMA target encoder', description: 'Target encoder parameters are updated via exponential moving average of the online encoder at each step, providing stable and slowly-evolving latent prediction targets and preventing representation collapse.' },
    { title: 'Latent predictive loss', description: 'Smooth L1 loss between the embedding predictor output and layer-normalised target encoder representations — defined entirely in latent space, with no input-space reconstruction component.' },
    { title: 'Training environment', description: 'Python / PyTorch on four NVIDIA RTX 3090 GPUs.' },
  ],
  relatedExperience: { label: 'Downstream datasets and evaluation experience (Stages 2 & 3) → BLPM study', href: 'projects/blpm.html#datasets' },
};
