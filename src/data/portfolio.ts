import type { PortfolioData } from '../types';

export const portfolio: PortfolioData = {
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
      "teaser": "A brain latent predictive modeling framework for learning generalizable EEG representations, with a focus on transferable and semantically meaningful neural features.",
      "tags": [
        "EEG",
        "Foundation models",
        "Representation learning"
      ],
      "goal": "Learn neural representations that transfer across EEG tasks while retaining semantic information.",
      "contributionLabel": "Research focus",
      "contributions": [
        "Latent predictive modeling for EEG representation learning.",
        "Transferable neural features as a central research focus.",
        "Semantic information as a guide for representation learning."
      ],
      "steps": [
        "EEG signals",
        "Latent prediction",
        "Transferable representations"
      ],
      "code": null,
      "relatedPublication": null,
      "stack": [],
      "image": null
    },
    {
      "id": "project-celp",
      "category": "Self-supervised learning",
      "name": "CELP",
      "subtitle": "Continuous EEG Latent Predictive Encoder",
      "date": "Jan. 2026 – May 2026",
      "teaser": "A continuous EEG encoder that explores latent representation prediction as a self-supervised approach to learning transferable semantic neural representations.",
      "tags": [
        "Continuous EEG",
        "Self-supervised learning"
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
      "relatedPublication": null,
      "stack": [],
      "image": null
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
        "Semantic decoding",
        "Multi-scale modeling"
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
        "Imagined speech",
        "EEG",
        "GAN",
        "Mel-spectrograms"
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
      "image": null
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
        "KoBART",
        "News crawling"
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
      "name": "EEG–LLM",
      "subtitle": "Motor Imagery Classification with an LLM",
      "date": "Apr. 2024 – Oct. 2024",
      "teaser": "A fine-tuned large language model for non-invasive EEG motor imagery task classification.",
      "tags": [
        "EEG",
        "Motor imagery",
        "LLM fine-tuning"
      ],
      "goal": "Develop and evaluate an LLM-based approach to EEG motor imagery classification.",
      "contributionLabel": "My contribution",
      "contributions": [
        "Performed neural signal preprocessing and designed model inputs.",
        "Developed and evaluated a fine-tuned language model.",
        "Conducted experiments and performance analysis."
      ],
      "steps": [
        "EEG preprocessing",
        "LLM input design",
        "Classification & evaluation"
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
        "alt": "EEG–LLM: feature extraction, JSON conversion, and LLM fine-tuning pipeline",
        "caption": "EEG–LLM · IEEE CW 2024"
      }
    },
    {
      "id": "project-neurodecoder",
      "category": "Brain–computer interfaces",
      "name": "NeuroDecoder",
      "subtitle": "Imagined Speech for Alternative Communication",
      "date": "Mar. 2023 – Nov. 2023",
      "teaser": "Imagined speech decoding research for alternative communication in individuals with aphasia.",
      "tags": [
        "Imagined speech",
        "Alternative communication",
        "BCI"
      ],
      "goal": "Explore imagined speech BCI for alternative communication.",
      "contributionLabel": "My contribution",
      "contributions": [
        "Designed and conducted imagined-speech EEG experiments.",
        "Performed EEG signal preprocessing.",
        "Extracted signal features for alternative communication and BCI development."
      ],
      "steps": [
        "Experiment design",
        "EEG preprocessing",
        "Feature extraction"
      ],
      "code": null,
      "relatedPublication": null,
      "stack": [],
      "image": null
    },
    {
      "id": "project-inner-speech",
      "name": "Inner Speech EEG",
      "category": "EEG signal processing & analysis",
      "subtitle": "Inner Speech Decoding & Functional Connectivity",
      "date": "",
      "teaser": "A reproducible analysis pipeline for the public Inner Speech EEG dataset, covering preprocessing, grouped CSP classification, and exploratory task/rest connectivity.",
      "tags": [
        "Inner speech",
        "Functional connectivity",
        "Public EEG data"
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
      "code": "https://github.com/Myeongjuuu/Inner_Speech_Decoding",
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
      "organization": "Capstone Design Competition",
      "detail": "Department of Computer and Artificial Intelligence Engineering, Pukyong National University"
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
      "organization": "2023 KSEE Annual Conference",
      "detail": "Korean Society for Engineering Education"
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
  ]
};
