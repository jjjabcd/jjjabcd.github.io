---
layout: page
title: publications
permalink: /publications/
description:
nav: true
order: 1
---

<!-- _pages/publications.md -->
<div class="publications">

  <p class="text-muted" style="font-size: 0.8rem; font-style: italic;">† Equal contribution * Corresponding author</p>

  <!-- Category Navigation -->
  <div class="d-wrap justify-content-center mb-4">
    <a href="#int-journal" class="btn btn-sm btn-outline-primary rounded-pill m-1">International Journal</a>
    <a href="#int-conference" class="btn btn-sm btn-outline-primary rounded-pill m-1">International Conference</a>
    <a href="#dom-journal" class="btn btn-sm btn-outline-primary rounded-pill m-1">Domestic Journal</a>
    <a href="#dom-conference" class="btn btn-sm btn-outline-primary rounded-pill m-1">Domestic Conference</a>
  </div>

  <h2 id="int-journal" class="category">International Journal</h2>
  {% bibliography -f papers -q @*[category=int-journal]* %}

  <h2 id="dom-journal" class="category">Domestic Journal</h2>
  {% bibliography -f papers -q @*[category=dom-journal]* %}

  <h2 id="int-conference" class="category">International Conference</h2>
  {% bibliography -f papers -q @*[category=int-conference]* %}

  <h2 id="dom-conference" class="category">Domestic Conference</h2>
  {% bibliography -f papers -q @*[category=dom-conference]* %}

</div>
