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
  - label: Dataset
    url: https://huggingface.co/datasets/NingLab/MuMOInstruct
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
<a href="https://huggingface.co/datasets/NingLab/MuMOInstruct" class="tag" target="_blank" rel="noopener"><i class="fa-solid fa-link"></i> Dataset</a>
</div>
</div>

## 1. Contributions

- Reformulates multi-objective molecular optimization (MMO) as <span style="color: var(--global-theme-color); font-weight:600;">sequential routing among property-specific editors</span>, separating what property to edit (router) from how to edit it (editor), instead of demanding both from a single generation step.
- Trains a <span style="color: var(--global-theme-color); font-weight:600;">shared property-agnostic foundation model</span> with lightweight per-property LoRA adapters, avoiding the cost of training a fully separate generator for every property.
- Trains the router with <span style="color: var(--global-theme-color); font-weight:600;">reinforcement learning without ground-truth editor sequences</span>, learning purely from a similarity and improvement based molecular reward.
- Makes the optimization process <span style="color: var(--global-theme-color); font-weight:600;">observable</span>: action-transition graphs and edit-path visualizations show which editors the router relies on for each property combination, and how it decides to keep going or stop.

---

## 2. Introduction

Multi-objective molecular optimization asks a model to improve several competing chemical properties at once, for example increasing blood-brain barrier permeability while also improving a binding activity score, without drifting too far from the original molecule's structure. This problem matters directly for drug discovery, where turning an initial hit compound into a viable lead candidate almost always means satisfying several physicochemical and biological requirements together [[1]](#ref-1).

