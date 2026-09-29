---
layout: page
title: MORSE
description: "Agentic Multi-objective Molecular Optimization via Dynamic Routing of Property-specific Editor Networks"
img: assets/project/MORSE/overview_thumb.png
importance: 2
categories: [Research]
related_publications: false
links:
  - label: Code
    url: https://github.com/jjjabcd/MORSE
tags:
  - AI4Sci Korea 2026
  - EN
toc:
  sidebar: left
---

<blockquote style="font-size: 0.875rem;">
<em>Note: This article was drafted with AI assistance and reviewed by Jin Hyuk Kim.</em>
</blockquote>

<div class="projects">
<div class="project-tags project-tags-links">
<a href="https://github.com/jjjabcd/MORSE" class="tag" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
</div>
</div>

## Overview

- **Task:** Multi-objective molecular optimization (MMO) aims to improve several competing chemical properties simultaneously, such as blood-brain barrier permeability and binding activity, while preserving the original molecular structure.
- **Limitation of prior work:** Existing LLM-based approaches attempt to satisfy all requested property changes in a <span style="color: var(--global-theme-color); font-weight:600;">single generation step</span>, placing a heavy burden on a single decoding pass.
- **Our idea:** <span style="color: var(--global-theme-color); font-weight:600;">MORSE</span> reframes MMO as a sequential decision process: an LLM-based router repeatedly chooses which property-specific editor to apply next, or when to stop, based on the current state of the molecule.
- **Venue:** MORSE was presented as a poster at <span style="color: var(--global-theme-color); font-weight:600;">AI4Sci Korea 2026</span> (Sep 28 – Oct 1, 2026, Seoul Dragon City) by Jin Hyuk Kim and Jonghwan Choi of Hallym University.

---

## 1. Method

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/MORSE/overview.png" title="Fig. 1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1. Overview of the proposed framework. At each timestep, an LLM-based router either selects a property-specific editor or terminates the optimization based on the current molecule. The selected editor produces an intermediate molecule, which is then used in the next routing decision.
</div>

MORSE has two trainable parts: a set of **property-specific editors** that propose local edits, and an **LLM-based router** that decides which editor to apply at each step.

### 1.1 Property-specific Editors

