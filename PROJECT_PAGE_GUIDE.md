# Project Page 작성 가이드

`_projects/` 아래에 새 프로젝트(논문/사이드 프로젝트/수업 프로젝트) 페이지를 만들 때 따르는 규칙입니다.
**OCSAug 페이지(`_projects/research/international/ocsaug.md`)가 이 규칙의 기준(reference) 문서**이니, 새 논문/연구 페이지를 쓸 때는 항상 OCSAug 페이지를 열어서 형식을 그대로 따라 하세요.

---

## 1. 파일 위치 & 이름

```
_projects/
  course_projects/   ← 수업 프로젝트 (예: capston.md = CanChem)
  side_projects/     ← 사이드 프로젝트
  research/
    domestic/         ← 한국어로 작성된 논문 (예: ask2024.md)
    international/    ← 영어로 작성된 논문 (예: ocsaug.md, cue.md, morse.md)
```

- 폴더 구분 기준은 **작성 언어**입니다. 한국어 논문 → `research/domestic`, 영어 논문 → `research/international`.
- 파일명은 논문/프로젝트를 짧게 대표하는 영문 슬러그(소문자)로 짓습니다 (예: `ocsaug.md`, `cue.md`).
- 새 파일을 만들면 URL은 `/projects/<폴더 경로>/<파일명>/` 형태로 자동 생성됩니다 (예: `/projects/research/international/ocsaug/`).

## 2. Front matter 템플릿

```yaml
---
layout: page
title: OCSAug                                   # 제목에 콜론(:)이 들어가면 반드시 따옴표로 감싸기!
description: "OCSAug: Diffusion-based ..."       # 콜론 있으면 마찬가지로 따옴표 필수
img: assets/project/OCSAug/overview_thumb.png    # 카드 썸네일 (아래 6번 참고)
importance: 1                                    # 숫자가 작을수록 목록 위쪽 (최신순 = 낮은 숫자)
categories: [Research]                           # Research / Course Projects / Side Projects 중 정확히 하나
related_publications: false
links:                                           # 1행: 실제로 이동하는 리소스 버튼
  - label: Paper
    url: https://...
  - label: Code
    url: https://github.com/...
  - label: Slides
    url: /assets/project/<name>/slide.pdf
tags:                                            # 2행: 클릭 안 되는 분류 뱃지
  - The Journal of Supercomputing                # ① 저널/학회명 (또는 Under Review / Preprint)
  - EN                                           # ② 작성 언어 (KR / EN) — 발표방법(Oral/Poster)은 넣지 않음
toc:
  sidebar: left
---
```

**categories는 반드시 다음 세 값 중 하나와 정확히 일치해야 함** (`_pages/projects.md`의 `display_categories`가 이 값으로 필터링합니다):
`Research`, `Course Projects`, `Side Projects`

### `links` (1행) 규칙
- 순서는 템플릿(`_includes/projects_horizontal.liquid`)이 자동으로 **Paper → Code → Slides → Video** 순서로 강제 정렬해줍니다. front matter에 어떤 순서로 써도 상관없음.
- 각 라벨(Paper/Code/Slides/Video)에 맞는 아이콘이 자동으로 붙습니다.
- 본문 상단에도 같은 링크를 `.project-tags.project-tags-links` 버튼으로 한 번 더 배치합니다 (OCSAug 상단 참고).

### `tags` (2행) 규칙
- 순서: **① 저널/학회명 (또는 상태: Under Review/Preprint) → ② 작성 언어(KR/EN)** (발표 방법 Oral/Poster는 넣지 않기로 결정함)
- 아직 게재 확정 전이면 저널/학회명 대신 `Under Review` 또는 `Preprint` 사용.
- CanChem처럼 논문이 아닌 프로젝트는 `KR`/`EN` 언어 태그만 넣으면 됨.

## 3. 본문 구조 — OCSAug 기준

