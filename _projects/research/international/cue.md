---
layout: page
title: CUE
description: "CUE: A Chemical Uncertainty-Aware Embedding Framework for Multi-modal Drug Selectivity Prediction"
img: assets/project/CUE/overview_thumb.png
importance: 1
categories: [Research]
related_publications: false
links:
  - label: Code
    url: https://github.com/jjjabcd/CUE
tags:
  - Under Review
  - EN
toc:
  sidebar: left
---

<blockquote style="font-size: 0.875rem;">
<em>Note: This article was drafted with AI assistance and reviewed by Jin Hyuk Kim.</em>
</blockquote>

<div class="projects">
<div class="project-tags project-tags-links">
<a href="https://github.com/jjjabcd/CUE" class="tag" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
</div>
</div>

<blockquote style="font-size: 0.875rem;">
<em>This paper is currently under review. Only a brief overview is provided here; a full write-up will be added once the review process is complete.</em>
</blockquote>

## 1. Contributions

- Proposes <span style="color: var(--global-theme-color); font-weight:600;">CUE</span>, a framework that directly predicts <span style="color: var(--global-theme-color); font-weight:600;">drug selectivity</span> from molecular structures, avoiding the cumulative-error problem of estimating selectivity indirectly from multiple Drug-Target Affinity (DTA) predictions.
- Designs a <span style="color: var(--global-theme-color); font-weight:600;">multi-modal feature integration scheme</span> that combines molecular fingerprints with 2D molecular structure image embeddings to capture complementary structural information.
- Introduces an <span style="color: var(--global-theme-color); font-weight:600;">uncertainty-aware fusion mechanism</span> based on Loss Trajectory Analysis for Uncertainty (LTAU), which adaptively reweights each modality per compound according to its predictive reliability.
- Validates CUE across multiple selectivity metrics and benchmark datasets, and demonstrates practical utility through a virtual screening case study on clinically challenging EGFR(T790M/C797S) double-mutant inhibitors.

---

## 2. Introduction

Drug selectivity, a compound's ability to bind its intended target while minimizing off-target interactions, is a key determinant of both therapeutic efficacy and clinical translation, but is costly to assess experimentally across a broad target panel. Prior computational approaches have largely estimated selectivity indirectly, by aggregating DTA predictions across multiple targets, which allows prediction errors from individual affinity estimates to accumulate and can compromise the reliability of the resulting selectivity scores.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/CUE/overview.png" title="Fig. 1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1. Overview of the proposed CUE framework. Multi-modal features from molecular fingerprints and 2D structure images are integrated through uncertainty-aware weighted fusion for direct selectivity prediction.
</div>

**CUE** instead predicts compound-level selectivity directly, integrating molecular fingerprints and 2D molecular structure image embeddings through <span style="color: var(--global-theme-color); font-weight:600;">LTAU-guided, uncertainty-aware weighted fusion</span> that adapts each modality's contribution on a per-compound basis. This work is currently under review; a detailed description of the method and full experimental results will be added to this page once the paper is published.

---

## BibTeX

```
@article{kim2026cue,
  title={CUE: A Chemical Uncertainty-Aware Embedding Framework for Multi-modal Drug Selectivity Prediction},
  author={Kim, Jin Hyuk and Kim, Gyeong Hwan and Park, Hyeon Jun and Choi, Jonghwan},
  year={2026},
  note={Under review}
}
```
