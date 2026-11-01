import type { Project } from '../types';

const columns = ['Method', 'AUC-ROC', 'Pairwise Acc. (%)', 'Top-10 (%)', 'Top-50 (%)', 'MRR'];
const rows = (values: string[][]) => values.map(cells => ({ cells, highlight: /^(TADA|Multi-scale|Multi\+EGR)/.test(cells[0]) }));
const source = 'Source-participant retrieval';
const heldOut = 'Held-out cross-subject retrieval';

export const tadaResults: Project['resultTables'] = [
  {
    title: 'Table I — Comparison with alignment baselines',
    description: 'TADA achieves the highest mean performance across all five metrics in both settings. Held-out AUC-ROC improves by 0.0470 over SRM-CNN.',
    columns,
    groups: [
      { label: source, rows: rows([
        ['PCA', '0.6236 ± 0.0076', '61.10 ± 0.73', '4.25 ± 0.24', '18.03 ± 0.73', '0.0245 ± 0.0012'],
        ['PCA+HA', '0.6503 ± 0.0091', '63.00 ± 0.96', '4.74 ± 0.20', '19.63 ± 0.63', '0.0271 ± 0.0012'],
        ['SRM-CNN', '0.6797 ± 0.0059', '66.03 ± 0.52', '5.39 ± 0.25', '24.22 ± 0.66', '0.0286 ± 0.0011'],
        ['TADA (Ours)', '0.7253 ± 0.0059', '70.93 ± 0.57', '7.24 ± 0.35', '26.06 ± 0.70', '0.0366 ± 0.0016'],
      ]) },
      { label: heldOut, rows: rows([
        ['PCA', '0.5526 ± 0.0357', '55.11 ± 3.23', '2.63 ± 0.70', '12.69 ± 2.45', '0.0176 ± 0.0032'],
        ['PCA+HA', '0.6248 ± 0.0506', '60.87 ± 5.16', '3.74 ± 1.17', '17.32 ± 4.46', '0.0227 ± 0.0054'],
        ['SRM-CNN', '0.6737 ± 0.0361', '65.35 ± 3.19', '5.23 ± 1.01', '23.28 ± 3.05', '0.0278 ± 0.0042'],
        ['TADA (Ours)', '0.7207 ± 0.0357', '70.44 ± 3.46', '6.86 ± 1.85', '25.35 ± 3.88', '0.0352 ± 0.0070'],
      ]) },
    ],
  },
  {
    title: 'Table II — Temporal window ablation',
    description: 'Multi-scale fusion achieves the highest mean scores. Long-only and multi-scale decoding outperform medium-only in held-out AUC-ROC (both Holm-corrected p = 0.0234).',
    columns,
    groups: [
      { label: source, rows: rows([
        ['Short-only', '0.6464 ± 0.0077', '62.84 ± 0.73', '4.56 ± 0.21', '19.87 ± 0.87', '0.0263 ± 0.0012'],
        ['Medium-only', '0.6927 ± 0.0090', '67.35 ± 0.80', '6.06 ± 0.39', '23.99 ± 1.01', '0.0324 ± 0.0017'],
        ['Long-only', '0.7145 ± 0.0061', '69.18 ± 0.61', '6.42 ± 0.34', '24.28 ± 0.76', '0.0331 ± 0.0013'],
        ['Multi-scale', '0.7166 ± 0.0069', '69.54 ± 0.68', '6.71 ± 0.41', '24.91 ± 0.91', '0.0346 ± 0.0018'],
      ]) },
      { label: heldOut, rows: rows([
        ['Short-only', '0.6389 ± 0.0298', '62.02 ± 3.11', '4.33 ± 0.99', '19.01 ± 2.87', '0.0248 ± 0.0043'],
        ['Medium-only', '0.6865 ± 0.0362', '66.70 ± 3.57', '5.75 ± 1.45', '23.13 ± 3.97', '0.0309 ± 0.0065'],
        ['Long-only', '0.7069 ± 0.0357', '68.60 ± 3.49', '6.13 ± 1.51', '23.70 ± 4.12', '0.0316 ± 0.0061'],
        ['Multi-scale', '0.7108 ± 0.0343', '68.87 ± 3.22', '6.33 ± 1.49', '23.93 ± 3.70', '0.0333 ± 0.0062'],
      ]) },
    ],
  },
  {
    title: 'Table III — Effect of reciprocal re-ranking',
    description: 'EGR improves held-out AUC-ROC in all eight participants with the multi-scale decoder frozen (paired sign-flip test, p = 0.0078).',
    columns,
    groups: [
      { label: source, rows: rows([
        ['Multi-scale', '0.7166 ± 0.0069', '69.54 ± 0.68', '6.71 ± 0.41', '24.91 ± 0.91', '0.0346 ± 0.0018'],
        ['Multi+EGR (Ours)', '0.7253 ± 0.0059', '70.93 ± 0.57', '7.24 ± 0.35', '26.06 ± 0.70', '0.0366 ± 0.0016'],
      ]) },
      { label: heldOut, rows: rows([
        ['Multi-scale', '0.7108 ± 0.0343', '68.87 ± 3.22', '6.33 ± 1.49', '23.93 ± 3.70', '0.0333 ± 0.0062'],
        ['Multi+EGR (Ours)', '0.7207 ± 0.0357', '70.44 ± 3.46', '6.86 ± 1.85', '25.35 ± 3.88', '0.0352 ± 0.0070'],
      ]) },
    ],
  },
];
