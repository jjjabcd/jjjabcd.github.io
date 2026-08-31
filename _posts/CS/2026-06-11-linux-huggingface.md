---
layout: post
title: "Huggingface token 등록"
date: 2026-06-11
categories: [CS]
tags:
  - linux
  - Huggingface
  - LLM
description: "Opensource LLM을 사용하기 위한 hugging face 설정법"
toc:
  sidebar: left
---

HuggingFace Hub에서 제공되는 opensource LLM을 서버에서 사용하려면 model을 다운로드해야 한다. 대부분의 public model은 별도 인증 없이 다운로드할 수 있지만, 일부 model은 private repository이거나 gated model로 관리되기 때문에 HuggingFace account 인증이 필요하다.

특히 Llama, Gemma, 일부 Mistral 계열 model처럼 사용 약관 동의 또는 access approval이 필요한 model은 서버에 HuggingFace token을 등록해두어야 `transformers`, `huggingface_hub` 등에서 정상적으로 model weight를 다운로드할 수 있다.

따라서 이번 글에서는 Ubuntu/Linux 서버에서 HuggingFace personal access token을 생성하고 등록하는 방법을 정리한다.

---

### 1. HuggingFace token이 필요한 경우

HuggingFace token은 서버나 Python script가 HuggingFace Hub에 접근할 때 사용되는 인증 정보이다. 다음과 같은 경우 token 등록이 필요할 수 있다.

* private model repository를 다운로드하는 경우
* gated model을 다운로드하는 경우
* model 또는 dataset을 HuggingFace Hub에 upload하는 경우
* 서버 환경에서 `transformers` 기반 LLM을 자동 다운로드하는 경우
* `vllm`, `TGI`, `accelerate` 등에서 gated model을 serving하는 경우

단순히 model을 다운로드해서 fine-tuning에 사용하는 목적이라면 대부분 `read` 권한의 token이면 충분하다. `write` 권한은 model, dataset, repository를 HuggingFace Hub에 push할 때 필요하다.

---

### 2. HuggingFace token 생성

먼저 HuggingFace 계정에 로그인한 뒤 token을 생성해야 한다.

#### **Token 생성 경로**

HuggingFace 웹사이트에서 아래 경로로 이동한다.

```text
Profile → Settings → Access Tokens
```

또는 브라우저에서 다음 주소로 바로 이동할 수 있다.

```text
https://huggingface.co/settings/tokens
```

#### **Token 생성 방법**

1. `New token` 버튼을 클릭한다.
2. Token 이름을 입력한다.
   - 예시: `server-read-token`, `llm-download-token`
3. 권한을 선택한다.
   - **`Read`**: model, dataset 등을 다운로드할 수 있는 권한이다. Opensource LLM을 서버에서 다운로드하거나 fine-tuning에 사용할 목적이면 일반적으로 `Read` 권한이면 충분하다.
   - **`Write`**: `Read` 권한에 더해 model이나 dataset을 HuggingFace Hub에 upload할 수 있는 권한이다. Fine-tuning한 model checkpoint를 Hub에 push할 때 필요하다.
   - **`Fine-grained`**: 특정 repository나 organization resource에 대해서만 접근 권한을 제한할 수 있는 방식이다. 공동 서버나 project별 token 관리가 필요한 경우 유용하다.
4. 일반적인 model download 목적이라면 `Read`를 선택한다.
5. `Generate token`을 클릭한다.
6. 생성된 token을 복사한다.

Token은 비밀번호와 같은 민감한 인증 정보이므로 GitHub repository, blog, README, script에 직접 노출하면 안 된다. Token을 잃어버리면 다시 확인할 수 없으므로 새로 생성해야 한다.

---

### 3. 서버에 token 등록

HuggingFace token은 환경변수 `HF_TOKEN`으로 등록할 수 있다.

#### **pip 설치**

```bash
export HF_TOKEN="your_huggingface_token"
```

항상 적용되도록 등록하기 위해 bash를 사용하는 경우 `~/.bashrc`에 추가한다.

```bash
echo 'export HF_TOKEN="your_huggingface_token"' >> ~/.bashrc
source ~/.bashrc
```

zsh를 사용하는 경우는 `~/.zshrc`에 추가한다.

```bash
echo 'export HF_TOKEN="your_huggingface_token"' >> ~/.zshrc
source ~/.zshrc
```

등록 여부는 아래 명령어로 확인할 수 있다.

```bash
echo $HF_TOKEN
```

token 값이 출력되면 환경변수 등록이 완료된 것이다.

### 4. Model download 테스트

Token 등록이 완료되면 실제 model download가 가능한지 간단히 테스트할 수 있다.

```python
from transformers import AutoTokenizer

model_name = "Qwen/Qwen2.5-7B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(model_name)
print("Tokenizer download complete")
```

정상적으로 실행되면 HuggingFace cache directory에 tokenizer file이 저장된다.

기본 cache directory는 보통 다음 경로를 사용한다.

```bash
~/.cache/huggingface/
```

Model weight까지 다운로드하려면 아래처럼 실행할 수 있다.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/Qwen2.5-7B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

print("Model download complete")
```

---

### 참고 자료

- [HuggingFace Docs - User Access Tokens](https://huggingface.co/docs/hub/security-tokens)
- [HuggingFace Docs - HuggingFace Hub Quickstart](https://huggingface.co/docs/huggingface_hub/quick-start)
