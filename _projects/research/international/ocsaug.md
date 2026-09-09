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

## 1. Contributions

- Proposes the first <span style="color: var(--global-theme-color); font-weight:600;">diffusion-model-based data augmentation method</span> for OCSR that realistically reproduces hand-drawn style.
- Introduces a <span style="color: var(--global-theme-color); font-weight:600;">horizontal/vertical stripe masking strategy</span> that preserves molecular topology while maximizing visual diversity.
- Presents a <span style="color: var(--global-theme-color); font-weight:600;">SMILES label transfer</span> procedure that automatically labels augmented images without manual annotation.
- Provides <span style="color: var(--global-theme-color); font-weight:600;">comprehensive validation</span> across four state-of-the-art OCSR models and an independently collected real-world hand-drawn dataset.

---

## 2. Introduction

Digitizing molecular structures drawn by hand is a key bottleneck in mining chemical literature for drug discovery. Optical Chemical Structure Recognition (OCSR) models achieve strong accuracy on clean, digitally-rendered molecule images, but their performance drops sharply on **hand-drawn** structures, where irregular strokes, inconsistent handwriting styles, and varying line thickness are common. The core reason is data scarcity: the largest public benchmark, DECIMER[[1]](#ref-1), contains only 5,088 hand-drawn molecule images, far too few to train deep models robustly.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig1.png" title="Fig. 1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1. Digitally rendered vs. hand-drawn chemical structure images, illustrating the visual gap OCSAug addresses.
</div>

Prior augmentation tools such as RDKit and Randepict rely on generic image transformations (rotation, blur, noise), which fail to reproduce the specific visual characteristics of handwriting. **OCSAug** addresses this gap with a <span style="color: var(--global-theme-color); font-weight:600;">diffusion-model-based augmentation pipeline</span> that generates realistic hand-drawn variations while preserving the underlying molecular topology, together with an automatic labeling procedure that requires no manual annotation.

This work extends an earlier oral presentation at the 2024 KIPS Annual Symposium (ASK 2024)[[2]](#ref-2) into a full journal paper published in *The Journal of Supercomputing* (Springer, 2025)[[3]](#ref-3).

---

## 3. Method

OCSAug consists of three stages: <span style="color: var(--global-theme-color); font-weight:600;">DDPM pretraining → RePaint-based data augmentation → OCSR fine-tuning</span>.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/OCSAug/overview.png" title="Fig. 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 2. Overview of the OCSAug pipeline. (A) A DDPM is trained on hand-drawn molecule images. (B) The pretrained DDPM is used inside a RePaint loop (masking, inpainting, resampling) with SMILES label transfer to generate augmented pairs. (C) The augmented data is used to fine-tune the OCSR model.
</div>

### 3.1 DDPM Pretraining

A Denoising Diffusion Probabilistic Model (DDPM) is pretrained on the original hand-drawn training set to learn the visual distribution of hand-drawn molecular structures. Through the forward process (progressively adding noise) and the backward process (learning to remove it), the model captures the characteristic strokes and symbol patterns of handwriting.

### 3.2 RePaint-based Data Augmentation

Simply sampling brand-new images from the pretrained DDPM would discard the original molecular structure entirely, making the resulting images useless for augmentation. There would be no way to know what molecule they depict. Instead, the pretrained DDPM is used with the RePaint[[4]](#ref-4) algorithm, which regenerates only a masked region of an image while conditioning on the untouched pixels around it. Because most of the image stays fixed, the surrounding strokes constrain what the DDPM can generate, so the molecular topology is preserved even as local strokes are redrawn with new handwriting-like variation, which is exactly why RePaint, rather than unconditional generation, was chosen for this step.

- **Mask design**: two complementary stripe masks are used: a **vertical stripe mask**, which perturbs atom-symbol shapes, and a **horizontal stripe mask**, which perturbs bond length and thickness. Together they preserve molecular topology while introducing visual diversity.
- **Inpainting**: at every reverse diffusion step, the *known* (unmasked) region is obtained by forward-diffusing the original image to the matching noise level, while the *unknown* (masked) region is generated by the pretrained DDPM's reverse step; the two are then composited back into a single image before moving to the next step.
- **Resampling**: naively composing the known and generated regions at each step often leaves the two halves out of sync. The DDPM has already committed to a semantic layout for its neighbors before it can see the newly revealed known pixels, which tends to produce a rough, disharmonious patch rather than a coherent structure. RePaint addresses this by occasionally diffusing the composited image *forward* again and re-running the reverse step several times at the same noise level before advancing, effectively giving the model repeated chances to reconcile the generated strokes with the surrounding context. This inpainting-plus-resampling loop, closely following the resampling procedure introduced in the original RePaint paper[[4]](#ref-4), is what lets OCSAug produce a *different but complete and structurally faithful* hand-drawn rendering rather than a locally patched-over version of the original.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig3.png" title="Fig. 3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 3. Two types of masks used in OCSAug: (A) vertical stripe mask and (B) horizontal stripe mask.
</div>

### 3.3 SMILES Label Transfer

Manually re-annotating every augmented image with its correct SMILES string would be slow, expensive, and error-prone, and would cap how much augmented data could realistically be produced. This is only avoidable because the RePaint step above never changes the underlying molecular graph. It only perturbs local strokes while keeping the topology intact. That guarantee is what makes label transfer possible: the SMILES label *y* of the original image (*x*, *y*) can simply be transferred directly to the newly generated image *x**, producing a labeled pair (*x**, *y*) with no manual annotation required.

### 3.4 Fine-tuning

This step fine-tunes the downstream **OCSR recognition model** (not the DDPM used for augmentation, which stays frozen once pretraining is complete). Fine-tuning is used instead of training an OCSR model from scratch because the OCSR model already generalizes well on clean, digitally-rendered structures; the goal here is only to adapt it to the visual style of hand-drawn strokes without losing that existing recognition ability. The OCSR model, initially pretrained on the original data, is therefore fine-tuned on the augmented dataset using a small learning rate, with selected layers optionally frozen for more stable adaptation.

---

## 4. Results

**Dataset.** The DECIMER[[1]](#ref-1) hand-drawn benchmark (5,088 images) was filtered for drug-likeness, yielding 3,194 images (2,604 train / 290 validation / 300 test).

### 4.1 Generation Quality Evaluation (FID)

Fréchet Inception Distance (FID) measures how closely generated images match the real hand-drawn distribution, where lower is better.

<table class="table table-bordered">
  <thead>
    <tr><th>Augmentation Method</th><th>FID ↓</th></tr>
  </thead>
  <tbody>
    <tr><td>RDKit</td><td>10.581</td></tr>
    <tr><td>Randepict</td><td>4.054</td></tr>
    <tr><td><strong>OCSAug</strong></td><td><strong style="color: var(--global-theme-color);">0.471</strong></td></tr>
  </tbody>
</table>

OCSAug produces images that most closely match the real hand-drawn data distribution among all compared methods. Fig. 4 shows this qualitatively, and Fig. 5 confirms it with a t-SNE projection of the generated vs. real image distributions.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig4.png" title="Fig. 4" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig5.png" title="Fig. 5" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 4 (left): qualitative comparison of synthetic hand-drawn images generated by RDKit, Randepict, and OCSAug. Fig. 5 (right): t-SNE visualization of augmented vs. original hand-drawn images for the same three methods, together with their FID scores.
</div>

### 4.2 OCSR Recognition Improvement

Improvement Ratio (IR) is computed from Tanimoto similarity gains relative to a non-fine-tuned baseline.

<table class="table table-bordered">
  <thead>
    <tr><th>Condition</th><th>Improvement Ratio (over baseline)</th></tr>
  </thead>
  <tbody>
    <tr><td>Fine-tuning only (no augmentation)</td><td>1.451 – 3.259×</td></tr>
    <tr><td>Randepict augmentation</td><td>1.570 – 3.523×</td></tr>
    <tr><td><strong>OCSAug augmentation</strong></td><td><strong style="color: var(--global-theme-color);">1.918 – 3.820×</strong></td></tr>
  </tbody>
</table>

The improvement holds consistently across four different OCSR models: **MolScribe[[5]](#ref-5), I2S[[6]](#ref-6), MolNexTR[[7]](#ref-7), and MPOCSR[[8]](#ref-8)**, with OCSAug augmentation giving the largest gain in every case. Fig. 6 breaks this down by model, and Fig. 7 shows representative correct and misclassified predictions.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig8.png" title="Fig. 6" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig9.png" title="Fig. 7" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 6 (left): Improvement Ratio (IR) across MolScribe, I2S, MolNexTR, and MPOCSR under no-augmentation, RDKit, Randepict, and OCSAug conditions. Fig. 7 (right): examples of correct and misclassified OCSR predictions by MolScribe on the drug-likeness DECIMER test set.
</div>

### 4.3 Mask Thickness Sensitivity

Average RMSE against the original image was measured for different stripe-mask thicknesses.

<table class="table table-bordered">
  <thead>
    <tr><th>Stripe Thickness</th><th>Mean RMSE</th><th>Interpretation</th></tr>
  </thead>
  <tbody>
    <tr><td>1 – 2</td><td>1.29 ± 0.18</td><td>Nearly identical to the original, limited diversity</td></tr>
    <tr><td><strong style="color: var(--global-theme-color);">4</strong></td><td><strong style="color: var(--global-theme-color);">1.46 ± 0.18</strong></td><td><strong>Best balance of diversity and structure preservation</strong></td></tr>
    <tr><td>8 – 16</td><td>1.58 – 1.68</td><td>Excessive distortion</td></tr>
  </tbody>
</table>

Fig. 8 shows example outputs at each stripe thickness, and Fig. 9 shows the corresponding RMSE distributions; together they explain why a thickness of 4 was selected as the best trade-off between diversity and structural fidelity.

At thickness 1–2, the masked-and-regenerated region is so narrow that the DDPM has almost nothing to change, so the output looks nearly identical to the original; diversity is too low to be useful for augmentation. As the stripe widens toward 4, the model has enough room to redraw atom symbols and bond strokes with new handwriting-like variation while the surrounding structure still anchors the topology, so the molecule stays recognizable. Beyond that, at thickness 8–16, the masked region becomes so wide that the DDPM starts hallucinating strokes disconnected from the original layout, producing visibly distorted or broken structures.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig6.png" title="Fig. 8" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 8. Molecular structure images generated with stripe thicknesses of 1, 2, 4, 8, and 16 (horizontal and vertical masks).
</div>

This qualitative pattern is confirmed quantitatively in Fig. 9, which plots the RMSE distribution between generated and original images for each stripe thickness. RMSE stays low and tightly clustered at thickness 1–2 (limited diversity), rises to a moderate, well-balanced range at thickness 4, and spreads much wider at thickness 8–16 as regeneration becomes less constrained by the original structure, matching the <span style="color: var(--global-theme-color); font-weight:600;">Mean RMSE</span> values reported in the table above.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig7.png" title="Fig. 9" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 9. RMSE distributions of generated images across the different stripe thicknesses.
</div>

### 4.4 Real-World Hand-drawn Evaluation

On an independently collected dataset of 463 hand-drawn images covering 88 drug compounds, the OCSAug-augmented model achieved an exact-match rate (Tanimoto = 1.0) of <strong style="color: var(--global-theme-color);">37.4%</strong>, compared to **36.6%** without augmentation, confirming that the benchmark gains generalize to real hand-drawn data.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/OCSAug/fig10.png" title="Fig. 10" class="img-fluid rounded z-depth-1" %}
    </div>
  </div>
<div class="caption">
    Fig. 10. (A) Accuracy across Tanimoto similarity thresholds and (B) example recognition results on the real-world hand-drawn dataset, evaluating OCSAug's generalization performance.
</div>

---

## References

1. <a id="ref-1"></a>Rajan, K., Brinkhaus, H. O., Zielesny, A., & Steinbeck, C. (2022). DECIMER: hand-drawn molecule images dataset. *Journal of Cheminformatics, 14*, 36.
2. <a id="ref-2"></a>Kim, J. H., Song, T. W., & Choi, J. (2024). A Study on DDPM-based Molecular Generation and Semi-Supervised Learning for Improving the Performance of Optical Chemical Structure Recognition. *Annual Symposium of KIPS (ASK)*.
3. <a id="ref-3"></a>Kim, J. H., & Choi, J. (2025). OCSAug: diffusion-based optical chemical structure data augmentation for improved hand-drawn chemical structure image recognition. *The Journal of Supercomputing, 81*, Article 926.
4. <a id="ref-4"></a>Lugmayr, A., Danelljan, M., Romero, A., Yu, F., Timofte, R., & Van Gool, L. (2022). RePaint: Inpainting using Denoising Diffusion Probabilistic Models. *CVPR 2022*.
5. <a id="ref-5"></a>Qian, Y., Guo, J., Tu, Z., Li, Z., Coley, C. W., & Barzilay, R. (2023). MolScribe: Robust Molecular Structure Recognition with Image-to-Graph Generation. *Journal of Chemical Information and Modeling*.
6. <a id="ref-6"></a>Rajan, K., Zielesny, A., & Steinbeck, C. (2021). DECIMER 1.0: deep learning for chemical image recognition using transformers (I2S). *Journal of Cheminformatics, 13*, 61.
7. <a id="ref-7"></a>Chen, Y., et al. (2024). MolNexTR: a generalized deep learning model for molecular image recognition. *Journal of Cheminformatics, 16*, 141.
8. <a id="ref-8"></a>Lin, F., & Li, J. (2024). MPOCSR: optical chemical structure recognition based on multi-path Vision Transformer. *Complex & Intelligent Systems, 10*(6), 7553–7563.

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
