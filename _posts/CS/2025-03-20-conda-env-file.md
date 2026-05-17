---
layout: post
title: "environment.yml & requirements.txt 사용법"
date: 2025-03-20
categories: [CS]
tags:
  - environment
  - conda
  - linux
  - pip
description: "Conda 환경 설정을 위한 environment.yml 파일과 pip 패키지 관리를 위한 requirements.txt 활용 가이드"
toc:
  sidebar: left
---

## environment.yml 이란?

**environment.yml** 파일은 Conda 환경의 설정을 YAML 형식으로 저장한 파일이다. 이 파일에는 환경 이름, Python version, 필요한 package 및 channel 정보가 포함되어 있어 다음과 같은 이점을 제공한다.

- **환경 재현성**: 팀원이나 다른 system에서도 동일한 환경을 쉽게 생성할 수 있다.
- **버전 관리**: 사용 중인 package의 version과 dependencies를 명확하게 관리할 수 있다.
- **자동화**: CI/CD pipeline 등에서 환경 구축을 자동화하는 데 유용하다.

---

## environment.yml 파일의 기본 구조

```yaml
name: my_env
channels:
  - conda-forge
  - pytorch
  - nvidia
dependencies:
  - python=3.9
  - pytorch
  - torchvision
  - pytorch-cuda=12.1
  - pandas
  - matplotlib
  - tensorboardx
  - pip
  - pip:
    - opencv-python>=4.5.5.64
    - transformers>=4.5.1
    - OpenNMT-py==2.2.0
    - timm==0.5.4
```

위 파일의 각 항목이 의미하는 바는 다음과 같다.

- `name`: 생성할 conda 환경의 이름을 의미한다.
- `channels`: package를 설치할 때 사용할 channel 목록을 의미한다.
- `dependencies`: 환경에 설치할 package 목록을 의미한다.
    - Conda package는 일반적으로 list 형태로 작성한다.
    - pip로 설치할 package는 `pip:` 항목 하위에 작성한다.

---

## environment.yml 파일 작성 및 사용법

### 1. 파일 작성 단계

1. 텍스트 에디터를 열어 `environment.yml` 파일을 생성한다.
2. 환경 이름과 `channels`를 지정한다. (예: `conda-forge`, `defaults`)
3. `dependencies` 항목에 Python version과 필요한 package를 추가한다.
4. Conda에서 제공하지 않는 package는 `pip:` 하위에 추가한다.

### 2. 환경 생성하기

터미널에서 아래 명령어를 실행하여 환경을 생성한다.

```bash
conda env create -f environment.yml
```

생성된 환경은 다음 명령어로 활성화한다.

```bash
conda activate my_env
```

### 3. 기존 환경 내보내기 (Export)

현재 활성화된 환경을 파일로 공유하고 싶을 때 사용한다.

```bash
conda env export > environment.yml
```

### 주의점

Conda channel과 pip를 혼용하여 package를 설치할 경우, dependency 충돌이 발생할 수 있다. 예를 들어 conda channel로 numpy를 설치한 뒤, pip로 scikit-learn을 설치하면 기존에 설치된 numpy version이 의도치 않게 변경될 수 있다.

따라서 conda 또는 pip 중 하나의 방식으로 통일하여 package를 설치하는 것을 권장한다. 다만 conda 혹은 conda-forge channel에 존재하지 않는 package는 pip로 설치할 수밖에 없으므로, 이러한 경우에 한해 제한적으로 pip를 사용하는 것이 안전하다. 부득이하게 혼용해야 한다면, conda package를 먼저 모두 설치한 뒤 pip package를 마지막에 일괄적으로 설치하여 충돌 가능성을 최소화할 수 있다.
---

## requirements.txt 란?

**requirements.txt**는 Python project에서 필요한 package 목록과 각 package의 version 정보를 기록한 텍스트 파일이다. 주로 `pip` package manager를 통해 library를 설치하고 관리할 때 사용하는 표준 방식이다.

- **범용성**: Conda뿐만 아니라 일반적인 Python 가상환경(venv) 등 모든 Python 환경에서 널리 사용된다.
- **경량성**: 환경 설정 전체를 담기보다 설치할 package list에 집중하므로 관리가 간편하다.
- **유연성**: 특정 version(`==`), 최소 version(`>=`), 또는 특정 범위의 version을 자유롭게 지정할 수 있다.

---

## requirements.txt 파일 작성 및 사용법

### 1. 파일 작성 단계

1. 텍스트 에디터를 열어 `requirements.txt` 파일을 생성한다.
2. 설치하고자 하는 package 이름을 한 줄에 하나씩 입력한다.
3. 특정 version이 필요할 경우 package 이름 뒤에 `==`, `>=`, `<=` 등의 연산자와 함께 version을 명시한다. (예: `pandas==2.0.3`)
4. 주석이 필요한 경우 `#`을 사용하여 설명을 추가할 수 있다.

### 2. 환경 생성 및 설치하기

`environment.yml`과 달리 가상환경을 먼저 생성하고 활성화한 뒤 package를 설치해야 한다.

```bash
# 가상환경 생성 (Python version 지정 권장)
conda create -n my_env python=3.9

# 가상환경 활성화
conda activate my_env

# requirements.txt에 기록된 package 설치
pip install -r requirements.txt
```

### 3. 기존 환경 내보내기 (Export)

현재 활성화된 환경에 설치된 pip package list를 파일로 저장하여 공유하고 싶을 때 사용한다.

```bash
pip freeze > requirements.txt
```

---

## environment.yml과 requirements.txt 비교

두 파일 모두 환경 재현을 위한 도구이지만, 관리 범위와 사용 방식에 차이가 있다.

- `environment.yml`은 Python version, conda channel, conda package, pip package를 모두 포함하여 환경 전체를 정의한다.
- `requirements.txt`는 pip package list만 포함하므로 Python version이나 가상환경 생성은 별도로 처리해야 한다.

---

## 활용 팁

- **협업**: 팀원과 동일한 환경을 공유하여 version 불일치 문제를 예방할 수 있다.
- **자동화**: CI/CD pipeline이나 Dockerfile과 결합하여 환경 구성을 자동화할 수 있다.
- **관리 용이**: 환경의 변경 내역을 Git과 같은 version 관리 system으로 추적할 수 있다.

---

## 참고자료

- [Conda 공식 문서: Managing environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
- [Conda 가상환경 그대로 옮기기 (Velog)](https://velog.io/@sheoyonj/Conda-%EA%B0%80%EC%83%81%ED%99%98%EA%B2%BD-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%98%AE%EA%B8%B0%EA%B8%B0)
- [Requirements File Format](https://pip.pypa.io/en/stable/reference/requirements-file-format/)
- [[python] requirements.txt로 패키지 관리하기](https://itholic.github.io/python-requirements/)