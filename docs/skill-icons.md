# Skill icons

Brand SVG paths come from Simple Icons (CC0): https://simpleicons.org/.
Generic functional symbols come from Lucide (ISC): https://lucide.dev/.
License notices are included in public/assets/icons/ and are copied into the deployed site.

Regenerate the selected brand assets with `node scripts/generate-skill-icons.mjs`.
Some bright colors are darkened slightly for visibility on white. CUDA uses NVIDIA's
mark and Conda uses Anaconda's mark. Functional symbols identify the remaining tools;
they are not presented as official product logos.

## Neuroimaging tools

- MNE-Python: https://mne.tools/stable/_static/mne_logo_small.svg
- EEGLAB: https://github.com/sccn/eeglab/blob/develop/functions/supportfiles/EEGLAB_compile_splash.jpg (official splash image; CSS displays its scalp-map/head detail).
- SPM: https://github.com/spm/spm-docs/blob/main/docs/assets/images/spm_logo_black.png
- fMRIPrep: https://github.com/nipreps/identity/blob/main/nipreps-general/nipreps-logo.svg (the official NiPreps project symbol, rather than a dedicated fMRIPrep wordmark).

The downloaded originals retain their colors and aspect ratios. These four entries supersede the generic Lucide symbols previously used for neuroimaging tools.
