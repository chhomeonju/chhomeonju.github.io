import type { PortfolioData } from '../types';
import { blpmExperience, celpExperience } from './foundation-experience';

export const portfolio: PortfolioData = {
  activities: [
    { title: 'LG Aimers · 7th Cohort', role: 'Participant', date: 'Jul. – Aug. 2025', description: 'Worked on food and beverage demand prediction.' },
    { title: 'AI Study Group', role: 'Peer Study', date: 'Mar. – Jun. 2025', description: 'Studied artificial intelligence through a peer study group.' },
    { title: 'MATLAB for Neuroscience Study Group', role: 'Peer Study', date: 'Jan. – Feb. 2024', description: 'Studied MATLAB for Neuroscience through a peer reading group.' },
    { title: 'Neuroscience Study Group', role: 'Peer Study', date: 'Jul. – Aug. 2023', description: 'Studied neuroscience through a peer study group.' },
    { title: 'WAP Programming Club', role: 'Member', date: 'Sep. 2021 – Aug. 2022', description: 'Participated in web development activities.' },
  ],
  patents: [
    {
      title: 'Apparatus and Method for Learning Universal Electroencephalogram Representations Based on Functional Connectivity Reconstruction',
      inventors: ['Seong-Whan Lee', 'Myeong-Ju Cho', 'Hana Jo', 'and Seo-Hyun Lee'],
      date: 'Jan. 2026', number: '10-2026-0018395', status: 'Korean patent application · Filed',
    },
  ],
  technicalSkills: [
    { category: 'Programming Languages', skills: ['Python', 'MATLAB', 'C', 'SQL'] },
    { category: 'Deep Learning Frameworks and Libraries', skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face Transformers', 'PEFT', 'Accelerate'] },
    { category: 'Neuroimaging and Signal Processing', skills: ['MNE-Python', 'EEGLAB', 'SPM', 'fMRIPrep'] },
    { category: 'GPU Computing and Distributed Training', skills: ['CUDA', 'Multi-GPU Training', 'Distributed Training'] },
    { category: 'Databases and Experiment Tracking', skills: ['MySQL', 'LMDB', 'Weights & Biases'] },
    { category: 'Development and Research Tools', skills: ['Git', 'Linux', 'Docker', 'Conda', 'LaTeX'] },
  ],
  researchInterests: [
    {
      title: 'Can we decode inner speech from EEG?',
      description: 'Starting from motor imagery and imagined speech paradigms, I investigated whether inner language leaves decodable traces in EEG — building classification pipelines, GAN-based speech reconstruction, and analyzing functional connectivity patterns that distinguish imagined words.',
      raisedQuestion: 'What representations enable decoding that generalizes across subjects and tasks?',
    },
    {
      title: 'Can self-supervised learning yield transferable EEG representations?',
      description: 'This question drove the development of EEG foundation models — designing latent predictive objectives and aligning EEG with language semantics to learn representations that transfer across subjects, datasets, and downstream tasks.',
      raisedQuestion: 'How do temporal dynamics shape the emergence of semantic information in neural signals?',
    },
    {
      title: 'How do temporal dynamics drive semantic decoding in ECoG?',
      description: 'Working with high-resolution ECoG recordings, I developed multi-scale temporal fusion networks and encoding-guided re-ranking to capture how linguistic meaning emerges and propagates across neural time.',
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
      title: 'Understanding Human Cognition',
      description: 'Investigating how distributed neural dynamics, functional connectivity, and individual variability shape human perception and cognition — moving from decoding models toward mechanistic understanding of what the brain is actually computing.',
      tags: ['Neural Dynamics', 'Functional Connectivity', 'Individual Variability', 'Computational Neuroscience'],
    },
  ],
  "publications": [
    {
      "title": "Multi-Scale Temporal Fusion Network with Encoding-Guided Reciprocal Re-ranking for ECoG-to-Text Semantic Decoding",
      "authors": "M.-J. Cho, S.-H. Lee, and S.-W. Lee†",
      "venue": "IEEE BCI 2027 · Planned submission",
      "image": null,
      "imageAlt": null,
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
      "image": "assets/images/continuous-latent-framework.png",
      "imageAlt": "Continuous Latent Predictive Modeling 논문의 EEG 사전학습 및 예측 의미 정렬 구조도",
      "links": []
    },
    {
      "title": "Classification of Non-Invasive EEG Signals During Motor Imagery Tasks Using a Large Language Model",
      "authors": "D.-H. Lim*, M.-J. Cho*, and H.-H. Kim†",
      "venue": "IEEE CW 2024",
      "image": "assets/images/ieee-cw-2024-framework.png",
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
      "title": "Decoding electroencephalographic signals for inner speech words (functional, emotional) in brain-computer interface using Echo State Networks",
      "authors": "M.-J. Cho, D.-H. Lim, H. Park, Y.-J. Cho, S.-H. Ko, and H.-H. Kim",
      "venue": "2023 KSEE Annual Conference",
      "location": "Jeju, South Korea"
    }
  ],
  "projects": [
    {
      "id": "project-blpm",
      "category": "EEG representation learning",
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
      "image": null,
      ...blpmExperience
    },
    {
      "id": "project-celp",
      "category": "Self-supervised learning",
      "name": "CELP",
      "subtitle": "Continuous EEG Latent Predictive Encoder",
      "date": "Jan. 2026 – May 2026",
      "teaser": "A continuous EEG encoder that explores latent representation prediction as a self-supervised approach to learning transferable semantic neural representations.",
      "tags": [
        "EEG",
        "Self-supervised learning",
        "Representation learning"
      ],
      "goal": "Explore self-supervised latent prediction for generalizable continuous EEG representations.",
      "contributionLabel": "Research focus",
      "contributions": [
        "Continuous EEG encoding.",
        "Self-supervised prediction in latent representation space.",
        "Transferable, semantic neural representations."
      ],
      "steps": [
        "Continuous EEG",
        "Latent prediction",
        "Semantic representations"
      ],
      "code": null,

      "stack": ["Python", "PyTorch"],
      "image": null,
      ...celpExperience
    },
    {
      "id": "project-tada",
      "name": "TADA",
      "category": "ECoG-to-text semantic decoding",
      "subtitle": "Multi-Scale Temporal Fusion & Encoding-Guided Re-ranking",
      "date": "",
      "teaser": "A multi-scale ECoG-to-text decoding implementation combining temporal encoding, shared response alignment, and encoding-guided reciprocal re-ranking.",
      "tags": [
        "ECoG",
        "Decoding"
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
      "image": null
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
        "GAN"
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
      "teaser": "A financial news platform combining automated news collection, investor sentiment analysis, and news summarization.",
      "tags": [
        "NLP",
        "BERT",
        "KoBART"
      ],
      "goal": "Turn financial news into sentiment signals and concise summaries.",
      "contributionLabel": "My contribution",
      "contributions": [
        "Built a financial news crawling and preprocessing pipeline.",
        "Used BERT for sentiment analysis.",
        "Used KoBART for news summarization."
      ],
      "steps": [
        "News collection",
        "BERT sentiment analysis",
        "KoBART summaries"
      ],
      "code": "https://github.com/E-SSENTI/ESSENTI-Model",
      "relatedPublication": null,
      "stack": [
        "BERT",
        "KoBART"
      ],
      "image": null
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
        "LLM fine-tuning"
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
        "src": "assets/images/ieee-cw-2024-framework.png",
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
      "goal": "Speech is fundamental to communication, but conditions such as aphasia or motor disabilities can make verbal expression impossible. This project investigated whether EEG signals recorded during imagined speech — words mentally rehearsed but never spoken — could be decoded to identify the intended word, with the goal of enabling alternative communication for individuals who cannot speak.\n\nWe recruited 40 participants, collected 16-channel EEG in a shielded soundproof booth using OpenBCI, and built a complete decoding pipeline: frequency-domain feature extraction with a filter bank and CSP, followed by classification with an Echo State Network (ESN).",
      "steps": [
        "Experiment design — recruited 40 healthy adults (aged 20–30); 10 imagined-speech target words; recorded in a shielded soundproof booth with a 16-ch OpenBCI Cyton system",
        "Data — self-collected dataset (40 subjects, 10 words) supplemented by the Nieto et al. (2022) public inner-speech EEG dataset for pipeline validation",
        "Preprocessing — MNE-Python: detrending to remove baseline drift → min-max normalization per channel",
        "Feature extraction — filter bank decomposition (0–60 Hz, 30 bands at 2 Hz intervals); Fisher Ratio computed per band per channel to identify discriminative frequency–channel pairs; Common Spatial Pattern (CSP) to maximize spatial variance between word classes and rest",
        "Decoding — Echo State Network (ESN) with a reservoir-based recurrent structure and online learning; winner-take-all readout trained over 10 word classes"
      ],
      "code": "https://github.com/Myeongjuuu/Inner_Speech_Decoding",
      "relatedPublication": null,
      "stack": ["Python", "MNE-Python", "NumPy", "SciPy", "scikit-learn", "Matplotlib"],
      "image": null,
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
          "title": "Equipment",
          "description": "16-channel OpenBCI Cyton board; shielded soundproof booth to minimize environmental noise."
        },
        {
          "title": "Participants",
          "description": "40 healthy adults (aged 20–30), recruited personally; none showed indications of psychiatric disorders."
        },
        {
          "title": "Experimental protocol",
          "description": "10 target words (8 device-control words + 2 condition words). Each trial: 60 s initial rest → repeated blocks of black dot (remain calm) → word display (recognition) → blue dot (imagined speech). 10 repetitions per word class."
        },
        {
          "title": "Signal processing",
          "description": "MNE-Python pipeline: detrending → min-max normalization → 30-band filter bank (0–60 Hz, 2 Hz steps) → Fisher Ratio feature selection → CSP spatial filtering → Echo State Network decoding with online learning."
        }
      ]
    },
    {
      "id": "project-inner-speech",
      "name": "Inner Speech EEG",
      "category": "EEG signal processing & analysis",
      "subtitle": "Inner Speech Decoding & Functional Connectivity",
      "date": "",
      "teaser": "A reproducible analysis pipeline for the public Inner Speech EEG dataset, covering preprocessing, grouped CSP classification, and exploratory task/rest connectivity.",
      "tags": [
        "EEG",
        "Inner speech",
        "Functional connectivity"
      ],
      "goal": "Analyze inner-speech EEG with auditable preprocessing and run-held-out classification.",
      "contributionLabel": "Implementation",
      "contributions": [
        "Built filtering, resampling, ICA, and paired quality-control stages.",
        "Implemented grouped CSP with LDA/SVM classification.",
        "Added exploratory wPLI, coherence, PLV, and multitaper time-frequency analyses."
      ],
      "steps": [
        "EEG preprocessing & quality control",
        "Grouped CSP classification",
        "Exploratory connectivity analysis"
      ],
      "code": "https://github.com/Myeongjuuu/EEG_Inner_Speech_FC",
      "relatedPublication": null,
      "stack": [
        "Python",
        "MNE",
        "MNE-Connectivity",
        "scikit-learn",
        "SciPy",
        "pandas"
      ],
      "image": null
    }
  ],
  "awards": [
    {
      "date": "Nov. 2024",
      "title": "Teamwork Award",
      "organization": "2024 Capstone Design Competition, Department of Computer Engineering and Artificial Intelligence, Pukyong National University",
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
      "date": "Sep. 2025 – Present"
    },
    {
      "title": "Pukyong National University",
      "description": "B.S. in Computer Engineering",
      "date": "Mar. 2020 – Feb. 2025"
    }
  ],
  "experience": [
    {
      "title": "Graduate Researcher · PRML Lab",
      "description": "Korea University · Prof. Seong-Whan Lee",
      "date": "Aug. 2025 – Present"
    },
    {
      "title": "Undergraduate Researcher · Brain-inspired eXpainable Artificial Intelligence Lab",
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
    { "date": "Mar. 2023", "category": "Career", "title": "Joined BEX-AI Lab as Undergraduate Researcher", "detail": "Pukyong National University · Prof. Hoon-Hee Kim." }
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