OCSAug 페이지가 실제로 쓰고 있는 구조를 그대로 따릅니다. 섹션은 항상 **번호를 매긴 `##`(대분류)와 `###`(소분류)** 로 구성합니다.

```markdown
<blockquote style="font-size: 0.875rem;">
<em>Note: This article was drafted with AI assistance and reviewed by Jin Hyuk Kim.</em>
</blockquote>

<div class="projects">
<div class="project-tags project-tags-links">
<a href="..." class="tag" target="_blank" rel="noopener"><i class="fa-solid fa-file-pdf"></i> Paper</a>
<a href="..." class="tag" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>
</div>
</div>

## 1. Contributions
- 항목 3~4개, 각 항목의 핵심 키워드에 색상 강조(아래 4번 참고)

---

## 2. Introduction
(배경 설명 + 문제 정의 + 관련 그림 + 본 연구가 이 문제를 어떻게 푸는지 한 문단)

---

## 3. Method
(전체 파이프라인 한 줄 요약 + 전체 구조 그림)

### 3.1 <하위 기법 이름>
### 3.2 <하위 기법 이름>
### 3.3 <하위 기법 이름>
...

---

## 4. Results
(데이터셋 설명)

### 4.1 <평가 항목 1>
### 4.2 <평가 항목 2>
...

---

## References
(번호 없음 — 아래 5번 참고)

---

## BibTeX
(번호 없음)
```

- **섹션 순서는 항상 Contributions가 맨 위**입니다 (Introduction보다 먼저). 이 연구/프로젝트가 기존 대비 무엇을 새로 기여했는지 3~4개 bullet으로 정리하고, 제목은 복수형 **`Contributions`**로 씁니다.
- 대분류는 `## 1. Contributions`, `## 2. Introduction`, `## 3. Method`, `## 4. Results`처럼 **번호를 붙이고**, 소분류도 `### 3.1`, `### 3.2`, `### 4.1`, `### 4.2`처럼 **부모 번호.자식번호** 형식으로 붙입니다. 단, **References와 BibTeX는 번호를 붙이지 않습니다** (실제 논문 관례를 따름).
- **`Limitations` 섹션은 넣지 않습니다.** 향후 방향에 대한 언급이 필요하면 다른 섹션 안에 한두 문장으로만 녹여서 서술.
- **Method의 각 하위 섹션 제목은 "무엇을 하는지"만 짧게 씁니다** (예: `RePaint-based Data Augmentation`, `SMILES Label Transfer`, `Fine-tuning`). **"왜 이 기법을 선택했는지"는 제목이 아니라 본문 첫 문장 또는 첫 문단에서 설명**합니다. (예: "단순히 새 이미지를 샘플링하면 원래 구조가 사라지기 때문에, 대신 RePaint를 사용했다" 처럼 대안과 비교해서 이유를 서술.) 제목에 이유를 욱여넣지 않기.
- **Results의 하위 섹션 제목은 "평가한다"는 느낌이 들게** 씁니다. 단순히 `Generation Quality (FID)`라고 쓰지 말고 `Generation Quality Evaluation (FID)`처럼 **"Evaluation"** 을 붙이거나, `Real-World Hand-drawn Evaluation`처럼 자연스럽게 평가 뉘앙스가 드러나게 씁니다.
- **그림이 2개 이상 나란히 배치되고 캡션 하나로 퉁쳐질 것 같으면, 그림마다 설명 문단을 따로 씁니다.** 그림 하나에 문단 하나씩 (그림 → 캡션 → 다음 그림 → 캡션) 순서로 분리하고, "이 그림이 무엇을 보여주는지 + 왜 그런 결과가 나오는지"를 각각 설명. (OCSAug 4.3의 Fig. 8/Fig. 9 예시 참고 — 표 안에 있는 수치 해석을 그림 설명과 연결지어 서술.)
- 저자명은 (다국어 페이지의 경우) **한글(영문)** 병기 — 예: `김진혁 (Jin Hyuk Kim)`.
- 이미 영어로 존재하는 용어(fine-tuning, pretrained, retrain, semi-supervised learning, generative model, data augmentation, dataset 등)는 한국어로 번역하지 않고 영단어 그대로 사용.
- Results에 성능 비교 표가 있으면 반드시 `<div class="pretty-table" markdown="1"> ... </div>`로 감싸기 — 안 그러면 표 테두리(그리드)가 안 보임. **(OCSAug 페이지는 아직 이 래퍼가 빠져있으니 새로 쓸 때는 빠뜨리지 말 것.)**
- 발표자료를 PDF로 넣을 때 슬라이드 전체를 페이지에 이미지로 나열하지 말고, front matter `links`에 `Slides` 태그로만 연결 (본문이 너무 길어짐).

