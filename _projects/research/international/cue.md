---
layout: page
title: CUE
description: "CUE: A Chemical Uncertainty-Aware Embedding Framework for Multimodal Drug Selectivity Prediction"
img: assets/project/CUE/overview_thumb.png
importance: 1
categories: [Research]
related_publications: false
links:
  - label: Paper
    url: https://pubs.acs.org/doi/10.1021/acs.jcim.6c01761
  - label: Code
    url: https://github.com/jjjabcd/CUE
tags:
  - Journal of Chemical Information and Modeling
  - EN
toc:
  sidebar: left
---

<blockquote style="font-size: 0.875rem;">
<em>Note: This article was drafted with AI assistance and reviewed by Jin Hyuk Kim.</em>
</blockquote>

<div class="projects">
<div class="project-tags project-tags-links">
<a href="https://pubs.acs.org/doi/10.1021/acs.jcim.6c01761" class="tag" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines"></i> Paper</a>
<a href="https://github.com/jjjabcd/CUE" class="tag" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
</div>
</div>

## Overview

- **Task:** Drug selectivity describes how strongly a compound binds to its intended kinase target while avoiding interactions with closely related off-target kinases. It is a key determinant of both toxicity and therapeutic efficacy, and its measurement requires affinity values across an entire kinase panel [[1]](#ref-1).
- **Limitation of prior work:** Most computational approaches derive selectivity <span style="color: var(--global-theme-color); font-weight:600;">indirectly</span> by predicting per-target affinities with a DTA model and aggregating them [[2]](#ref-2). In these approaches, selectivity is not used as the direct learning objective, and errors from individual affinity predictions can accumulate in the resulting score. Multimodal QSAR models that predict selectivity directly instead rely on fixed, compound-independent fusion schemes [[3]](#ref-3)[[4]](#ref-4), applying the same modality weights to every compound.
- **Our idea:** <span style="color: var(--global-theme-color); font-weight:600;">CUE</span> directly predicts compound-level selectivity by fusing molecular fingerprints with 2D molecular structure image features. It uses <span style="color: var(--global-theme-color); font-weight:600;">per-compound weights derived from LTAU uncertainty estimates</span> [[5]](#ref-5), allowing the modality that represents a given molecule more reliably to contribute more to the fused representation.

---

## 1. Method

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/CUE/overview.png" title="Fig. 1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1. Overview of the CUE framework. Fingerprint and molecular image features are extracted using pretrained models and mapped to modality-specific embeddings. Uncertainty-aware weighted summation then combines them into a unified embedding for selectivity prediction.
</div>

CUE is trained in two stages. The first stage trains one MLP per modality and records the per-sample loss trajectories required for LTAU. The second stage fuses the modality embeddings for each molecule and trains the final regressor on the resulting representation.

### 1.1 Molecular Feature Extraction

- **Fingerprints (FP):** RDKit is used to generate 2,048-bit ECFP4 vectors [[6]](#ref-6) with a radius of 2, where each bit indicates the presence of a particular molecular substructure.
- **Molecular images (IMG):** The encoder of MolScribe [[7]](#ref-7), an OCSR model pretrained on PubChem, produces 1,024-dimensional features. Because the encoder was trained to recognize molecular structures from images, these features capture spatial patterns that fingerprints may not represent.
- Each modality is processed by a separate three-layer MLP whose final hidden layer produces a 32-dimensional embedding. This maps both modalities to a shared 32-dimensional space, allowing their embeddings to be combined.

### 1.2 Uncertainty Quantification via LTAU

Rather than applying the same fusion weights to every compound, CUE uses LTAU [[5]](#ref-5) to estimate <span style="color: var(--global-theme-color); font-weight:600;">how reliably each modality represents each molecule</span>. LTAU is a feature-based method that quantifies uncertainty from the evolution of each sample's prediction error during training rather than from only its final prediction.

- The absolute error of every training molecule is recorded at each epoch to form a loss trajectory. Each trajectory is then converted into a histogram using error bins shared across all molecules.
- For a query molecule, the error distributions of its $$K$$ nearest training molecules in the embedding space are averaged, and the Shannon entropy of that distribution is the uncertainty: $$u = -\sum_{b=1}^{B} \hat{p}_b \log \hat{p}_b$$.
- Higher entropy indicates that similar molecules were fitted less consistently, so the corresponding modality is treated as less reliable for that particular molecule. The default settings are $$B = 5{,}000$$ bins and $$K = 5$$ neighbors; performance is empirically insensitive to $$K$$ values ranging from 3 to 7.

### 1.3 Uncertainty-Aware Fusion and Prediction

The two embeddings are combined as a weighted sum whose weights are a softmax over negative uncertainties:

$$
h_{uni} = w_{FP}\, h_{FP} + w_{IMG}\, h_{IMG}, \qquad w_i = \frac{\exp(-u_i)}{\sum_{j \in \{FP,\, IMG\}} \exp(-u_j)}
$$

A modality therefore receives a weight inversely related to its uncertainty for that particular molecule. The unified embedding is passed to an MLP regressor trained with MSE loss to predict the selectivity score. Thus, the model is trained directly against compound-level selectivity labels.

---

## 2. Main Results

**Setup:** Eight benchmarks were constructed from ChEMBL v35 [[8]](#ref-8) by combining two affinity sources—DIS ($$K_d$$, 556 compounds) and INH ($$K_i$$, 1,824 compounds)—with four selectivity metrics (PI, Ssel, WS2, and RS2). The baselines include four DTA-based models (DeepDTA [[9]](#ref-9), GraphDTA [[10]](#ref-10), TEFDTA [[11]](#ref-11), and HMM-DTA [[12]](#ref-12)) and four QSAR-based models (ADMET-PrInt [[13]](#ref-13), ADMET-AI [[14]](#ref-14), MMFDL [[3]](#ref-3), and MMFRL [[4]](#ref-4)). All models were evaluated using compound-level five-fold cross-validation.

### 2.1 Comparison with Baselines

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/CUE/fig3_rmse.png" title="Fig. 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 2. RMSE comparison with DTA-based and QSAR-based baselines on (a–d) the DIS benchmarks and (e–h) the INH benchmarks. CUE is shown in red.
</div>

### 2.2 Fusion Strategy Comparison

To isolate the effect of the fusion step, CUE was compared with three fixed fusion strategies that apply the same scheme to every compound: element-wise summation (Sum), early concatenation (Concat(E)), and intermediate concatenation (Concat(I)).

<div class="pretty-table" markdown="1">

<table class="table table-bordered">
  <thead>
    <tr><th rowspan="2">Dataset</th><th colspan="4">RMSE rank &darr;</th><th colspan="4">PCC rank &darr;</th></tr>
    <tr><th>Sum</th><th>Concat(E)</th><th>Concat(I)</th><th>CUE</th><th>Sum</th><th>Concat(E)</th><th>Concat(I)</th><th>CUE</th></tr>
  </thead>
  <tbody>
    <tr><td>DIS-PI</td><td>3.0</td><td><strong>1.0</strong></td><td>4.0</td><td>2.0</td><td>3.0</td><td><strong>1.0</strong></td><td>4.0</td><td>2.0</td></tr>
    <tr><td>DIS-Ssel</td><td>4.0</td><td><strong>1.0</strong></td><td>3.0</td><td>2.0</td><td>4.0</td><td><strong>1.0</strong></td><td>3.0</td><td>2.0</td></tr>
    <tr><td>DIS-WS2</td><td>2.0</td><td>4.0</td><td>3.0</td><td><strong>1.0</strong></td><td>2.0</td><td>4.0</td><td>3.0</td><td><strong>1.0</strong></td></tr>
    <tr><td>DIS-RS2</td><td>3.0</td><td>4.0</td><td><strong>1.0</strong></td><td>2.0</td><td>3.0</td><td>4.0</td><td>2.0</td><td><strong>1.0</strong></td></tr>
    <tr><td>INH-PI</td><td>2.0</td><td>3.0</td><td>4.0</td><td><strong>1.0</strong></td><td>2.0</td><td>3.0</td><td>4.0</td><td><strong>1.0</strong></td></tr>
    <tr><td>INH-Ssel</td><td>2.0</td><td>4.0</td><td><strong>1.0</strong></td><td>3.0</td><td>2.0</td><td>4.0</td><td>3.0</td><td><strong>1.0</strong></td></tr>
    <tr><td>INH-WS2</td><td>3.0</td><td>4.0</td><td><strong>1.0</strong></td><td>2.0</td><td>3.0</td><td>4.0</td><td>2.0</td><td><strong>1.0</strong></td></tr>
    <tr><td>INH-RS2</td><td>2.0</td><td>4.0</td><td><strong>1.0</strong></td><td>3.0</td><td>3.0</td><td>4.0</td><td>2.0</td><td><strong>1.0</strong></td></tr>
    <tr><td><strong>Average</strong></td><td>2.6</td><td>3.1</td><td>2.2</td><td><strong style="color: var(--global-theme-color);">2.0</strong></td><td>2.8</td><td>3.1</td><td>2.9</td><td><strong style="color: var(--global-theme-color);">1.2</strong></td></tr>
  </tbody>
</table>

</div>
<div class="caption">
    Table 1. Ranks of the feature-fusion strategies across the eight benchmarks (1 = best).
</div>

### 2.3 Key Findings

- CUE achieved the <span style="color: var(--global-theme-color); font-weight:600;">lowest RMSE and highest $$R^2$$ on all eight benchmarks</span>, reducing error by 0.2% to 8.4% over the strongest baseline.
- DTA-based baselines showed negative $$R^2$$ values on most benchmarks, indicating poor agreement with the absolute scale of the selectivity scores and supporting the direct prediction of selectivity.
- CUE outperformed MMFRL despite using only two molecular representations compared with MMFRL's six, suggesting that adaptive modality weighting is more important than simply increasing the number of representations.
- Among the fusion strategies, CUE achieved the <span style="color: var(--global-theme-color); font-weight:600;">best average rank for both RMSE (2.0) and PCC (1.2)</span>. Although its RMSE advantage over Concat(I) (2.2) was small, CUE provided the most consistent performance across datasets.

*For further details, please refer to the full paper.*

---

## References

<a id="ref-1"></a>[1] Bosc, N., Meyer, C., & Bonnet, P. (2017). The use of novel selectivity metrics in kinase research. *BMC Bioinformatics, 18*, 1–12.

<a id="ref-2"></a>[2] Tian, Y., Lu, R., Gong, X., et al. (2025). Enhancing kinase-inhibitor activity and selectivity prediction through contrastive learning. *Nature Communications, 16*, 10860.

<a id="ref-3"></a>[3] Lu, X., Xie, L., Xu, L., Mao, R., Xu, X., & Chang, S. (2024). Multimodal fused deep learning for drug property prediction: Integrating chemical language and molecular graph. *Computational and Structural Biotechnology Journal, 23*, 1666–1679.

<a id="ref-4"></a>[4] Zhou, Z., Li, Y., Hong, P., & Xu, H. (2025). Multimodal fusion with relational learning for molecular property prediction. *Communications Chemistry, 8*, 200.

<a id="ref-5"></a>[5] Vita, J. A., Samanta, A., Zhou, F., & Lordi, V. (2025). LTAU-FF: Loss trajectory analysis for uncertainty in atomistic force fields. *Machine Learning: Science and Technology, 6*, 015048.

<a id="ref-6"></a>[6] Rogers, D., & Hahn, M. (2010). Extended-connectivity fingerprints. *Journal of Chemical Information and Modeling, 50*(5), 742–754.

<a id="ref-7"></a>[7] Qian, Y., Guo, J., Tu, Z., Li, Z., Coley, C. W., & Barzilay, R. (2023). MolScribe: Robust molecular structure recognition with image-to-graph generation. *Journal of Chemical Information and Modeling, 63*, 1925–1934.

<a id="ref-8"></a>[8] Hunter, F. M., Ioannidis, H., Bento, A. P., et al. (2025). Drug and clinical candidate drug data in ChEMBL. *Journal of Medicinal Chemistry, 68*, 19800–19827.

<a id="ref-9"></a>[9] Öztürk, H., Özgür, A., & Ozkirimli, E. (2018). DeepDTA: Deep drug–target binding affinity prediction. *Bioinformatics, 34*, i821–i829.

<a id="ref-10"></a>[10] Nguyen, T., Le, H., Quinn, T. P., Nguyen, T., Le, T. D., & Venkatesh, S. (2021). GraphDTA: Predicting drug–target binding affinity with graph neural networks. *Bioinformatics, 37*, 1140–1147.

<a id="ref-11"></a>[11] Li, Z., Ren, P., Yang, H., Zheng, J., & Bai, F. (2024). TEFDTA: A transformer encoder and fingerprint representation combined prediction method for bonded and non-bonded drug–target affinities. *Bioinformatics, 40*, btad778.

<a id="ref-12"></a>[12] Bidgoli, A. H., Mahdavi, M., & Malek, H. (2026). Structure-free drug–target affinity prediction using protein and molecule language models. *Journal of Cheminformatics*.

<a id="ref-13"></a>[13] Jamrozik, E., Śmieja, M., & Podlewska, S. (2024). ADMET-PrInt: Evaluation of ADMET properties: Prediction and interpretation. *Journal of Chemical Information and Modeling, 64*, 1425–1432.

<a id="ref-14"></a>[14] Swanson, K., Walther, P., Leitz, J., et al. (2024). ADMET-AI: A machine learning ADMET platform for evaluation of large-scale chemical libraries. *Bioinformatics, 40*, btae416.


---

## BibTeX

```
@article{kim2026cue,
  title={CUE: A Chemical Uncertainty-Aware Embedding Framework for Multimodal Drug Selectivity Prediction},
  author={Kim, Jin Hyuk and Kim, Gyeong Hwan and Park, Hyeon Jun and Choi, Jonghwan},
  journal={Journal of Chemical Information and Modeling},
  year={2026},
  publisher={ACS Publications}
}
```
