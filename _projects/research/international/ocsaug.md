---
layout: page
title: OCSAug
description: "OCSAug: Diffusion-based Optical Chemical Structure Data Augmentation for Improved Hand-drawn Chemical Structure Image Recognition"
img: assets/project/OCSAug/overview_thumb.png
importance: 3
categories: [Research]
related_publications: false
links:
  - label: Paper
    url: https://link.springer.com/article/10.1007/s11227-025-07406-4
  - label: Code
    url: https://github.com/jjjabcd/OCSAug
tags:
  - The Journal of Supercomputing
  - EN
toc:
  sidebar: left
---

<blockquote style="font-size: 0.875rem;">
<em>Note: This article was drafted with AI assistance and reviewed by Jin Hyuk Kim.</em>
</blockquote>

<div class="projects">
<div class="project-tags project-tags-links">
<a href="https://link.springer.com/article/10.1007/s11227-025-07406-4" class="tag" target="_blank" rel="noopener"><i class="fa-solid fa-file-pdf"></i> Paper</a>
<a href="https://github.com/jjjabcd/OCSAug" class="tag" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
</div>
</div>

## Overview

OCSR models accurately recognize molecular structures in clean, digitally rendered images but often perform poorly on **hand-drawn** depictions. This performance gap arises largely from the scarcity of hand-drawn training data—DECIMER [3] contains only 5,088 images—and the inability of conventional depiction tools such as RDKit and RanDepict to adequately reproduce the visual characteristics of real hand-drawn molecules.

**OCSAug** addresses this limitation through a <span style="color: var(--global-theme-color); font-weight:600;">diffusion-model-based augmentation pipeline</span> that generates realistic hand-drawn variations while preserving the underlying molecular structure. Because each augmented image retains the original molecule, its SMILES label can be transferred automatically, eliminating the need for manual annotation. The journal article [1] extends work first presented at ASK 2024 [8].

---

## Contributions

- OCSAug introduces the first <span style="color: var(--global-theme-color); font-weight:600;">diffusion-based augmentation method</span> designed specifically for hand-drawn OCSR.
- Its <span style="color: var(--global-theme-color); font-weight:600;">stripe-masking strategy</span> increases visual diversity while preserving molecular topology.
- The original <span style="color: var(--global-theme-color); font-weight:600;">SMILES labels are transferred automatically</span> to the augmented images, eliminating the need for manual annotation.
- The method is evaluated using four OCSR models and an independently collected real-world hand-drawn dataset.

---

## Method

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/OCSAug/overview.png" title="OCSAug Overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (A) A DDPM is trained on hand-drawn molecular images. (B) Selected regions are masked, inpainted, and resampled using RePaint and the trained DDPM, after which the original SMILES label is assigned to the augmented image. (C) The OCSR model is fine-tuned on the augmented dataset.
</div>

A DDPM is first trained to capture the visual characteristics of hand-drawn molecular images. Selected image regions are then masked and regenerated using [RePaint](https://arxiv.org/abs/2201.09865) [2] and the trained DDPM. **Vertical stripe masks** target atom-symbol regions, whereas **horizontal stripe masks** target bond regions, introducing visual variation while preserving the molecular structure. Because the molecular structure remains unchanged, the original SMILES label can be assigned directly to each augmented image. The OCSR model is subsequently fine-tuned on the augmented dataset.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig3.png" title="Fig. 3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 3. The two stripe-mask designs: (A) vertical and (B) horizontal.
</div>

A stripe width of 4 pixels provided the best trade-off between visual diversity and structural fidelity.

---

## Results

The method was evaluated on the drug-like subset of DECIMER [3], comprising 3,194 images.

**Generation quality (FID, lower is better):**

<table class="table table-bordered">
  <thead>
    <tr><th>Method</th><th>FID ↓</th></tr>
  </thead>
  <tbody>
    <tr><td>RDKit</td><td>10.581</td></tr>
    <tr><td>RanDepict</td><td>4.054</td></tr>
    <tr><td><strong>OCSAug</strong></td><td><strong style="color: var(--global-theme-color);">0.471</strong></td></tr>
  </tbody>
</table>

**Recognition improvement (Tanimoto-based improvement ratio):**

<table class="table table-bordered">
  <thead>
    <tr><th>Condition</th><th>Improvement Ratio</th></tr>
  </thead>
  <tbody>
    <tr><td>Fine-tuning only</td><td>1.451 – 3.259×</td></tr>
    <tr><td>RanDepict augmentation</td><td>1.570 – 3.523×</td></tr>
    <tr><td><strong>OCSAug augmentation</strong></td><td><strong style="color: var(--global-theme-color);">1.918 – 3.820×</strong></td></tr>
  </tbody>
</table>

OCSAug consistently improved recognition performance across all four OCSR models: MolScribe [5], I2S [4], MolNexTR [6], and MPOCSR [7].

**Real-world generalization:** On an independently collected set of 463 hand-drawn images, exact-match accuracy improved from 36.6% to <strong style="color: var(--global-theme-color);">37.4%</strong>, indicating that the performance gains extend beyond the benchmark dataset.

*For further details, please refer to the full paper.*

---

## References

1. Kim, J. H., & Choi, J. (2025). OCSAug: diffusion-based optical chemical structure data augmentation for improved hand-drawn chemical structure image recognition. *The Journal of Supercomputing, 81*, Article 926.
2. Lugmayr, A., Danelljan, M., Romero, A., Yu, F., Timofte, R., & Van Gool, L. (2022). RePaint: Inpainting using Denoising Diffusion Probabilistic Models. *CVPR 2022*.
3. Rajan, K., Brinkhaus, H. O., Zielesny, A., & Steinbeck, C. (2022). DECIMER — hand-drawn molecule images dataset. *Journal of Cheminformatics, 14*, 36.
4. Rajan, K., Zielesny, A., & Steinbeck, C. (2021). DECIMER 1.0: deep learning for chemical image recognition using transformers (I2S). *Journal of Cheminformatics, 13*, 61.
5. Qian, Y., Guo, J., Tu, Z., Li, Z., Coley, C. W., & Barzilay, R. (2023). MolScribe: Robust Molecular Structure Recognition with Image-to-Graph Generation. *Journal of Chemical Information and Modeling*.
6. Chen, Y., et al. (2024). MolNexTR: a generalized deep learning model for molecular image recognition. *Journal of Cheminformatics, 16*, 141.
7. Lin, F., & Li, J. (2024). MPOCSR: optical chemical structure recognition based on multi-path Vision Transformer. *Complex & Intelligent Systems, 10*(6), 7553–7563.
8. Kim, J. H., Song, T. W., & Choi, J. (2024). A Study on DDPM-based Molecular Generation and Semi-Supervised Learning for Improving the Performance of Optical Chemical Structure Recognition. *Annual Symposium of KIPS (ASK)*.

---

## BibTeX

```
@article{kim2025ocsaug,
  title={OCSAug: diffusion-based optical chemical structure data augmentation for improved hand-drawn chemical structure image recognition},
  author={Kim, Jin Hyuk and Choi, Jonghwan},
  journal={The Journal of Supercomputing},
  volume={81},
  number={8},
  pages={926},
  year={2025},
  publisher={Springer}
}
```
