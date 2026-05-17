---
layout: post
title: "Conda 가상환경에 라이브러리 설치"
date: 2025-03-19
categories: [CS]
tags:
  - ubuntu
  - miniconda
description: "Miniconda 가상환경 생성 및 패키지 관리 방법 정리"
toc:
  sidebar: left
---

SSH 접속 환경에서 Conda 가상환경 내에 라이브러리를 설치하는 기본적인 명령어와 사용법을 정리한 예시이다. Conda와 pip를 사용하여 필요한 패키지들을 설치하고 관리할 수 있으며, 이를 통해 Python 개발 환경을 더욱 효율적으로 구성할 수 있다.

## Prerequisite

- [Ubuntu에서 Miniconda 설치]({% post_url CS/2025-03-18-conda-install %})

## Conda 가상환경이란?

Conda 가상환경은 프로젝트별로 독립적인 패키지와 Python 버전을 관리할 수 있게 해준다. 이를 통해 서로 다른 프로젝트 간의 패키지 충돌 없이 안정적인 개발 환경을 유지할 수 있다.

### 새로운 Conda 환경 생성

```bash
conda create -n myenv python=3.9
```

이 명령어를 실행하면 설치되는 패키지들을 확인하고, y를 누르면 설치가 완료된다.

설치 과정에서 y를 매번 누르기 번거롭다면 `-y` 옵션을 사용하여 바로 설치할 수 있다.

```bash
conda create -n test python -y
```

`-n` 옵션은 name의 약자로 가상환경의 이름을 지정할 때 사용한다.

### 생성된 환경 활성화
```bash
conda activate test
```

활성화되면 터미널의 앞부분이 `(base)`에서 `(test)` 등 해당 가상환경 이름으로 바뀌었는지 꼭 확인해야 한다.

**주의사항**

- 반드시 `conda activate {가상환경 이름}`을 통해 가상환경을 활성화시킨 후 패키지를 설치해야 한다.

## Conda 기본 라이브러리 설치 명령어
Conda에서는 기본적으로 아래와 같이 패키지를 설치할 수 있다.

### 기본 설치

- 명령어
```bash
conda install {패키지 명}
```

- 사용 예시
```bash
conda install pandas
```

이 명령어를 통해 conda의 기본 채널에서 pandas 패키지를 설치한다.

### 특정 채널을 지정하여 설치

기본 채널에 패키지가 없거나 특정 채널의 패키지가 필요한 경우 `-c` 옵션을 사용하여 채널을 명시할 수 있다.

- conda-forge 채널 사용 예시
```bash
conda install -c conda-forge pandas
```

- pytorch 채널 사용 예시
```bash
conda install -c pytorch pytorch torchvision
```

PyTorch 및 관련 패키지들은 공식 `pytorch` 채널을 통해 설치하는 것이 권장된다.

## pip를 이용한 라이브러리 설치

가상환경 내에서 pip를 사용하면 Conda에 없는 패키지를 설치할 수 있다.

- **주의사항**
- Conda 환경에서는 가급적 Conda 패키지로 설치할 수 있는 라이브러리를 우선적으로 사용하는 것이 좋다. pip와 Conda를 섞어서 사용할 경우 패키지 충돌이 발생할 수 있으므로 주의가 필요하다.

pip도 conda와 동일한 명령어로 설치가 가능하다.

```bash
pip install matplotlib
```

## Conda와 pip 설치 차이 요약

**Conda 설치:**
Conda는 패키지 관리 및 환경 관리를 동시에 지원하며, 바이너리 수준에서 의존성을 관리하므로 라이브러리 설치가 간편하고 안정적이다.

**pip 설치:**
pip는 Python의 표준 패키지 관리 도구로, PyPI(Python Package Index)에서 라이브러리를 설치한다. Conda 채널에 없는 최신 패키지를 설치할 때 유용하다.

**채널:**
Conda 패키지는 여러 채널을 통해 관리되며, `conda-forge`나 `pytorch`와 같이 신뢰할 수 있는 채널을 지정하여 설치하면 보다 최신이고 안정적인 패키지를 사용할 수 있다.

- [conda-forge | Anaconda.org](https://anaconda.org/conda-forge)
- [PyPI · The Python Package Index](https://pypi.org/)

### [참고자료]

- [[데이터 과학 python] 아나콘다 가상환경 생성, 복사, 라이브러리 설치](https://alliswellv2030.tistory.com/3)
- [[Anaconda] 가상환경 확인/생성/활성화/설치/패키지 확인/패키지 파일 추출/비활성화/삭제](https://mingyu6952.tistory.com/entry/Anaconda-%EA%B0%80%EC%83%81%ED%99%98%EA%B2%BD-%ED%99%95%EC%9D%B8%EC%83%9D%EC%84%B1%ED%99%9C%EC%84%B1%ED%99%94%EC%84%A4%EC%B9%98%ED%8C%A8%ED%82%A4%EC%A7%80-%ED%99%95%EC%9D%B8%EB%B9%84%ED%99%9C%EC%84%B1%ED%99%94%EC%82%AD%EC%A0%9C)
