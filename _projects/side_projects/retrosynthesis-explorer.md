---
layout: page
title: Retrosynthesis Explorer
description: "A local browser GUI for retrosynthetic route exploration with AiZynthFinder"
img: assets/project/RetrosynthesisExplorer/overview_thumb.png
importance: 1
categories: [Side Projects]
related_publications: false
links:
  - label: Code
    url: https://github.com/jjjabcd/Retrosynthesis_Explorer
tags:
  - EN
toc:
  sidebar: left
---

### 📔 Overview

A **local browser GUI** for exploring retrosynthetic routes with **AiZynthFinder**. Enter a target SMILES string, preview the molecule, run a search, and compare the returned routes. Selecting a route opens a detail page with its molecular tree and computed properties for every node.

The app serves an English interface at `http://127.0.0.1:8765`. Search runs in a separate worker process so the server can report status, enforce a total time budget, and cancel a running job. Molecular input and search results stay on your own computer, nothing is sent to an external service.

<div class="projects">
<div class="project-tags project-tags-links">
<a href="https://github.com/jjjabcd/Retrosynthesis_Explorer" class="tag" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
</div>
</div>

---

### 🌟 Key Features

- **Molecule preview & property calculation**: rendering the target structure from SMILES and computing molecular formula, molecular weight, Crippen cLogP, TPSA, hydrogen bond donors/acceptors, rotatable bonds, and ring counts
- **Synthetic accessibility scores**: SAScore (1–10, lower is easier) and RAScore (0–1, a ChEMBL XGBoost model estimate) are computed alongside the preview
- **Configurable retrosynthesis search**: search time, total job limit, iteration limit, maximum steps, and a target number of solved routes can all be set before running AiZynthFinder
- **Route comparison**: each returned route lists its total reaction steps, starting-material count, state score (95% stock coverage plus 5% depth preference), and solved status
- **Route detail & molecular tree**: selecting a route opens a tree view where stock molecules are outlined in green and non-stock molecules in amber, with node IDs such as `M1`/`M2` matching the property table
- **Saved, revisitable results**: each job is written to `results/<job-id>/` as JSON, PNG, and CSV, and a Recent Jobs list lets you reopen past searches even after restarting the server
- **Exports**: whole-route images, per-molecule images (PNG/SVG), and property tables (CSV/JSON) can each be exported on demand

---

### 🖼️ Screenshots

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/RetrosynthesisExplorer/target.png" title="Target molecule and preview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Entering a target SMILES renders the structure, computes SAScore/RAScore, and exposes the search parameters before a run.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/RetrosynthesisExplorer/routes.png" title="Route comparison" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Returned routes are ranked and compared by reaction steps, starting-material count, state score, and solved status.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/RetrosynthesisExplorer/route-detail.png" title="Route detail tree" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A selected route opens its own detail page with the retrosynthetic tree. Green borders mark molecules in the selected stock, amber borders mark molecules that are not.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/RetrosynthesisExplorer/export.png" title="Export dialog" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Structure images and property tables can be exported per molecule, per route, or for the whole result set, in PNG, SVG, CSV, or JSON.
</div>

---

### ⚙️ Tech Stack

The backend is a FastAPI server bound to `127.0.0.1` for single-user local use, with the search itself running in a separate worker process so the server can report progress, enforce timeouts, and cancel a job in flight. Retrosynthetic search is powered by [AiZynthFinder](https://github.com/MolecularAI/aizynthfinder) 4.4.1, with RDKit computing molecular descriptors and a ChEMBL-trained XGBoost model providing the RAScore accessibility estimate. The environment is managed through Conda on Python 3.11, and core library versions are pinned in `constraints.txt` for reproducibility.

---

### ⚠️ Notes

This tool surfaces predicted retrosynthetic routes, it does not provide **experimentally validated synthesis routes**. The state score, SAScore, and RAScore are all ranking heuristics rather than success probabilities, and "solved" only means every starting material in a route exists in the selected ZINC stock snapshot, not that it is available from a real supplier or has been validated in the lab. The app has been exercised on Windows x64 during development; macOS (Apple Silicon and Intel) installs its dependencies but native validation is still pending.

---

### 📜 License

The new Explorer code is released under the [MIT License](https://github.com/jjjabcd/Retrosynthesis_Explorer/blob/main/LICENSE), and the original [AiZynthFinder](https://github.com/MolecularAI/aizynthfinder) source keeps its own MIT license intact. Models and templates are separately licensed under CC BY 4.0, and the bundled stock data under MIT, both distinct from the app's own code license.
