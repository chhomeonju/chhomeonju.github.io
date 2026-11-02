import type { PortfolioData } from '../types';
import { blpmExperience, celpExperience } from './foundation-experience';
import { tadaResults } from './tada-results';

export const portfolio: PortfolioData = {
  activities: [
    { title: 'AI Model Study · PRML Lab', role: 'Peer Study', date: 'Jan. 2026 – Feb. 2026', description: 'Studied AI models through a peer study group at the Pattern Recognition and Machine Learning (PRML) Lab, Korea University.' },
    { title: 'AI Model Study · PRML Lab', role: 'Peer Study', date: 'Aug. 2025', description: 'Studied AI models through a peer study group at the Pattern Recognition and Machine Learning (PRML) Lab, Korea University.' },
    { title: 'LG Aimers · 7th Cohort', role: 'Participant', date: 'Jul. 2025 – Aug. 2025', description: 'Developed a demand forecasting model for food and beverage outlets using operational and sales data.', url: 'https://www.lgaimers.ai/' },
    { title: 'AI Study Group', role: 'Peer Study', date: 'Mar. 2025 – Jun. 2025', description: 'Studied artificial intelligence through a peer study group.' },
    { title: 'Administrative Assistant · Department Office', role: 'Administrative Assistant', date: 'Sep. 2024 – Feb. 2025', description: 'Assisted with departmental administrative tasks and office operations at the Department of Computer Engineering and Artificial Intelligence, Pukyong National University.' },
    { title: 'MATLAB for Neuroscience Study Group', role: 'Peer Study', date: 'Jan. 2024 – Feb. 2024', description: 'Studied MATLAB for Neuroscience through a peer reading group.' },
    { title: 'Neuroscience Study Group', role: 'Peer Study', date: 'Jul. 2023 – Aug. 2023', description: 'Studied neuroscience through a peer study group.' },
    { title: 'Journal Club · BXAI Lab', role: 'Undergraduate Researcher', date: 'Apr. 2023 – Jan. 2025', description: 'Participated in a weekly journal club, reading and discussing research papers in neuroscience and AI at BXAI Lab, Pukyong National University.' },
    { title: 'WAP (Why Are You Programming?) · Programming Club', role: 'Member', date: 'Sep. 2021 – Aug. 2022', description: 'Worked as a web developer on team projects, developing a library book lending platform and a community-based item-sharing web service.', url: 'https://github.com/pknu-wap' },
  ],
  patents: [
    {
      title: 'Apparatus and Method for Learning Universal Electroencephalogram Representations Based on Functional Connectivity Reconstruction',
      inventors: ['Seong-Whan Lee', 'Myeong-Ju Cho', 'Hana Jo', 'and Seo-Hyun Lee'],
      date: 'Jan. 2026', number: '10-2026-0018395', status: 'Korean Patent Application · Filed',
    },
  ],
  technicalSkills: [
    { category: 'Programming Languages', skills: ['Python', 'MATLAB', 'C', 'SQL', 'Bash'] },
    { category: 'Deep Learning Frameworks & Libraries', skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face'] },
    { category: 'Neuroimaging & Signal Processing', skills: ['MNE-Python', 'EEGLAB', 'SPM', 'fMRIPrep'] },
    { category: 'GPU Computing & Distributed Training', skills: ['CUDA', 'Multi-GPU Training', 'Distributed Training'] },
    { category: 'Data Management & Experiment Tracking', skills: ['MySQL', 'LMDB', 'Weights & Biases', 'TensorBoard'] },
    { category: 'Development & Research Tools', skills: ['Git', 'Linux', 'Docker', 'LaTeX'] },
  ],
  researchInterests: [
    {
      title: 'Neural Encoding & Decoding',
      description: 'Exploring how cognitive information is represented in neural activity and decoded using deep learning across neuroimaging modalities, such as EEG, MEG, ECoG, and fMRI.',
    },
    {
      title: 'Brain Dynamics & Network Neuroscience',
      description: 'Characterizing dynamic functional connectivity, latent brain states, and network reconfiguration to understand the temporal organization and interactions of distributed brain networks.',
    },
    {
      title: 'Neural Mechanisms & Neuromodulation',
      description: 'Investigating how neural activity and brain network interactions support cognition, emotion, and behavior, and how neuromodulation influences brain dynamics and mental health.',
    },
    {
      title: 'Computational Modeling & Foundation Models',
      description: 'Leveraging computational approaches, including deep learning, large language models, and multimodal foundation models, to model neural representations, predict brain responses, and uncover the mechanisms underlying human brain function.',
    },
  ],
  futureDirections: [
    {
      label: 'A',
      title: 'Decoding Human Cognition',
      description: 'Developing generalizable neural representation models that decode cognitive information across subjects, tasks, and recording modalities — connecting EEG, ECoG, and fMRI toward a unified framework for brain–language alignment.',
      tags: ['Neural Decoding', 'Foundation Models', 'Cross-modal Alignment', 'fMRI'],
    },
    {
      label: 'B',
      title: 'Understanding Human Cognition & Behavior',
      description: 'Investigating how distributed neural dynamics, functional connectivity, and individual variability shape human perception and cognition — moving from decoding models toward mechanistic understanding of what the brain is actually computing.',
      tags: ['Neural Dynamics', 'Functional Connectivity', 'Individual Variability', 'Computational Neuroscience'],
    },
  ],
  "publications": [
    {
      "title": "Multi-Scale Temporal Fusion Network with Encoding-Guided Reciprocal Re-ranking for ECoG-to-Text Semantic Decoding",
      "authors": "M.-J. Cho, S.-H. Lee, and S.-W. Lee†",
      "venue": "IEEE BCI 2027 · Planned submission",
      "image": "/assets/images/tada-framework.webp",
      "imageAlt": "TADA framework: multi-scale temporal decoder and encoding-guided reciprocal re-ranking for ECoG-to-text decoding",
      "links": [
        {
          "label": "Code ↗",
          "href": "https://github.com/Myeongjuuu/TADA"
        }
      ]
    },
    {
      "title": "Continuous Latent Predictive Modeling with Predictive Semantic Alignment for EEG-Language Foundation Models",
      "authors": "M.-J. Cho, H.-B. Shin, S.-H. Lee, and S.-W. Lee†",
      "venue": "ARR 2027 · Preprint · Submitted",
      "image": "/assets/images/continuous-latent-framework.png",
      "imageAlt": "Continuous Latent Predictive Modeling 논문의 EEG 사전학습 및 예측 의미 정렬 구조도",
      "links": []
    },
    {
      "title": "Classification of Non-Invasive EEG Signals During Motor Imagery Tasks Using a Large Language Model",
      "authors": "D.-H. Lim*, M.-J. Cho*, and H.-H. Kim†",
      "venue": "IEEE CW 2024 · Published",
      "image": "/assets/images/ieee-cw-2024-framework.png",
      "imageAlt": "IEEE CW 2024 논문의 EEG 특징 추출 및 LLM 분류 구조도",
      "links": [
        {
          "label": "Code ↗",
          "href": "https://github.com/Myeongjuuu/EEG-LLM"
        }
      ]
    }
  ],
  "presentations": [
    {
      "status": "Poster · Oct. 2024",
      "title": "Classification of Non-Invasive EEG Signals During Motor Imagery Tasks Using a Large Language Model",
      "authors": "M.-J. Cho and H.-H. Kim",
      "venue": "International Conference on Cyberworlds (CW 2024)",
      "location": "Kofu, Japan"
    },
    {
      "status": "Poster · Nov. 2023",
      "title": "Decoding electroencephalographic signals for inner speech words in brain-computer interface using echo state networks",
      "authors": "D.-H. Lim, M.-J. Cho, H. Park, Y. Cho, S.-H. Ko, and H.-H. Kim",
      "venue": "Society for Neuroscience (SfN 2023)",
      "location": "Washington, DC, USA"
    },
    {
      "status": "Poster · Sep. 2023",
      "title": "Decoding electroencephalographic signals for inner speech words (functional, emotional) in brain-computer interface using echo state networks",
      "authors": "M.-J. Cho, D.-H. Lim, H. Park, Y.-J. Cho, S.-H. Ko, and H.-H. Kim",
      "venue": "2023 KSEE Annual Conference",
      "location": "Jeju, South Korea"
    }
  ],
  "projects": [
    {
      "id": "project-blpm",
      "category": "EEG-Language Alignment · Multi-task Instruction Tuning",
      "name": "BLPM",
      "subtitle": "Brain Latent Predictive Model",
      "date": "Apr. 2026 – Present",
      "teaser": "One EEG–language model for seven decoding tasks, using language-guided semantic alignment and instruction-conditioned answer embedding prediction.",
      "tags": [
        "EEG",
        "Foundation Model",
        "Decoding",
        "Representation learning"
      ],
      "goal": "BLPM formulates heterogeneous EEG decoding tasks as continuous semantic embedding prediction. Instead of generating answer tokens, one model predicts an answer embedding in a single forward pass and selects the closest candidate description.\n\nThe core contribution is Predictive Semantic Alignment (PSA): language-guided queries summarize complementary EEG characteristics, while projected EEG tokens preserve fine-grained information. Multi-task instruction tuning then reuses the same predictor and output head across seven tasks.",
      "contributionLabel": "Research contributions",
      "contributions": [
        "Unified seven EEG tasks as instruction-conditioned semantic embedding prediction, without task-specific classification heads or autoregressive answer generation.",
        "Designed PSA with language-guided Multi-Query Semantic Decomposition (MQSD), combining semantic summaries with token-level EEG information.",
        "Developed multi-task instruction tuning with LoRA: task instructions condition one shared semantic predictor and answer head across all seven datasets, without separate per-dataset fine-tuning.",
        "Evaluated a single jointly tuned model against eight individually trained or fine-tuned baselines; BLPM leads balanced accuracy on six of seven datasets."
      ],
      "steps": [
        "Stage 1 — Reuse the pretrained CELP backbone (called CoLP in the paper); encoder pretraining is covered on the CELP project page.",
        "Stage 2 · PSA — Freeze the EEG encoder. Queries describing temporal, spectral, spatial, and morphological characteristics attend to EEG tokens. A bidirectional LLM-based predictor aligns the resulting representation with natural-language label embeddings.",
        "Stage 3 · Multi-task instruction tuning — Jointly train on all seven tasks with task-specific instructions, adapting Llama 3.2-1B-Instruct through LoRA. The shared predictor learns answer embeddings using bidirectional multi-positive contrastive learning; inference selects the nearest candidate answer in a single forward pass."
      ],
      "code": null,

      "stack": ["Python", "PyTorch", "Hugging Face", "NeuralSet", "NeuralBench", "LoRA"],
      "image": {
        "src": "/assets/images/blpm-framework.png",
        "alt": "BLPM framework: CoLP Encoder, language-guided semantic decomposition, predictive semantic alignment, and multi-task instruction tuning pipeline",
        "caption": "BLPM · Brain Latent Predictive Model"
      },
      ...blpmExperience
    },
    {
      "id": "project-celp",
      "category": "Self-supervised learning · Representation learning",
      "name": "CELP",
      "subtitle": "Continuous EEG Latent Predictive Encoder",
      "date": "Jan. 2026 – May 2026",
      "teaser": "A continuous EEG encoder that explores latent representation prediction as a self-supervised approach to learning transferable semantic neural representations.",
      "tags": [
        "EEG",
        "Self-supervised learning",
        "Representation learning",
        "Foundation Model"
      ],
      "goal": "Dominant EEG pretraining paradigms face two core limitations. Masked autoencoding reconstructs low-level signal details rather than learning task-relevant semantics, leaving representations sensitive to noise and subject-specific variability. Autoregressive prediction over discrete neural tokens creates a representational bottleneck — continuous neural dynamics are compressed into a finite codebook designed for text, discarding discriminative patterns critical for neural decoding.\n\nCELP (Continuous EEG Latent Predictive encoder) is the pretraining backbone of the BLPM framework. Instead of reconstructing input signals, CELP predicts the latent representations of masked EEG segments from visible context — a JEPA-inspired objective that encourages higher-level abstraction, reduces sensitivity to low-level waveform noise, and produces transferable representations that align naturally with language semantics.",
      "contributionLabel": "My Contribution",
      "contributions": [
        "Designed a JEPA-inspired latent predictive pretraining scheme for continuous EEG.",
        "Dual-branch patch embedding (temporal conv + spectral FFT) with EMA target encoder.",
        "Structured multi-block masking over the channel-time token space.",
        "Smooth L1 loss in latent space with online/EMA encoder pair."
      ],
      "steps": [
        "Input tokenisation — continuous EEG (C channels × T samples) divided into non-overlapping segments; each channel-segment pair becomes one token (N = C × P tokens total)",
        "Dual-branch patch embedding — temporal branch (1D conv) + spectral branch (FFT magnitude) fused additively; depthwise conv positional encoding applied across channel and time dimensions",
        "Structured multi-block masking — temporal-span masks target contiguous time blocks; channel-block masks target full channel groups; together they expose both temporal continuity and spatial channel relationships",
        "Latent predictive pretraining — online encoder processes visible tokens; EMA target encoder provides stable latent targets from the full sequence; embedding predictor estimates masked positions; Smooth L1 loss in latent space",
        "Backbone transfer — pretrained online encoder is frozen and passed to Stage 2 (MQSD semantic alignment) and Stage 3 (multi-task instruction tuning) of the full BLPM framework"
      ],
      "code": null,

      "stack": ["Python", "PyTorch", "CUDA", "Weights & Biases"],
      "image": {
        "src": "/images/celp/stage1_pretraining.png",
        "alt": "Stage 1 self-supervised pretraining architecture: Online and Target EEG encoders with EMA update, patch embedding, and representation prediction loss.",
        "caption": "Stage 1 — Self-supervised pretraining of the universal EEG encoder via latent representation prediction."
      },
      ...celpExperience
    },
    {
      "id": "project-tada",
      "name": "TADA",
      "category": "ECoG-to-text semantic decoding",
      "subtitle": "Multi-Scale Temporal Fusion & Encoding-Guided Re-ranking",
      "date": "Sep. 2026 – Present",
      "teaser": "Retrieving contextual word representations from ECoG by combining multiple temporal scales with encoding-guided candidate re-ranking.",
      "tags": [
        "ECoG",
        "Decoding",
        "BCI"
      ],
      "goal": "Language-related neural responses unfold over different time scales. A single fixed window can miss useful context, while brain-to-text similarity alone does not check whether a candidate explains the observed neural activity.\n\nTADA combines short-, medium-, and long-window ECoG representations to predict contextual text embeddings. Encoding-Guided Reciprocal Re-ranking (EGR) then refines candidate rankings using both semantic similarity and text-to-neural consistency.",
      "contributionLabel": "Research contributions",
      "contributions": [
        "Analyzed how contextual linguistic information is distributed across neural response lags.",
        "Designed adaptive temporal fusion over SRM-aligned ECoG responses at three time scales.",
        "Introduced EGR to improve retrieval by checking candidate text against observed neural responses."
      ],
      "steps": [
        "Align — Use a Shared Response Model (SRM) to map participants’ ECoG into a common space at short (+25 to +275 ms), medium (−162.5 to +462.5 ms), and long (−600 to +900 ms) windows around word onset.",
        "Decode — Apply a shared residual temporal CNN to each window and learn sample-specific fusion weights to predict contextual GPT-2 XL embeddings.",
        "Re-rank — Combine brain-to-text similarity with the match between candidate-predicted and observed neural responses, keeping the decoder frozen."
      ],
      "experimentalExperienceLabel": "Evaluation",
      "experimentalExperience": [
        {
          "title": "Dataset & protocol",
          "description": "Podcast ECoG: eight participants listening to the same 30-minute podcast. Five chronological folds train the decoder on seven participants and evaluate the held-out participant. Held-out training ECoG is used only for unsupervised SRM alignment; no held-out text labels enter decoder training. Results below report source-participant and held-out cross-subject retrieval as means ± standard deviations."
        },
        {
          "title": "Key finding",
          "description": "EGR improved AUC-ROC over the same multi-scale decoder in all eight held-out participants (paired sign-flip test, p = 0.0078)."
        }
      ],
      "resultTables": tadaResults,
      "code": "https://github.com/Myeongjuuu/TADA",
      "relatedPublication": {
        "title": "Multi-Scale Temporal Fusion Network with Encoding-Guided Reciprocal Re-ranking for ECoG-to-Text Semantic Decoding",
        "venue": "IEEE BCI 2027 · Planned submission"
      },
      "stack": [
        "Python",
        "PyTorch",
        "MNE",
        "scikit-learn",
        "Brainiak / SRM",
        "h5py"
      ],
      "image": {
        "src": "/assets/images/tada-framework.webp",
        "alt": "TADA framework: multi-scale temporal decoder and encoding-guided reciprocal re-ranking for ECoG-to-text decoding"
      }
    },
    {
      "id": "project-neuralspeech",
      "category": "Neural speech reconstruction",
      "name": "NeuralSpeech",
      "subtitle": "Voice Reconstruction from EEG",
      "date": "Feb. 2024 – Jan. 2025",
      "teaser": "GAN-based voice reconstruction from imagined and spoken speech EEG, converting neural signals to Mel-spectrograms via a generator–discriminator architecture with domain adaptation and DTW-based evaluation.",
      "tags": [
        "EEG",
        "Imagined Speech",
        "Brain-to-Speech",
        "GAN",
        "BCI"
      ],
      "goal": "Word recognition using EEG signals opens new communication opportunities for individuals with speech impairments. This project proposes a novel approach that addresses the nonlinear nature of EEG signals and their sensitivity to noise — by converting EEG data into Mel-spectrograms and employing a GAN-based pipeline to reconstruct voice from brain signals.\n\nThe core challenge is the modality gap between neural recordings and acoustic representations. We designed a full pipeline: 130-channel EEG recorded during imagined and spoken speech tasks, Fisher ratio and CSP feature selection, Multi-CSP domain adaptation from spoken to imagined EEG, and a GAN (generator + discriminator + pre-trained classifier) that reconstructs Mel-spectrograms from EEG features. Evaluation uses Dynamic Time Warping (DTW) to compare reconstructed and original Mel-spectrograms.\n\nThe approach builds on NeuroTalk (Lee et al., AAAI 2023) and extends it to the imagined speech domain by incorporating transfer learning from the more robust spoken speech EEG.",
      "contributionLabel": "My contribution",
      "contributions": [
        "Designed and conducted EEG experiments with 4 participants across 13 word classes, collecting both imagined and spoken speech conditions.",
        "Built the full preprocessing pipeline: 30–120 Hz bandpass, 60 Hz notch filter, ICLabel-based artifact rejection, and Mel-spectrogram conversion.",
        "Implemented Fisher ratio feature selection and Multi-CSP domain adaptation (spoken → imagined EEG transfer learning).",
        "Reproduced and extended NeuroTalk’s GAN-based Mel-spectrogram reconstruction pipeline with a pre-trained classifier trained on augmented voice data."
      ],
      "steps": [
        "Data collection — 4 participants, 13 word classes, 36 trials each → 468 trials/participant; two conditions: imagined speech and spoken speech",
        "Preprocessing — band-pass 30–120 Hz, 60 Hz notch filter (ICLabel EOG/EMG removal), voice resampled to 22,050 Hz, Mel-spectrogram extraction",
        "Feature selection — Fisher ratio and CSP to identify discriminative frequency–channel pairs; one class vs. remaining 12 for pairwise discrimination",
        "Domain adaptation — Multi-CSP transfers features from spoken EEG to compensate for sparse imagined EEG via transfer learning",
        "GAN training — generator produces Mel-spectrograms from EEG; discriminator evaluates real vs. generated; pre-trained classifier (voice + augmented data) guides word-class prediction",
        "Evaluation — DTW between reconstructed and original Mel-spectrograms; Spoken F1 = 0.98 (±0.02), Imagined F1 = 0.98 (±0.02)"
      ],
      "code": null,
      "relatedPublication": null,
      "stack": ["Python", "PyTorch", "MNE-Python", "ICLabel"],
      "image": {
        "src": "/images/neuralspeech/overall_framework.png",
        "alt": "NeuralSpeech overall framework: EEG-based voice reconstruction pipeline using GAN-based speech synthesis",
        "caption": "Figure 4. Overall framework — EEG-to-speech reconstruction pipeline."
      },
      experimentalExperience: [
        {
          "title": "Equipment",
          "description": "EEG was recorded using the 130-channel BEL EEG system (BEL AMP One amplifier) in a shielded soundproof booth, minimizing environmental and electrical interference.",
          "image": { "src": "/images/neuralspeech/eeg_device.png", "alt": "BEL AMP One: 130-channel EEG amplifier used for data collection" }
        },
        {
          "title": "Experimental environment",
          "description": "Participants wore the 130-channel EEG cap in a shielded soundproof booth and faced a monitor that presented audio cues and visual fixation dots guiding each imagined-speech trial.",
          "image": { "src": "/images/neuralspeech/experimental_environment.png", "alt": "Participant wearing EEG cap in shielded soundproof booth facing a monitor" }
        },
        {
          "title": "Experimental protocol",
          "description": "Each trial followed a fixed sequence: 0–3 s rest → 3–5 s audio cue (word presentation) → 5–6 s relax (black dot) → 6–8 s imagined or spoken speech (blue dot). Each of the 13 word classes was repeated 36 times, yielding 468 trials per participant. Both imagined and spoken speech conditions were recorded to enable domain adaptation.",
          "image": { "src": "/images/neuralspeech/trial_protocol.png", "alt": "Single trial timeline: rest interval (0–3s), cue interval (3–5s), relax interval (5–6s), action interval (6–8s)" }
        },
        {
          "title": "Target stimuli",
          "description": "13 words covering device control and everyday commands served as target stimuli, forming a practical vocabulary for BCI communication applications.",
          "image": { "src": "/images/neuralspeech/target_words.png", "alt": "13 target words: Call, Camera, Music, On, Up, Left, Receive, Message, Turn, Volume, Off, Down, Right" }
        },
        {
          "title": "Pre-trained classifier",
          "description": "Due to limited voice samples, a classifier was pre-trained on augmented voice data (time stretching, pitch shifting, noise addition, emphasis). This classifier evaluates Mel-spectrograms generated by the GAN and guides the generator toward correct word-class predictions.",
          "image": { "src": "/images/neuralspeech/pretrained_classifier.png", "alt": "Pre-trained classifier pipeline: voice → augmentation → Mel-spectrogram → classifier → word class" }
        },
        {
          "title": "Reference — Original Mel-spectrogram",
          "description": "The original spoken-voice Mel-spectrogram serves as the acoustic reference for the EEG-to-speech pipeline. Reconstruction quality was evaluated using Dynamic Time Warping (DTW) between EEG-derived and original Mel-spectrograms.",
          "image": { "src": "/images/neuralspeech/mel_original.png", "alt": "Figure 8: Original Mel-frequency spectrogram of spoken voice" }
        },
        {
          "title": "Results — Test performance",
          "description": "Table 1 reports RMSE and F1-score on the held-out test set. The model achieves F1 = 0.98 (±0.02) for both spoken and imagined EEG conditions, with RMSE ≈ 0.20–0.21 (±0.01), demonstrating that the GAN pipeline successfully classifies word intent from EEG-derived Mel-spectrograms across both conditions.",
          "image": { "src": "/images/neuralspeech/results_table.png", "alt": "Table 1: Spoken EEG RMSE=0.21±0.01, F1=0.98±0.02; Imagined EEG RMSE=0.20±0.01, F1=0.98±0.02" }
        }
      ]
    },
    {
      "id": "project-essenti",
      "category": "Natural language processing",
      "name": "ESSENTI",
      "subtitle": "Financial News & Investor Sentiment",
      "date": "Mar. 2024 – Nov. 2024",
      "teaser": "A web platform that aggregates Korean financial news, classifies market sentiment using fine-tuned BERT, and delivers concise article summaries via KoBART — helping investors make faster, more informed decisions.",
      "tags": [
        "NLP",
        "BERT",
        "KoBART",
        "Web"
      ],
      "goal": "Korean retail investors need fast, reliable access to financial sentiment — but no Korean-language tool systematically classified and summarised news in real time.\n\nWe built a web platform that crawls Korean financial news, classifies each article (Positive / Neutral / Negative) with a fine-tuned BERT model, and surfaces one-sentence summaries via KoBART, so investors can scan market mood at a glance.",
      "contributionLabel": "My Role",
      "contributions": [
        "Built the financial news crawling pipeline and structured database.",
        "Fine-tuned BERT (90% acc, 0.91 F1) and KoBART for sentiment classification and summarisation.",
        "Collaborated with a web developer on the React platform."
      ],
      "steps": [
        "Data collection — automated crawling from multiple Korean financial news sources into a structured database",
        "Preprocessing — sentiment label mapping, BERT tokenisation, stratified split",
        "Sentiment model — fine-tuned BERT; compared against SVM, LSTM, KoBERT",
        "Summarisation model — fine-tuned KoBART for single-sentence article summaries",
        "Web platform (collaborator) — React dashboard with sentiment chart, watchlist, article search, and hover-to-preview summaries"
      ],
      "experimentalExperienceLabel": "Models",
      "experimentalExperience": [
        {
          "title": "Sentiment classifier",
          "description": "Fine-tuned BERT for 3-class sentiment (Positive / Neutral / Negative). Outperformed SVM, LSTM, and KoBERT — 90 % accuracy, 0.91 F1.",
          "image": { "src": "/images/essenti/model_bert.png", "alt": "BERT: news article → train → Positive / Neutral / Negative" }
        },
        {
          "title": "Summarisation model",
          "description": "Fine-tuned KoBART to condense full Korean financial articles to a single sentence, surfaced as an on-hover preview on each article card.",
          "image": { "src": "/images/essenti/model_kobart.png", "alt": "KoBART: news article → train → Summary" }
        }
      ],
      "screenshotsLabel": "Platform",
      "screenshots": [
        {
          "src": "/images/essenti/web_chart.png",
          "alt": "Sentiment chart showing monthly score trend for SK 하이닉스",
          "caption": "Sentiment Chart",
          "description": "Displays the monthly sentiment score trend for each watchlisted stock. Switch between tickers to compare how market mood shifted over time."
        },
        {
          "src": "/images/essenti/web_watchlist.png",
          "alt": "Stock watchlist with company logos and favourite buttons, followed by articles feed",
          "caption": "Watchlist & Articles",
          "description": "Favourite any stock to pin it to your dashboard. Related news articles are aggregated below, each tagged with its sentiment label."
        },
        {
          "src": "/images/essenti/web_article.png",
          "alt": "Article card with Positive badge; hover popup shows KoBART-generated summary",
          "caption": "Sentiment Label + Summary",
          "description": "Every article displays a Positive / Neutral / Negative badge. Hover over a card to reveal the one-sentence KoBART summary without opening the full article."
        },
        {
          "src": "/images/essenti/web_search.png",
          "alt": "Article search results grid filtered by keyword with sentiment labels",
          "caption": "Article Search",
          "description": "Search articles by keyword across titles and body text. Filter results by sentiment class to find, for example, only negative news about a specific company."
        }
      ],
      "modelComparison": {
        "columns": ["Model", "Accuracy", "F1-score"],
        "rows": [
          { "cells": ["SVM", "0.75", "0.74"] },
          { "cells": ["LSTM", "0.75", "0.76"] },
          { "cells": ["KoBERT", "0.64", "0.56"] },
          { "cells": ["BERT (ours)", "0.90", "0.91"], "highlight": true }
        ]
      },
      "code": "https://github.com/E-SSENTI/ESSENTI-Model",
      "relatedPublication": null,
      "stack": [
        "BERT",
        "KoBART",
        "Python",
        "PyTorch",
        "BeautifulSoup",
        "React"
      ],
      "image": { "src": "/images/essenti/pipeline.png", "alt": "ESSENTI system pipeline: financial news sources → database → preprocessing → BERT sentiment model and KoBART summarisation → web platform", "caption": "End-to-end system pipeline — from news collection to sentiment-aware web delivery." },
      "cardImages": [
        { "src": "/images/essenti/pipeline.png", "alt": "ESSENTI system pipeline" },
        { "src": "/images/essenti/model_bert.png", "alt": "Sentiment classifier: BERT fine-tuning" },
        { "src": "/images/essenti/model_kobart.png", "alt": "Summarisation model: KoBART fine-tuning" }
      ]
    },
    {
      "id": "project-eeg-llm",
      "category": "EEG × language models",
      "name": "Fine-tuned LLM for EEG",
      "subtitle": "Motor Imagery Classification with a Fine-tuned LLM",
      "date": "Apr. 2024 – Oct. 2024",
      "teaser": "A fine-tuned large language model for non-invasive EEG motor imagery task classification, converting neural signals into structured text representations for LLM input.",
      "tags": [
        "EEG",
        "Motor Imagery",
        "LLM fine-tuning",
        "BCI"
      ],
      "goal": "Large language models have shown remarkable pattern recognition capabilities across diverse domains beyond natural language. This project investigates whether an LLM — originally trained on text — can be adapted to classify EEG signals recorded during motor imagery tasks, where participants imagine performing movements (e.g., left hand, right hand, feet, tongue) without physically moving.\n\nThe key challenge is the modality gap: EEG signals are continuous multichannel time series, not text. We addressed this by designing a structured conversion pipeline that serialises extracted EEG features into a JSON-formatted text representation that the LLM can process. An OpenAI language model was then fine-tuned on these structured representations to predict the intended motor imagery class.",
      "contributionLabel": "My contribution",
      "contributions": [
        "Performed EEG signal preprocessing and designed structured LLM-compatible feature representations.",
        "Developed and fine-tuned a large language model for motor imagery classification.",
        "Conducted experiments and evaluated performance against traditional ML baselines."
      ],
      "steps": [
        "Dataset — publicly available motor imagery EEG benchmark dataset; 4-class paradigm (left hand, right hand, feet, tongue) recorded across multiple subjects",
        "Preprocessing — MNE-Python: bandpass filtering (0.5–40 Hz), epoch extraction, baseline correction, artifact rejection, and per-channel normalisation",
        "Feature extraction — frequency-band power (delta, theta, alpha, beta, gamma) computed per channel per epoch using Welch's method; features selected by discriminability across motor imagery classes",
        "Input design — structured JSON conversion: each EEG epoch encoded as a dictionary mapping (channel, frequency band) → power value, serialised into a text string compatible with OpenAI fine-tuning format",
        "Fine-tuning — OpenAI API fine-tuning on the JSON-formatted EEG feature data with class labels; hyperparameter search over learning rate and number of epochs",
        "Evaluation — classification accuracy on held-out test data; comparison against traditional ML baselines (SVM, LDA) to quantify the benefit of LLM-based classification"
      ],
      "code": "https://github.com/Myeongjuuu/EEG-LLM",
      "relatedPublication": {
        "title": "Classification of Non-Invasive EEG Signals During Motor Imagery Tasks Using a Large Language Model",
        "venue": "IEEE International Conference on Cyberworlds (CW), 2024"
      },
      "stack": [
        "Python",
        "OpenAI API",
        "MNE",
        "scikit-learn",
        "NumPy"
      ],
      "image": {
        "src": "/assets/images/ieee-cw-2024-framework.png",
        "alt": "Fine-tuned LLM for EEG: feature extraction, JSON conversion, and LLM fine-tuning pipeline",
        "caption": "Fine-tuned LLM for EEG · IEEE CW 2024"
      }
    },
    {
      "id": "project-neurodecoder",
      "category": "Brain–computer interfaces",
      "name": "NeuroDecoder",
      "subtitle": "Imagined Speech for Alternative Communication",
      "date": "Mar. 2023 – Nov. 2023",
      "teaser": "EEG-based imagined speech decoding for individuals with aphasia, using self-collected data, filter-bank feature extraction, and an Echo State Network classifier.",
      "tags": [
        "EEG",
        "Imagined Speech",
        "BCI",
        "Echo State Network"
      ],
      "goal": "Aphasia and motor disabilities can make verbal communication impossible. This project asked whether EEG signals recorded during imagined speech could decode intended words — enabling a hands-free, voice-free communication interface.\n\nWe self-collected 16-channel EEG from 40 participants in a shielded booth, then built a full decoding pipeline: filter-bank feature extraction, CSP spatial filtering, and Echo State Network classification across 10 target words.",
      "steps": [
        "EEG recording — 40 healthy adults, shielded soundproof booth, 16-channel OpenBCI Cyton",
        "Preprocessing — detrending, min-max normalization per channel (MNE-Python)",
        "Feature extraction — 30-band filter bank (0–60 Hz, 2 Hz steps); Fisher Ratio to select discriminative frequency–channel pairs",
        "Spatial filtering — Common Spatial Pattern (CSP) to maximize class separability",
        "Decoding — Echo State Network with fixed reservoir weights and online-trained readout; winner-take-all over 10 word classes"
      ],
      "code": "https://github.com/Myeongjuuu/Inner_Speech_Decoding",
      "relatedPublication": null,
      "stack": ["Python", "MNE-Python", "NumPy", "SciPy", "scikit-learn", "Matplotlib"],
      "image": null,
      "cardImage": { "src": "/images/neurodecoder/esn_architecture.png", "alt": "Echo State Network architecture: input layer → reservoir (internal units) → readout layer" },
      "datasetExperience": [
        {
          "title": "External dataset",
          "description": "Due to noise from electronic devices in the recording environment, the self-collected data showed limited quality. A public inner-speech EEG dataset was incorporated to validate the pipeline on cleaner, higher-density recordings.",
          "datasets": [
            {
              "name": "Nieto et al. (2022) — \"Thinking out loud\"",
              "task": "Inner speech recognition · 136-ch EEG (128 EEG + 8 EXG), downsampled to 256 Hz, task vs. rest epochs (sub-01)"
            }
          ],
          "source": {
            "href": "https://doi.org/10.1038/s41597-022-01147-2",
            "label": "Nieto et al., Scientific Data 2022"
          }
        }
      ],
      "experimentalExperience": [
        {
          "title": "Participants",
          "description": "40 healthy adults (aged 20–30), recruited personally; no history of psychiatric disorders. EEG was recorded in a shielded soundproof booth with a 16-channel OpenBCI Cyton system.",
          "image": { "src": "/images/neurodecoder/booth.png", "alt": "Shielded soundproof booth used for EEG recording" }
        },
        {
          "title": "Target stimuli",
          "description": "10 words covering device-control and social-communication functions — designed for practical BCI use by individuals who cannot speak.",
          "image": { "src": "/images/neurodecoder/target_words.png", "alt": "10 target words: Taking, Sending, Turn off, Turn on, Thank you, Opening, Closing, Backward, Forward, Sorry" }
        },
        {
          "title": "Experimental protocol",
          "description": "60 s initial rest (beep at start and end) → repeated single trials of: 5 s rest → 2.5 s word display (recognition) → 5 s imagined speech. 10 repetitions per word class.",
          "image": { "src": "/images/neurodecoder/protocol_trial.png", "alt": "Single trial timeline: 0–5s Rest, 5–7.5s Recognition, 7.5–12.5s Inner Speech" }
        },
        {
          "title": "Echo State Network",
          "description": "Reservoir-based recurrent network with randomly connected internal units and a trainable readout layer. Input and recurrent weights are fixed; only the readout is updated during online learning — making it efficient for streaming EEG decoding.",
          "image": { "src": "/images/neurodecoder/esn_architecture.png", "alt": "Echo State Network: Input Layer → Internal Unit Layer (reservoir) → Readout Layer" }
        }
      ]
    },
    {
      "id": "project-inner-speech",
      "name": "Inner Speech EEG·fMRI",
      "category": "Multimodal inner speech analysis",
      "subtitle": "Decoding & Functional Connectivity with EEG and fMRI",
      "date": "",
      "teaser": "Multimodal inner speech analysis combining EEG decoding (CSP/LDA/SVM) and fMRI functional connectivity, applied to the public Nieto et al. 2022 dataset.",
      "tags": [
        "EEG",
        "fMRI",
        "Inner speech",
        "Functional connectivity"
      ],
      "goal": "Inner speech — the silent production of language without any vocalization or movement — leaves measurable neural traces in both scalp EEG and fMRI. This project builds a reproducible multimodal analysis pipeline on the openly available Nieto et al. 2022 'Thinking out loud' dataset (OpenNeuro ds003626 v2.1.2), which provides 136-channel EEG (128 EEG + 8 EXG), fMRI, and simultaneous physiological recordings from participants performing inner-speech tasks across multiple sessions.\n\nThe pipeline starts with auditable EEG preprocessing — bandpass filtering, resampling, ICA-based artefact rejection, and paired epoch quality control — then trains run-held-out Common Spatial Pattern (CSP) decoders with LDA and SVM classifiers to distinguish inner-speech categories. Beyond classification, the project includes task-vs-rest functional connectivity analysis using weighted Phase Lag Index squared (wPLI²), magnitude-squared coherence, and Phase Locking Value (PLV), as well as multitaper time-frequency representations to characterise oscillatory dynamics during inner speech.",
      "contributionLabel": "Implementation",
      "contributions": [
        "Built a full EEG preprocessing pipeline: bandpass filtering, resampling, ICA-based artefact rejection, and paired epoch quality control on the ds003626 dataset.",
        "Implemented run-held-out CSP with LDA and SVM classifiers for inner-speech category decoding; evaluated with held-out-run cross-validation to avoid data leakage.",
        "Computed task-vs-rest functional connectivity using wPLI², coherence, and PLV across canonical frequency bands (delta, theta, alpha, beta, gamma).",
        "Generated multitaper time-frequency representations to characterise oscillatory dynamics time-locked to inner-speech onset."
      ],
      "steps": [
        "EEG preprocessing — bandpass filtering, resampling, ICA, paired QC",
        "Run-held-out CSP classification with LDA and SVM",
        "Task vs. rest functional connectivity (wPLI², coherence, PLV)",
        "Multitaper time-frequency analysis"
      ],
      "code": "https://github.com/Myeongjuuu/EEG_fMRI_Inner_Speech_FC",
      "relatedPublication": null,
      "stack": [
        "Python",
        "MNE",
        "MNE-Connectivity",
        "scikit-learn",
        "SciPy",
        "pandas"
      ],
      "image": null,
      "datasetExperience": [
        {
          "title": "Public dataset",
          "description": "Nieto et al. (2022) 'Thinking out loud' is an openly available multimodal dataset containing 136-channel EEG (128 EEG + 8 EXG channels, downsampled to 256 Hz), fMRI, and physiological recordings from participants performing inner-speech, auditory imagery, and rest conditions across multiple sessions. The OpenNeuro release (ds003626 v2.1.2) includes raw data for up to 10 subjects with full session metadata.",
          "datasets": [
            {
              "name": "Nieto et al. (2022) — 'Thinking out loud'",
              "task": "Inner speech decoding & functional connectivity · 136-ch EEG + fMRI, task vs. rest epochs, multiple inner-speech categories"
            }
          ],
          "source": {
            "href": "https://doi.org/10.1038/s41597-022-01147-2",
            "label": "Nieto et al., Scientific Data 2022"
          }
        }
      ]
    }
  ],
  "awards": [
    {
      "date": "Nov. 2024",
      "title": "Teamwork Award",
      "organization": "2024 Capstone Design Competition · Department of Computer Engineering and Artificial Intelligence, Pukyong National University",
      "detail": null
    },
    {
      "date": "Feb. 2024",
      "title": "Proud Student Award",
      "organization": "College of Information Technology and Convergence, Pukyong National University",
      "detail": null
    },
    {
      "date": "Sep. 2023",
      "title": "Best Presentation Award",
      "organization": "2023 KSEE Annual Conference · Korean Society for Engineering Education",
      "detail": null
    }
  ],
  "education": [
    {
      "title": "Korea University",
      "description": "M.S. in Brain and Cognitive Engineering",
      "date": "Sep. 2025 – Aug. 2027 (Expected)",
      "location": "Seoul, South Korea"
    },
    {
      "title": "Pukyong National University",
      "description": "B.S. in Computer Engineering",
      "date": "Mar. 2020 – Feb. 2025",
      "location": "Busan, South Korea"
    }
  ],
  "experience": [
    {
      "title": "Graduate Researcher · Pattern Recognition and Machine Learning (PRML) Lab",
      "description": "Korea University · Prof. Seong-Whan Lee",
      "date": "Aug. 2025 – Present",
      "url": "http://pr.korea.ac.kr/"
    },
    {
      "title": "Undergraduate Researcher · Brain-inspired eXpainable Artificial Intelligence (BXAI) Lab",
      "description": "Pukyong National University · Prof. Hoon-Hee Kim",
      "date": "Mar. 2023 – Jan. 2025",
      "url": "https://sites.google.com/view/brainxai"
    }
  ],
  "news": [
    { "date": "Jan. 2026", "category": "Paper", "title": "Korean patent application filed", "detail": "Apparatus and Method for Learning Universal EEG Representations Based on Functional Connectivity Reconstruction." },
    { "date": "Sep. 2025", "category": "Education", "title": "Started M.S. at Korea University", "detail": "Brain and Cognitive Engineering · PRML Lab · Supervised by Prof. Seong-Whan Lee." },
    { "date": "Aug. 2025", "category": "Career", "title": "Joined PRML Lab as Graduate Researcher", "detail": "Korea University · Prof. Seong-Whan Lee." },
    { "date": "Jul. 2025", "category": "Activity", "title": "Selected for LG Aimers 7th Cohort", "detail": "Worked on food and beverage demand prediction." },
    { "date": "Nov. 2024", "category": "Award", "title": "Teamwork Award — Capstone Design Competition", "detail": "Department of Computer and Artificial Intelligence Engineering, Pukyong National University." },
    { "date": "Oct. 2024", "category": "Paper", "title": "Poster at IEEE CW 2024", "detail": "Classification of Non-Invasive EEG Signals During Motor Imagery Tasks Using a Large Language Model. Kofu, Japan." },
    { "date": "Feb. 2024", "category": "Award", "title": "Proud Student Award", "detail": "College of Information Technology and Convergence, Pukyong National University." },
    { "date": "Nov. 2023", "category": "Paper", "title": "Poster at Society for Neuroscience (SfN 2023)", "detail": "Decoding electroencephalographic signals for inner speech words in brain-computer interface. Washington, DC, USA." },
    { "date": "Sep. 2023", "category": "Award", "title": "Best Presentation Award — KSEE Annual Conference", "detail": "Korean Society for Engineering Education · Jeju, South Korea." },
    { "date": "Mar. 2023", "category": "Career", "title": "Joined BXAI Lab as Undergraduate Researcher", "detail": "Pukyong National University · Prof. Hoon-Hee Kim." }
  ],
  competencies: [
    {
      title: 'Experimental Design & Data Collection',
      description: 'Designing and running EEG experiments from scratch — from paradigm planning and participant protocols to operating a 130-channel recording system in a shielded soundproof booth and building the full preprocessing pipeline.',
      methods: ['Study Protocol Design', 'Imagined & Spoken Speech Paradigms', '16-ch EEG (OpenBCI)', '130-ch EEG (BEL AMP)', 'ICLabel Artifact Rejection', 'DTW Evaluation', 'Multi-condition Recording'],
      projects: ['project-neurodecoder', 'project-neuralspeech'],
    },
    {
      title: 'Neural Signal Processing',
      description: 'End-to-end preprocessing and feature extraction across EEG, ECoG, and fMRI — from raw multichannel recordings to analysis-ready representations using spatial filters, connectivity measures, and GLM-based activation mapping.',
      methods: ['CSP / Multi-CSP', 'ICA', 'Band-power', 'wPLI² / PLV / Coherence', 'SRM Alignment', 'fMRIPrep', 'SPM', 'MNE-Python', 'EEGLAB'],
      projects: ['project-inner-speech', 'project-neuralspeech', 'project-celp', 'project-blpm', 'project-tada'],
    },
    {
      title: 'Large-scale Multi-modal Data Engineering',
      description: 'Building scalable pipelines across EEG, ECoG, and fMRI datasets — LMDB-backed fast I/O, joint training on seven heterogeneous benchmarks, and multi-GPU distributed training for large-model optimization.',
      methods: ['Multi-modal Neuroimaging (EEG / ECoG / fMRI)', '7-dataset Multi-task Training', 'NeuralSet / NeuralBench', 'LMDB (Fast I/O)', 'Balanced Accuracy', 'Cross-dataset Generalization', 'Distributed Training (Multi-GPU)'],
      projects: ['project-celp', 'project-blpm'],
    },
    {
      title: 'Neural Decoding',
      description: 'Classifying and reconstructing cognitive states from brain signals — imagined speech, motor imagery, inner speech, ECoG-to-text retrieval — using pipelines from classical spatial filters to multi-scale deep networks, with cross-subject generalization.',
      methods: ['Echo State Networks', 'LDA / SVM', 'GAN-based Speech Synthesis', 'Multi-scale Temporal CNN', 'Domain Adaptation', 'Leave-one-subject-out CV'],
      projects: ['project-neurodecoder', 'project-inner-speech', 'project-neuralspeech', 'project-eeg-llm', 'project-tada'],
    },
    {
      title: 'Foundation Modeling & Large Language Model',
      description: 'Building a self-supervised EEG foundation encoder using JEPA-inspired latent prediction — dual-branch patch embedding, knowledge distillation via an EMA target network, and structured multi-block masking — then adapting a large language model for multi-task neural decoding through instruction tuning.',
      methods: ['Latent Predictive Modeling (JEPA)', 'Dual-branch Patch Embedding', 'Knowledge Distillation', 'Structured Multi-block Masking', 'LLM Adaptation', 'Backbone Transfer'],
      projects: ['project-celp', 'project-blpm'],
    },
    {
      title: 'Cross-modal Alignment',
      description: 'Aligning EEG representations with language semantics through language-guided multi-query decomposition and multi-task instruction tuning — one model predicting answer embeddings across seven heterogeneous decoding tasks without task-specific heads.',
      methods: ['Predictive Semantic Alignment (PSA)', 'Language-guided MQSD', 'Multi-task Instruction Tuning', 'LoRA / PEFT', 'Bidirectional Multi-positive Contrastive Learning', 'Llama 3.2 / HuggingFace'],
      projects: ['project-celp', 'project-blpm'],
    },
  ],
};
