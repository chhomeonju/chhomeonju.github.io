import type { PortfolioData } from '../types';
import { blpmExperience, celpExperience } from './foundation-experience';

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
      description: 'Exploring how cognitive information is represented in neural activity and decoded using deep learning across neural measurement modalities, including EEG, ECoG, and fMRI.',
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
      "teaser": "A unified EEG–language model that predicts answer embeddings across heterogeneous decoding tasks.",
      "tags": [
        "EEG",
        "Foundation Model",
        "Decoding",
        "Representation learning"
      ],
      "goal": "Can continuous EEG representations support diverse decoding tasks through a shared language-semantic prediction space?",
      "contributionLabel": "Research focus",
      "contributions": [
        "Latent predictive modeling with the CELP encoder.",
        "Language-guided multi-query semantic decomposition (MQSD).",
        "Instruction-conditioned answer embedding prediction and semantic matching."
      ],
      "steps": [
        "CELP pretraining: predict masked latent targets with an EMA teacher, using temporal and spectral EEG features.",
        "Semantic alignment: language-derived queries attend to EEG tokens; contrastive learning aligns predictions with label-text embeddings.",
        "Multi-task decoding: LoRA-adapted Llama predicts an answer embedding; similarity to candidate answers determines the class."
      ],
      "code": null,

      "stack": ["Python", "PyTorch", "NeuralSet", "NeuralBench", "LoRA"],
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
      "teaser": "A multi-scale ECoG-to-text decoding implementation combining temporal encoding, shared response alignment, and encoding-guided reciprocal re-ranking.",
      "tags": [
        "ECoG",
        "Decoding",
        "BCI"
      ],
      "goal": "Decode semantic information from ECoG using multiple temporal scales and encoding-guided re-ranking.",
      "contributionLabel": "Implementation",
      "contributions": [
        "Implemented residual temporal encoders and adaptive multi-window fusion.",
        "Integrated SRM alignment, ranking losses, and encoding-guided re-ranking.",
        "Provided source and held-out participant evaluation pipelines."
      ],
      "steps": [
        "ECoG preparation & SRM alignment",
        "Multi-scale temporal decoding",
        "Encoding-guided re-ranking"
      ],
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
      "teaser": "Voice reconstruction using imagined and spoken speech EEG, extending the NeuroTalk speech synthesis pipeline.",
      "tags": [
        "EEG",
        "Imagined Speech",
        "Brain-to-Speech",
        "GAN",
        "BCI"
      ],
      "goal": "Investigate voice reconstruction from imagined and spoken speech EEG.",
      "contributionLabel": "My contribution",
      "contributions": [
        "Conducted EEG experiments and signal preprocessing.",
        "Reproduced and extended NeuroTalk.",
        "Modified the GAN-based speech synthesis pipeline for reconstruction from mel-spectrograms."
      ],
      "steps": [
        "EEG experiments",
        "Signal preprocessing",
        "Speech reconstruction"
      ],
      "code": null,
      "relatedPublication": null,
      "stack": [],
      "image": null,
      experimentalExperience: [
        {
                "title": "Equipment",
                "description": "BEL EEG recording system."
        },
        {
                "title": "Experimental design & recording",
                "description": "Designed and conducted imagined- and spoken-speech EEG data-collection experiments."
        },
        {
                "title": "Signal processing",
                "description": "Preprocessed the recorded EEG for speech reconstruction experiments."
        },
        {
                "title": "Model experiments",
                "description": "Reproduced and extended NeuroTalk’s GAN-based mel-spectrogram reconstruction pipeline."
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
        { "src": "/images/essenti/web_chart.png", "alt": "Sentiment chart dashboard" },
        { "src": "/images/essenti/web_articles.png", "alt": "Financial news articles list" }
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
      "date": "Aug. 2025 – Present"
    },
    {
      "title": "Undergraduate Researcher · Brain-inspired eXpainable Artificial Intelligence (BXAI) Lab",
      "description": "Pukyong National University · Prof. Hoon-Hee Kim",
      "date": "Mar. 2023 – Jan. 2025"
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
      title: 'Neural Signal Processing',
      description: 'End-to-end preprocessing and feature extraction from multichannel EEG/ECoG recordings — filtering, artifact rejection, spatial filtering, and spectral analysis.',
      methods: ['CSP', 'ICA', 'Band-power', 'wPLI / PLV', 'MNE-Python', 'EEGLAB'],
    },
    {
      title: 'Self-Supervised Representation Learning',
      description: 'Designing pretraining objectives for neural time-series: latent prediction with EMA teacher networks, contrastive alignment, and masked reconstruction.',
      methods: ['Latent Predictive Modeling', 'Contrastive Learning', 'EMA Teacher', 'Masked Autoencoding', 'PyTorch'],
    },
    {
      title: 'Brain–Language Decoding',
      description: 'Aligning neural signals with language semantics — semantic embedding prediction, cross-modal retrieval, and instruction-conditioned EEG-to-text decoding.',
      methods: ['Semantic Alignment', 'LoRA Fine-tuning', 'Llama / HuggingFace', 'Cross-modal Retrieval', 'PEFT'],
    },
    {
      title: 'BCI System Design',
      description: 'Building classification pipelines for imagined speech, motor imagery, and inner speech decoding tasks using classical and deep learning approaches.',
      methods: ['Imagined Speech Decoding', 'Motor Imagery', 'Echo State Networks', 'LDA / SVM', 'Inner Speech EEG'],
    },
  ],
};
