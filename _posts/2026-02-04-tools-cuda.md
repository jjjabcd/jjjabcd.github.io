---
layout: post
title: "PyTorch 입문: CPU vs GPU 버전 차이와 CUDA 가속 확인하기"
date: 2026-02-04
categories: [tools]
tags:
  - pytorch
  - environment
description: "PyTorch의 CPU/GPU 버전 차이를 이해하고 CUDA 가속 가능 여부를 확인하는 방법"
---

PyTorch는 딥러닝 모델을 구축하고 학습시키기 위한 강력한 도구입니다. 하지만 설치 단계에서 가장 먼저 마주하는 선택지가 있습니다. 바로 **CPU 전용 버전**으로 설치할 것인지, 아니면 **GPU(CUDA) 지원 버전**으로 설치할 것인지입니다.

### 1. PyTorch: 왜 GPU 버전이 필요한가?

PyTorch는 연산 방식에 따라 두 가지 버전으로 나뉩니다.

- **CPU 버전**: 컴퓨터의 중앙 처리 장치(CPU)만을 사용합니다. 데이터 전처리나 가벼운 모델 테스트에는 적합하지만, 복잡한 딥러닝 모델을 학습시키기에는 속도가 매우 느립니다.
- **GPU(CUDA) 버전**: NVIDIA의 GPU 가속 기술인 **CUDA**를 활용합니다. 수천 개의 코어가 동시에 행렬 연산을 수행하므로, CPU 대비 수십 배 이상의 학습 속도 향상을 기대할 수 있습니다. 딥러닝 연구와 실무에서는 사실상 필수적입니다.

---

### 2. 설치 후 CUDA 사용 가능 여부 확인하기

GPU 버전의 PyTorch를 설치했다면, 실제로 내 그래픽 카드(CUDA)를 인식하고 있는지 확인해야 합니다.

#### **터미널(Terminal)에서 확인**

```bash
python -c "import torch; print(f'PyTorch version: {torch.__version__}'); print(f'CUDA Available: {torch.cuda.is_available()}')"
```

#### **Jupyter Notebook / Python Scripts에서 확인**

```python
import torch

# 1. PyTorch 버전 확인
print(f'PyTorch version: {torch.__version__}')

# 2. CUDA(GPU) 가속 가능 여부 확인
print(f'CUDA Available: {torch.cuda.is_available()}')

# 3. 구체적인 디바이스 이름 확인
if torch.cuda.is_available():
    print(f'Current Device: {torch.cuda.get_device_name(0)}')
else:
    print("Current Device: CPU")
```

### 3. 결과 해석 및 트러블슈팅

- **`CUDA Available: True`**
  - GPU 가속 연산을 사용할 모든 준비가 완료되었습니다.
- **`CUDA Available: False`**
  - 현재 PyTorch가 GPU를 인식하지 못해 CPU 모드로만 동작하는 상태입니다. GPU가 장착된 환경임에도 `False`가 뜬다면 아래 항목들을 순차적으로 점검해야 합니다.
  - **체크리스트 (이중 들여쓰기)**
    - **패키지 확인**: PyTorch 설치 시 `cpu` 전용 패키지를 선택하여 설치했는지 점검합니다.
    - **드라이버 업데이트**: 호스트 머신의 NVIDIA 드라이버가 최신 버전인지 확인합니다.
    - **버전 호환성**: 설치된 NVIDIA 드라이버가 지원하는 CUDA 버전과 PyTorch가 요구하는 CUDA 런타임 버전이 일치하는지 확인합니다.
    - **런타임 라이브러리**: 시스템에 설치된 CUDA Toolkit과 PyTorch 내장 CUDA 라이브러리 간의 충돌 여부를 확인합니다.