## 4. 줄글 강조 & 인용 표기 규칙

- **줄글(본문 문장) 안에서 특정 단어/구절을 강조하고 싶을 때는 마크다운 링크(`[word](url)`)를 쓰지 않습니다.** 링크는 Paper/Slides처럼 실제로 이동해야 하는 리소스에만 사용하고, 단순 강조는 글씨 색을 입혀서 표현합니다:
  ```html
  <span style="color: var(--global-theme-color); font-weight:600;">강조하고 싶은 단어</span>
  ```
  표 안에서 숫자 하나만 강조할 땐 `<strong style="color: var(--global-theme-color);">`를 사용 (OCSAug 결과 표 참고). 직접 `#hex` 색상을 하드코딩하지 않기 — 테마별 색 불일치 문제가 재발함.
- **본문에서 전문용어를 처음 언급할 때 각주를 달 때는 `[[n]](#ref-n)` 형태로만 씁니다. `<sup>` 윗첨자는 쓰지 않고, 본문 줄과 같은 크기로 표시합니다.** (저자명 옆 소속 번호처럼 각주가 아닌 용도의 `<sup>1</sup>`은 예외.)
- **em dash(—)는 웬만하면 쓰지 않습니다.** 문장을 마침표로 나누거나, 콤마·콜론·세미콜론·괄호로 자연스럽게 바꿔 씁니다. 단, 숫자 범위 표기(`1–2`, `8–16` 같은 en dash)는 예외로 그대로 사용해도 됨 — 이 둘은 다른 목적의 기호이므로 헷갈리지 말 것.

## 5. Figure / References 번호 매기기 규칙

**논문 원본의 번호를 그대로 가져오지 않고, 이 페이지(블로그 글)에 실제로 등장하는 순서를 기준으로 처음부터 다시 매깁니다.**

- Figure는 문서 위에서 아래로 읽었을 때 Fig. 1, Fig. 2, Fig. 3 ... 순서로 **끊김 없이** 이어져야 합니다. 원본 논문에서 순서가 다르게 배치돼 있었더라도(예: 논문에서는 Fig. 8이 이 페이지에서는 더 앞 섹션에 나오는 경우), 페이지에 나오는 순서에 맞춰 새로 번호를 붙입니다.
  - 실제 이미지 파일명(`fig6.png`, `fig8.png` 등)은 그대로 두고, `title="Fig. N"` / 캡션 텍스트 / 본문 중 "Fig. N shows..." 같은 참조만 새 번호로 바꾸면 됩니다. 파일명까지 바꿀 필요는 없음.
  - 본문에 그림이 있는데 번호(`title="Fig. N"`)가 없다면 반드시 번호를 붙일 것 (Method 개요 그림처럼 번호 없이 두지 않기).
- References도 마찬가지로, 논문의 원래 인용 번호가 아니라 **이 페이지 본문에서 처음 언급되는 순서**대로 1번부터 다시 매깁니다. `[[n]](#ref-n)` 인라인 각주와 `<a id="ref-n">` 앵커, References 목록의 나열 순서까지 전부 새 번호 기준으로 일치시킵니다.

## 6. Publications(`/publications/`)와 연결하기

