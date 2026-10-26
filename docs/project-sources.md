# Project technology sources

Technology badges reflect source dependencies and imports rather than a common assumed stack.

- **EEG–LLM**: [requirements.txt](https://github.com/Myeongjuuu/EEG-LLM/blob/main/requirements.txt), [training utilities](https://github.com/Myeongjuuu/EEG-LLM/blob/main/task/train_utils.py), and [CSP](https://github.com/Myeongjuuu/EEG-LLM/blob/main/features/CSP/CSP.py). Python, OpenAI API, MNE, scikit-learn, and NumPy. Its figure is the existing paper figure.
- **TADA**: [project dependencies](https://github.com/Myeongjuuu/TADA/blob/main/pyproject.toml), [models](https://github.com/Myeongjuuu/TADA/blob/main/src/tada/models.py), and [README](https://github.com/Myeongjuuu/TADA/blob/main/README.md). Python, PyTorch, MNE, scikit-learn, h5py, and optional Brainiak/SRM. The README explicitly identifies the Multi-Scale ECoG paper.
- **Inner Speech EEG**: [project dependencies](https://github.com/Myeongjuuu/Inner_Speech_Decoding/blob/main/pyproject.toml), [classification](https://github.com/Myeongjuuu/Inner_Speech_Decoding/blob/main/src/inner_speech/classification.py), and [preprocessing](https://github.com/Myeongjuuu/Inner_Speech_Decoding/blob/main/src/inner_speech/preprocessing.py). Python, MNE, MNE-Connectivity, scikit-learn, SciPy, and pandas. The public-dataset analysis is presented separately from the historical NeuroDecoder project; no validated group-level result is claimed.
- **ESSENTI**: BERT and KoBART were already explicitly identified in the portfolio's project description.
- **BLPM, CELP, NeuralSpeech, NeuroDecoder**: no language/framework badges are inferred. Existing descriptions and research methods remain visible until matching source code is supplied.

Projects without a representative image use a text-only layout. Approach steps remain available in the optional research details.

The About section's Technical Skills list was supplied directly by the owner and replaces the earlier repository-derived summary. Repository evidence above still applies to individual project stacks. The website's own React/TypeScript implementation is not used as evidence of the portfolio owner's skills.