Large language models offer a flexible way to approach this problem, since both the optimization objectives and their desired directions can be expressed as natural-language instructions [[2]](#ref-2). Existing LLM-based approaches, however, try to satisfy every requested property change in a single generation step. In this formulation, the LLM alone is responsible for generating a chemically valid molecule, balancing multiple competing objectives, and keeping the result close to the initial molecule, all at once. This places a heavy burden on a single decoding step, and reported success rates for this formulation stay below 0.3 across benchmark tasks [[3]](#ref-3).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/MORSE/overview.png" title="Fig. 1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1. Overview of the proposed framework. At each timestep, an LLM-based router selects a property-specific editor, or terminates, based on the enriched instruction and the current molecule. The selected editor produces an intermediate molecule that is fed back into the next routing decision.
</div>

MORSE addresses this by reframing MMO as a <span style="color: var(--global-theme-color); font-weight:600;">sequential decision process</span> instead of a single-shot generation problem. Rather than asking one model to do everything, an LLM-based router repeatedly chooses which property-specific editor to apply next, or when to stop, based on the optimization instruction and the current state of the molecule. Because each editor is specialized for a single property, the router's job is reduced to coordination: deciding what to edit next, rather than generating a fully optimized molecule in one shot.

---

## 3. Method

MORSE consists of two trainable components: a set of property-specific editors that propose local edits, and an LLM-based router that decides which editor to invoke at each step and encodes the current state into that decision. The router is trained with reinforcement learning and never sees ground-truth editor sequences, so it has to learn a good editing policy purely from the reward signal described in Section 3.4.

### 3.1 Property-specific Editors

Each property-specific editor extends COMA [[4]](#ref-4), a structure-constrained molecule generator. COMA trains a separate GRU-based VAE model for every target property, which does not scale well as the number of properties grows. To share representations across properties instead, MORSE replaces COMA's GRU encoder and decoder with a Transformer-based VAE (46.7M parameters, latent dimension 256) while keeping COMA's reconstruction, contractive, and margin objectives, and trains a single property-agnostic foundation model shared by all editors. Property-specific specialization is then introduced only through a LoRA module [[5]](#ref-5) inserted into the decoder for each target property, while the shared encoder and foundation weights stay frozen.

Editor training happens in three stages. First, the Transformer VAE is pretrained on 2.52M unique molecules from ChEMBL 37, using 6.47M structurally related pairs, first for reconstruction and then with COMA's full objective. Second, a rank-16 LoRA adapter is trained per property through supervised fine-tuning. Third, each adapter is further optimized with KL-anchored reinforcement learning, sampling multiple source molecules and candidates per source and anchoring updates to the fine-tuned policy so specialization does not drift too far from the shared foundation model. Evaluated in isolation before being combined with the router, using the fraction of source molecules for which at least one valid candidate improves the target property while keeping a Tanimoto similarity of at least 0.4 (SR@0.4), the specialized editors reach 0.941 on BBBP, 0.640 on DRD2, 0.428 on plogP, and 0.688 on QED, each of them higher than the corresponding COMA baseline. The plogP editor is noticeably the weakest of the four, a gap that resurfaces in the Future Direction discussion below.

### 3.2 Instruction Enrichment

A single optimization instruction is not enough to guide the router across multiple editing steps, since the molecule and its property scores keep changing as editors are applied. At every timestep, MORSE therefore updates the original instruction through an Instruction Enrichment step: the input molecule's SMILES string in the instruction is replaced with the current molecule, and four Lipinski descriptors, molecular weight, LogP, hydrogen-bond donors, and hydrogen-bond acceptors [[6]](#ref-6), are computed for the current molecule and appended together with its current target-property scores. This enriched instruction always reflects the molecule's up-to-date state, rather than only the original request, and is recomputed after every editing step.

### 3.3 Router Architecture

The enriched instruction is encoded by a frozen Qwen2.5-7B-Instruct model [[7]](#ref-7). Non-padding token representations are mean-pooled into a single state vector and passed through a small trainable MLP with separate policy and value heads. The action space is the set of property-specific editors plus a termination action, so the router's only job at each step is to pick one of these actions from the pooled state representation.

### 3.4 Reward Design and Candidate Selection

The router needs a reward that balances two competing goals: staying close to the original molecule, and satisfying the requested property changes. MORSE defines a molecular reward as a weighted combination of structural similarity to the initial molecule and the proportion of improved target properties, with a similarity threshold below which the reward is zeroed out so that the router is not credited for edits that destroy the original structure. Structural similarity is computed as Tanimoto similarity over Morgan fingerprints [[8]](#ref-8), and the improvement term is the fraction of target properties that moved in the requested direction relative to the original molecule.

When an editor is selected, it proposes a set of candidate molecules through beam search rather than a single output. The candidate with the highest molecular reward is then chosen as the next intermediate molecule, and the step-wise reward used to train the router is simply the change in molecular reward between consecutive states. The router itself is optimized with proximal policy optimization [[9]](#ref-9) over a bounded rollout buffer, using this step-wise reward accumulated over an episode.

---

## 4. Results

MORSE is evaluated on three tasks from the MuMOInstruct benchmark [[3]](#ref-3): BDP (BBBP, DRD2, plogP), BDQ (BBBP, DRD2, QED), and BPQ (BBBP, plogP, QED), under both seen instruction templates, which follow the phrasing used during training, and unseen instruction templates, which follow a phrasing never observed during training. The main metrics are success rate (SR), the fraction of molecules for which all target properties improve in the requested direction, structural similarity (Sim), and their product (SR times Sim), which reflects both objectives jointly.

### 4.1 Performance Evaluation

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
    Table 1. Performance comparison on the MuMOInstruct benchmark, against RePO [[10]](#ref-10) as reported on the same benchmark.
</div>

MORSE outperforms RePO on SR and SR times Sim across BDP, BDQ, and BPQ in both the seen and unseen settings, and the gap between seen and unseen results stays small in every task. RePO achieves higher Sim in every setting, but its substantially lower SR shows that preserving structure does not by itself mean the multi-objective request was satisfied. MORSE trades some similarity for a much higher, and more consistent, success rate, and the small seen-to-unseen gap suggests that the router's routing policy generalizes to instruction phrasings it never encountered during training, rather than memorizing which editor to pick for a specific template.

### 4.2 Routing Behavior Evaluation

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/MORSE/fig2_abc.png" title="Fig. 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 2. Action-transition graphs for BDP, BDQ, and BPQ, where edge labels are empirical next-action probabilities estimated from 500 sampled trajectories on the seen split.
</div>

Every editor node carries a comparatively strong self-loop, meaning the router usually reapplies the same editor several times before switching to another one. DRD2 self-loops with probability 0.30 in BDP and 0.35 in BDQ, while QED self-loops with 0.60 in BPQ, by far the strongest single edge across all three graphs. This difference reflects task-specific behavior rather than one fixed routine: on BPQ, QED is comparatively harder to move without hurting BBBP or plogP, so the router leans on repeated QED edits much more heavily than it leans on any single editor in BDP or BDQ, where probability mass is spread more evenly across the task's three editors.

A second pattern is visible in the STOP transitions. Across all three graphs, STOP is reached with a comparatively low probability from any editor, roughly 0.13 to 0.19 in a single step, well below the self-loop and cross-editor probabilities. This means the router typically chains several edits together before terminating, rather than stopping as soon as it reaches an editor that already improved the relevant property. Section 4.3 traces this exact behavior through one concrete example.

### 4.3 Edit Path Evaluation

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/MORSE/fig2_d.png" title="Fig. 3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 3. An example BDP edit path, with similarity, property scores, and molecular reward reported at each step.
</div>

The initial molecule (t=0) has Similarity 1.0000, BBBP 0.7243, DRD2 0.0059, and plogP -9.6365, and the instruction asks to increase all three properties, so plogP in particular starts far below a reasonable value. The router first applies the plogP editor: at t=1, plogP rises to 1.2166 and BBBP and DRD2 also happen to improve, to 0.9561 and 0.4754, but similarity has already dropped to 0.2500, below the delta=0.4 threshold from the reward defined in Section 3.4, so the resulting reward is exactly 0.0000 no matter how much the properties improved.

The router then applies a DRD2 edit. At t=2, DRD2 reaches 1.0000 and BBBP and plogP keep climbing to 0.9822 and 2.3808, but similarity, 0.3418, is still below the threshold, so the reward again comes out to 0.0000. Only after the next edit, a BBBP edit at t=3, does similarity cross back above 0.4000. Because all three properties are still improved at that point, the reward jumps straight to 0.7000, which matches the reward formula exactly: 0.5 times 0.4000 plus 0.5 times 1.0, since every target property has improved.

Rather than stopping there, the router takes one more DRD2 edit. Similarity edges up slightly to 0.4110 and the reward to 0.7055, before the router finally selects STOP at t=4. The two zero-reward steps at t=1 and t=2 show why the similarity threshold matters in practice: an edit that improves every requested property can still receive no reward if it drifts too far from the initial structure. Once the molecule earns a positive reward, the router keeps refining it a little further instead of terminating immediately, which is exactly the low-STOP-probability pattern already observed in Section 4.2.

---

## Future Direction

This work is an early-stage extended abstract rather than a finished system, and there is still a lot of room to improve before the framework can be considered a mature, reliable end-to-end solution.

- **Narrow evaluation scope.** The current evaluation is restricted to three-objective tasks drawn from a single benchmark, MuMOInstruct, and uses one fixed reward balance between structural similarity and property improvement (alpha = 0.5) across every task. Broader evaluation with alternative reward designs, additional datasets and baselines, and a larger number of target properties and editors is needed before the current results can be taken as general.
- **Heavy dependency on editor quality.** The router can only ever be as good as the editors it is choosing among, since each editor is trained independently beforehand and then kept frozen during router training. When one editor is comparatively weak, that weakness becomes a hard ceiling the router cannot route around no matter how well it schedules editors. As noted in Section 3.1, the plogP editor reaches an isolated SR@0.4 of only 0.428, clearly lower than BBBP (0.941), QED (0.688), or DRD2 (0.640), so BDP and BPQ, the two tasks that include plogP as a target property, are the ones most exposed to this single weak link. This editor dependency is arguably the biggest limitation of the current framework, and strengthening individual editors, or letting the router compensate for a known-weak editor, for example by sampling more candidates from it or by combining several candidate editors per property, looks like a necessary next step rather than an optional one.
- **Reward and inference simplifications.** Final performance is measured from a single categorical-sampling pass at evaluation time rather than averaged over multiple seeds, and beam search inside each editor is not jointly optimized with the router. Both choices keep the current setup tractable, but a more mature version of this framework would need to revisit them.

---

## References

<a id="ref-1"></a>[1] Fromer, J. C., & Coley, C. W. (2023). Computer-aided multi-objective optimization in small molecule discovery. *Patterns, 4*(2).

<a id="ref-2"></a>[2] Ye, G., Cai, X., Lai, H., Wang, X., Huang, J., Wang, L., Liu, W., & Zeng, X. (2025). DrugAssist: a large language model for molecule optimization. *Briefings in Bioinformatics, 26*(1), bbae693.

<a id="ref-3"></a>[3] Dey, V., Hu, X., & Ning, X. (2025). Gellm3o: Generalizing large language models for multi-property molecule optimization. *Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*, 25192 to 25221.

<a id="ref-4"></a>[4] Choi, J., Seo, S., & Park, S. (2023). COMA: efficient structure-constrained molecular generation using contractive and margin losses. *Journal of Cheminformatics, 15*(1), 8.

<a id="ref-5"></a>[5] Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., & Chen, W. (2021). LoRA: Low-rank adaptation of large language models. *arXiv:2106.09685*.

<a id="ref-6"></a>[6] Lipinski, C. A. (2004). Lead-and drug-like compounds: the rule-of-five revolution. *Drug Discovery Today: Technologies, 1*(4), 337 to 341.

<a id="ref-7"></a>[7] Yang, A., Yu, B., Li, C., Liu, D., Huang, F., Huang, H., Jiang, J., Tu, J., Zhang, J., Zhou, J., Lin, J., Dang, K., Yang, K., Yu, L., Li, M., Sun, M., Zhu, Q., Men, R., He, T., Xu, W., Yin, W., Yu, W., Qiu, X., Ren, X., Yang, X., Li, X., Xu, Z., & Zhang, Z. (2025). Qwen2.5-1M technical report. *arXiv:2501.15383*.

<a id="ref-8"></a>[8] Rogers, D., & Hahn, M. (2010). Extended-connectivity fingerprints. *Journal of Chemical Information and Modeling, 50*(5), 742 to 754.

<a id="ref-9"></a>[9] Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). Proximal policy optimization algorithms. *arXiv:1707.06347*.

<a id="ref-10"></a>[10] Li, X., Zhou, Z., Li, Z., Yao, J., Rong, Y., Zhang, L., & Han, B. (2026). Reference-guided policy optimization for molecular optimization via LLM reasoning. *arXiv:2603.05900*.

---

## BibTeX

```
Coming Soon
```
