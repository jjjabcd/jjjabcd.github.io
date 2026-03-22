---
layout: post
title: "Ubuntu에서 Miniconda 설치"
date: 2025-03-18
categories: [linux]
tags:
  - ubuntu
  - miniconda
  - environment
description: "Miniconda 설치."
---

# Ubuntu에서 Miniconda 설치

Ubuntu 환경에서 Python 개발 환경을 구축하기 위한 간편한 방법 중 하나인 Miniconda 설치 방법을 정리한 예시입니다. 이 가이드는 SSH 접속 후 터미널을 통해 진행하는 것을 전제로 하며, Miniconda를 설치하면 이후 필요한 패키지 및 개발 환경 구성이 훨씬 수월해집니다.

## Miniconda란?

Miniconda는 Anaconda의 경량 버전으로, 기본적인 Python 실행 환경과 Conda 패키지 관리 도구만 포함하고 있습니다. 필요에 따라 필요한 패키지들을 개별적으로 설치할 수 있으므로, 가볍고 유연한 개발 환경을 구성할 수 있습니다.

## Miniconda 설치 단계

### Step 1: 설치 스크립트 다운로드

Miniconda 설치 스크립트를 공식 웹사이트에서 다운로드합니다. 예를 들어, 최신 버전의 Miniconda3 Linux용 설치 스크립트를 다운로드하는 명령어는 다음과 같습니다.

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

### Step 2: 설치 스크립트 실행 권한 부여

다운로드한 스크립트에 실행 권한을 부여합니다.

```bash
chmod +x Miniconda3-latest-Linux-x86_64.sh
```

### Step 3: 설치 스크립트 실행

스크립트를 실행하여 Miniconda를 설치합니다. 스크립트 실행 시 설치 경로 및 라이선스 동의에 관한 질문이 나타납니다.

```bash
bash ./Miniconda3-latest-Linux-x86_64.sh
```

- License 동의: yes 입력
- 설치 경로 지정: 기본 경로를 사용하면 Enter키를 누르고, 원하는 경로를 지정
  (예: /home/username/miniconda3)
- yes

### Step 4: 터미널 재시작

터미널을 재시작해야 base로 가상환경이 재부팅됩니다.

```bash
source ~/.bashrc
```

## Miniconda 사용 시작하기

설치가 완료 및 터미널 재부팅까지 했다면, Conda 환경을 활성화하고 기본적인 패키지 설치 등을 진행할 수 있습니다.

### Conda 버전 확인

```bash
conda --version
```

다음글은 설치된 미니콘다를 사용하여 가상환경을 생성하고, 생성된 가상환경에 개발 또는 연구에 필요한 패키지들을 설치하는 과정을 소개할 예정이다.

---

### [참고자료]

- [[Miniconda] Ubuntu에 Miniconda 설치하기](https://soundprovider.tistory.com/entry/Miniconda-Ubuntu%EC%97%90-Miniconda-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)

- [Ubuntu 22.04에 miniconda 설치 in Ternimal](https://velog.io/@cosmos42/Ubuntu-22.04-miniconda-install-in-Ternimal)