- Each target property (BBBP, DRD2, plogP, and QED) has a dedicated structure-constrained molecular VAE editor.
- All editors share a single <span style="color: var(--global-theme-color); font-weight:600;">property-agnostic foundation model</span> (a Transformer-based VAE), while a separate LoRA module [[1]](#ref-1) provides property-specific specialization for each editor.

#### Phase 1: Pretraining

- The property-agnostic foundation model is pretrained on the ChEMBL database, first using a molecular reconstruction objective and then using structure-constrained generation objectives.
- The resulting checkpoint is shared and kept frozen across all property-specific editors.

#### Phase 2: SFT w/ LoRA

- For each target property, a separate LoRA module is applied to the decoder of the frozen foundation model.
- Each LoRA module undergoes supervised fine-tuning (SFT) on property-specific molecular pairs.

#### Phase 3: RL w/ LoRA

- Each LoRA module is further optimized via KL-anchored reinforcement learning (RL).
- The property reward is balanced against the reference log-likelihood, so each editor improves its property without drifting from the SFT model.

### 1.2 Router

#### MDP Formulation

- **State:** The instruction is enriched with the current molecule, its Lipinski descriptors, and its current target-property scores, then encoded by a frozen Qwen2.5-7B-Instruct model [[2]](#ref-2); the mean-pooled representation is the state $$s_t$$.
- **Action:** One of the property-specific editors, or a termination action.
- **Transition:** The selected editor generates candidates from the current molecule, and the candidate with the highest reward (Section 1.3) becomes the next molecule $$m_{t+1}$$.
- **Termination:** An episode ends when the router selects the termination action or reaches the maximum number of timesteps.

#### Training

- Only the MLP-based policy and value networks are trained; the LLM encoder and all editors stay frozen.
- The policy and value networks are optimized using proximal policy optimization (PPO) [[3]](#ref-3), <span style="color: var(--global-theme-color); font-weight:600;">without any ground-truth editor sequence</span>.
- During both training and inference, the router samples an action from the categorical distribution predicted by the policy.

### 1.3 Reward

The molecular reward is a weighted sum of structural similarity to the initial molecule and the proportion of improved target properties:

$$
R(m_t, m_0) =
\begin{cases}
0, & \text{if } m_t = m_0 \text{ or } \mathrm{Sim}(m_t, m_0) < \delta, \\
\alpha \cdot \mathrm{Sim}(m_t, m_0) + (1 - \alpha) \cdot \mathrm{Imp}(m_t, m_0), & \text{otherwise.}
\end{cases}
$$

- $$\mathrm{Sim}(m_t, m_0)$$: Tanimoto similarity [[4]](#ref-4) between $$m_t$$ and $$m_0$$.
- $$\mathrm{Imp}(m_t, m_0)$$: proportion of target properties improved in the requested directions relative to $$m_0$$.
- $$\alpha$$: balance between the two terms (0.5); $$\delta$$: minimum similarity threshold (0.4).
- The difference in molecular reward between consecutive states is used as the step-wise reward for router training.

---

## 2. Main Results

**Setup:** MORSE is evaluated on three tasks from the MuMOInstruct benchmark [[5]](#ref-5), each combining three of four properties (BBBP, DRD2, plogP, QED), under both seen and unseen instruction templates.

<div class="pretty-table" markdown="1">

<table class="table table-bordered">
  <thead>
    <tr><th rowspan="2">Task</th><th rowspan="2">Model</th><th colspan="3">Seen</th><th colspan="3">Unseen</th></tr>
    <tr><th>SR</th><th>Sim</th><th>SR&times;Sim</th><th>SR</th><th>Sim</th><th>SR&times;Sim</th></tr>
  </thead>
  <tbody>
    <tr><td rowspan="2">BDP</td><td>RePO</td><td>0.206</td><td><strong>0.569</strong></td><td>0.117</td><td>0.198</td><td><strong>0.572</strong></td><td>0.113</td></tr>
    <tr><td><strong>MORSE</strong></td><td><strong style="color: var(--global-theme-color);">0.736</strong></td><td>0.314</td><td><strong style="color: var(--global-theme-color);">0.231</strong></td><td><strong style="color: var(--global-theme-color);">0.730</strong></td><td>0.301</td><td><strong style="color: var(--global-theme-color);">0.220</strong></td></tr>
    <tr><td rowspan="2">BDQ</td><td>RePO</td><td>0.160</td><td><strong>0.365</strong></td><td>0.058</td><td>0.170</td><td><strong>0.322</strong></td><td>0.055</td></tr>
    <tr><td><strong>MORSE</strong></td><td><strong style="color: var(--global-theme-color);">0.718</strong></td><td>0.239</td><td><strong style="color: var(--global-theme-color);">0.172</strong></td><td><strong style="color: var(--global-theme-color);">0.748</strong></td><td>0.230</td><td><strong style="color: var(--global-theme-color);">0.172</strong></td></tr>
    <tr><td rowspan="2">BPQ</td><td>RePO</td><td>0.274</td><td><strong>0.509</strong></td><td>0.140</td><td>0.242</td><td><strong>0.596</strong></td><td>0.144</td></tr>
    <tr><td><strong>MORSE</strong></td><td><strong style="color: var(--global-theme-color);">0.840</strong></td><td>0.235</td><td><strong style="color: var(--global-theme-color);">0.197</strong></td><td><strong style="color: var(--global-theme-color);">0.826</strong></td><td>0.231</td><td><strong style="color: var(--global-theme-color);">0.190</strong></td></tr>
  </tbody>
</table>

</div>
<div class="caption">
    Table 1. Performance comparison between MORSE and RePO <a href="#ref-6">[6]</a> on the MuMOInstruct benchmark.
</div>

**Key Findings:**

- MORSE consistently outperforms RePO in <span style="color: var(--global-theme-color); font-weight:600;">SR and SR&times;Sim</span> across all three tasks under both seen and unseen instruction settings.
- The comparable performance under seen and unseen instruction templates suggests that the router generalizes beyond the phrasing encountered during training.
- Although RePO achieves higher Sim, its substantially lower SR indicates that structural preservation alone is insufficient for multi-objective optimization. MORSE instead accepts a moderate reduction in similarity to achieve a substantially higher success rate.
- The current results remain preliminary because the evaluation covers only one benchmark. Moreover, MORSE depends on the quality of its individual editors, and a weak editor can limit the overall performance of the framework.

---

## References

<a id="ref-1"></a>[1] Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., & Chen, W. (2021). LoRA: Low-rank adaptation of large language models. *arXiv:2106.09685*.

<a id="ref-2"></a>[2] Yang, A., Yu, B., Li, C., Liu, D., Huang, F., Huang, H., Jiang, J., Tu, J., Zhang, J., Zhou, J., Lin, J., Dang, K., Yang, K., Yu, L., Li, M., Sun, M., Zhu, Q., Men, R., He, T., Xu, W., Yin, W., Yu, W., Qiu, X., Ren, X., Yang, X., Li, X., Xu, Z., & Zhang, Z. (2025). Qwen2.5-1M technical report. *arXiv:2501.15383*.

<a id="ref-3"></a>[3] Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). Proximal policy optimization algorithms. *arXiv:1707.06347*.

<a id="ref-4"></a>[4] Rogers, D., & Hahn, M. (2010). Extended-connectivity fingerprints. *Journal of Chemical Information and Modeling, 50*(5), 742–754.

<a id="ref-5"></a>[5] Dey, V., Hu, X., & Ning, X. (2025). Gellm3o: Generalizing large language models for multi-property molecule optimization. *Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*, 25192–25221.

<a id="ref-6"></a>[6] Li, X., Zhou, Z., Li, Z., Yao, J., Rong, Y., Zhang, L., & Han, B. (2026). Reference-guided policy optimization for molecular optimization via LLM reasoning. *arXiv:2603.05900*.
