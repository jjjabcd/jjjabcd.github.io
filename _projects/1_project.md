---
layout: page
title: CanChem
description: 분자 구조 이미지 인식을 통한 분자구조 정보 검색 앱
img: assets/project/CanChem/slide_1.png
importance: 1
category: work
related_publications: true
---

### 📔 프로젝트 소개

화학, 신약 개발 등의 분자구조 정보를 다루는 종사자 및 학생들을 위한 **분자 정보 검색 어플리케이션**입니다. 
<u>문헌 자료에 삽입되어 있는 분자구조 이미지</u>를 인식하여 정보를 추출하고 검색하는 데 도움을 줍니다.

이 프로젝트에서 사용된 AI 기술은 **2024 정보처리학회 하계 학술대회** 학부생 세션에서 논문으로 발표되었습니다.

**팀 구성**: 4명
- `AI` 1명 (`me`)
- `Back-end` 2명
- `Front-end` 2명

<div class="row" markdown="1">
<div class="col-sm-6" markdown="1">

❗ **Role**
- AI 훈련
- AI 평가
- AI 모듈화
</div>
<div class="col-sm-6" markdown="1">
🔗 **Links**
- [시연 영상](https://youtube.com/shorts/CHp-tC4oYMQ)
- [발표 논문](https://www.manuscriptlink.com/society/kips/conference/ask2024/file/downloadSoConfManuscript/abs/KIPS_C2024A0174)
</div>
</div>

---

### 🌟 앱 주요 기능

- **분자구조 이미지 인식**: AI를 통해 이미지 속 분자구조를 판독
- **분자구조 정보 검색**: 검색된 분자에 대한 상세 정보 제공
    - Molecular Formula
    - Molecular weight
    - etc
- **2D/3D 시각화**: 기하학적 분석을 위한 분자 구조 이미지 제공
- **사용자 편의 기능**: 네이버 소셜 로그인, 즐겨찾기, 검색 기록 관리

---

### 🖥️ 프로젝트 아키텍처

#### 전체 시스템 아키텍처
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/CanChem/project_overall_architecture.png" title="Project Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

#### AI 모델 아키텍처 (OCSR)
Optical Chemical Structure Recognition(OCSR) 모델의 성능 향상을 위해 Denoising Diffusion Probabilistic Model(DDPM) 기반의 Data Augmentation과 Semi-Supervised Learning을 적용했습니다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/project/CanChem/architecture.png" title="AI Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

> ### OCSR: Optical Chemical Structure Recognition
>
> ---
>
> OCSR(Optical Chemical Structure Recognition)은 사진 속 분자 구조를 인식하고 판독하는 기술입니다. 문헌에 삽입된 분자 구조 정보를 효과적으로 수집할 수 있는 중요한 도구로, 정확한 인식 성능을 가진 OCSR 기술의 개발은 화학정보학 분야에서 인공지능 응용의 핵심 과제 중 하나입니다.
>
> 정확도가 높은 인공지능 기반 OCSR 모델을 개발하기 위해서는 대량의 학습 데이터 확보가 필수적입니다. OCSR 모델 훈련에 필요한 데이터는 ‘분자 구조 이미지’와 그에 대응되는 ‘문자열 형태의 분자 구조 정보’입니다. 그러나 이러한 데이터를 수작업으로 생성하는 데는 상당한 시간과 비용이 소요되므로, 대량의 데이터 확보가 어려운 문제입니다.

> ### DDPM: Denoising Diffusion Probabilistic Models
>
> ---
>
> OCSR 모델 훈련에 필요한 분자 구조 이미지 데이터 증강을 위해 생성형 모델인 DDPM(Denoising Diffusion Probabilistic Models)을 활용했습니다. DDPM은 원본 이미지에 점진적으로 노이즈를 추가한 후, 그 노이즈를 제거하는 과정을 통해 모델을 학습시킵니다. 이를 통해 분자 구조 이미지를 학습하고, 다량의 이미지를 생성하여 OCSR 모델 훈련에 필요한 데이터셋을 만들었습니다.

> ### Semi-Supervised Learning
>
> ---
>
> DDPM을 통해 생성된 이미지는 대응되는 문자열 형태의 분자 구조 정보가 없는 문제를 안고 있습니다. 이를 해결하기 위해 Semi-Supervised Learning을 적용했습니다. Semi-Supervised Learning은 사전 학습된 모델을 사용하여 DDPM이 생성한 이미지에 대한 예측을 수행하고, 그 예측된 정보를 바탕으로 문자열 형태의 분자 구조 정보를 생성하여 학습에 활용합니다. 이 방식은 레이블이 부족한 상황에서도 모델을 효과적으로 학습시킬 수 있도록 돕습니다.

---

### 📱 어플리케이션 화면 구성

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/CanChem/login.png" title="Login" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/CanChem/home.png" title="Home" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/CanChem/search_results.png" title="Search Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    왼쪽부터: 로그인 화면, 홈 화면, 검색 결과 리스트
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/CanChem/molecular_info.png" title="Molecular Info" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/CanChem/bookmark.png" title="Bookmarks" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/project/CanChem/history.png" title="Search History" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    왼쪽부터: 분자 정보 상세 페이지, 즐겨찾기 페이지, 검색 기록 관리
</div>

---

### 📊 결과 보고서 (Slides)

<div class="row row-cols-1 row-cols-md-2">
    {% for i in (1..28) %}
    <div class="col mb-4">
        {% capture slide_path %}assets/project/CanChem/slide_{{ i }}.png{% endcapture %}
        {% capture slide_title %}Slide {{ i }}{% endcapture %}
        {% include figure.liquid path=slide_path title=slide_title class="img-fluid rounded z-depth-1" %}
    </div>
    {% endfor %}
</div>
