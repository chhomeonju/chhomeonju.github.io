import type { Project } from '../types';

export const blpmResults: Project['resultTables'] = [
  {
    title: 'Seven-task performance',
    description: 'One jointly tuned BLPM model leads on six datasets; REVE leads on PhysioNet-MI. Each baseline is trained or fine-tuned separately per dataset.',
    columns: ['Dataset', 'Strongest baseline', 'BLPM'],
    groups: [{ label: 'Balanced accuracy (%) · mean ± standard deviation', rows: [
      { cells: ['COG-BCI', 'REVE · 67.4 ± 0.8', '69.1 ± 1.4'] },
      { cells: ['Mental Arithmetic', 'REVE · 73.3 ± 3.8', '75.4 ± 2.1'] },
      { cells: ['TUAB', 'CBraMod · 80.9 ± 0.3', '82.3 ± 0.2'] },
      { cells: ['TUEV', 'REVE · 55.3 ± 3.5', '57.2 ± 1.1'] },
      { cells: ['PhysioNet-MI', 'REVE · 69.4 ± 0.9', '68.2 ± 0.7'] },
      { cells: ['FACED', 'REVE · 32.0 ± 1.2', '34.3 ± 0.6'] },
      { cells: ['HMC', 'REVE · 76.5 ± 0.8', '77.1 ± 0.6'] },
    ] }],
  },
  {
    title: 'Key component ablations',
    description: 'Removing PSA causes the largest drop (up to 6.91 percentage points). Autoregressive answer-token prediction also underperforms continuous answer embedding prediction.',
    columns: ['Configuration', 'TUEV', 'FACED', 'HMC'],
    groups: [{ label: 'Balanced accuracy (%) · Table 3 point estimates', rows: [
      { cells: ['Without PSA', '52.02', '27.38', '72.17'] },
      { cells: ['Autoregressive answer tokens', '55.27', '32.92', '75.96'] },
      { cells: ['Full BLPM', '57.18', '34.29', '77.10'], highlight: true },
    ] }],
  },
];