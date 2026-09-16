# HuoBu's Materials Property Prediction Library

A searchable research library for materials property prediction. It turns structured, source-linked paper records into a static GitHub Pages site.

## Research focus

- **Primary:** Materials Property Prediction
- **Related topics:** Materials Informatics, Crystal Graph Neural Networks, and Machine-Learned Interatomic Potentials
- **Reading language:** Chinese explanations with mixed Chinese and English technical terms
- **Daily schedule:** 08:00 Asia/Shanghai

The initial Paper Pool contains two open-access studies: one on transfer learning for small materials datasets and one on out-of-distribution evaluation. Each paper has a Chinese Quick Read and a source-linked detailed report. The Daily Archive records the initial recommendation and can accumulate future daily recommendations.

## Run locally

```bash
npm ci
npm run dev
```

## Verify and build

```bash
npm run verify
npm run build
```

GitHub Pages deploys automatically from `main` through `.github/workflows/pages.yml`. A project repository is published at `https://<owner>.github.io/<repository>/`.

## Daily updates

Use `prompts/chatgpt-scheduled-task.md` to set up a recurring task with repository access. Each run reads the research profile and current library, selects one paper, prepares a Quick Read and evidence-backed report, validates the record, and adds a dated entry to Daily Archive. The schedule and timezone are in `config/research-profile.yaml`.

The public site is read-only until the optional editor backend is configured. Do not commit credentials or API keys.