해당 논문이 `_bibliography/papers.bib`에 이미 등록되어 있다면, 프로젝트 페이지를 만든 뒤 bib 항목에 아래 필드를 추가해서 서로 연결하세요:

```
@article{kim2025ocsaug,
  ...
  pdf={https://...},                                    # 있으면 추가 (Paper 버튼)
  code={https://github.com/...},                        # 있으면 추가 (Code 버튼)
  project={/projects/research/international/ocsaug/}    # 항상 추가 (Project Page 버튼)
}
```

- `abbr` 필드(학회/저널 약칭)는 프로젝트 페이지의 `tags`에 쓴 이름과 **정확히 동일하게** 맞추기.

## 7. 이미지(썸네일) 규칙

- 프로젝트 카드의 이미지 영역은 가로로 넓은 형태라, **원본 이미지의 가로세로 비율이 다르면 카드 높이가 들쭉날쭉해짐.**
- 그래서 `img:`에 쓰는 카드 썸네일은 항상 **16:9 비율(6000:3375와 동일 비율)**, **불투명 흰 배경**으로 맞춘 별도 파일(`overview_thumb.png`)을 만들어 사용합니다. 원본(`overview.png`)은 본문 figure용으로 그대로 둠.
- 만드는 방법 (Python/PIL):
  1. 원본이 투명 배경(RGBA, alpha 0~255)이면 흰 배경에 합성(flatten)해서 불투명하게 만들기.
  2. 가로세로 비율이 16:9가 아니면, 짧은 변 기준으로 흰색(투명 아님!) 캔버스에 가운데 정렬해서 붙여넣기(letterbox).
  3. 파일명은 `overview_thumb.png`로 저장하고 front matter `img:`에 연결.
- 발표 슬라이드가 개별 이미지(28장 등)로만 있으면, `img2pdf`로 하나의 PDF로 합치고(리사이즈 1600px 폭 + JPEG 압축 권장, 용량 줄이기) `links`의 `Slides`에 연결.

## 8. 흔한 실수 체크리스트

- [ ] `title`/`description`에 콜론(:)이 있으면 따옴표로 감쌌는가? (안 그러면 YAML 파싱 에러로 프로젝트가 목록에서 아예 사라짐)
- [ ] `categories`가 `Research`/`Course Projects`/`Side Projects` 중 하나와 정확히 일치하는가?
- [ ] `img`가 16:9 비율 + 흰 배경(불투명)인가?
- [ ] `tags` 순서가 [저널/학회명(또는 상태) → 언어]인가? (Oral/Poster는 넣지 않기로 함)
- [ ] Note 블록이 `<blockquote style="font-size: 0.875rem;">` 형식인가?
- [ ] 대분류/소분류 제목에 번호(`1.`, `3.2` 등)를 붙였는가? (References/BibTeX 제외)
- [ ] Contributions가 맨 위, Limitations 없이 구성했는가?
- [ ] Method 소제목에 "이유"를 넣지 않고 본문에 이유를 서술했는가?
- [ ] Results 소제목이 "평가"하는 느낌으로 되어 있는가?
- [ ] 그림 여러 개를 한 캡션으로 퉁치지 않고, 그림마다 설명 문단을 따로 붙였는가?
- [ ] 줄글 강조에 마크다운 링크 대신 `<span style="color: var(--global-theme-color);">`를 썼는가?
- [ ] 각주에 `<sup>` 없이 `[[n]](#ref-n)`만 썼는가?
- [ ] em dash(—) 없이 문장을 썼는가? (숫자 범위용 en dash는 예외)
- [ ] Figure/References 번호가 논문 원본이 아니라 **이 페이지에 등장하는 순서**대로 매겨졌는가?
- [ ] 표가 있다면 `<div class="pretty-table" markdown="1">`로 감쌌는가?
- [ ] `_bibliography/papers.bib`에 해당 항목이 있다면 `project` 필드를 추가했는가?
