---
layout: post
title: "AutoDock 설치 가이드 (1/2)"
date: 2026-05-21
categories: ["Cheminformatics"]
tags:
  - AutoDock Vina 2
  - Quick Vina 2
description: "Docking simulation tool 사용법"
toc:
  sidebar: left
pretty_table: true
---

## 개요

이번 글에서는 protein-ligand docking simulation을 수행하기 위한 기본 환경을 구성한다. 실습에서 사용할 핵심 docking engine은 **AutoDock Vina**와 **Quick Vina 2**이다.

AutoDock Vina 계열 docking program은 protein과 ligand의 결합 pose를 탐색하고, scoring function을 통해 predicted binding affinity에 해당하는 docking score를 계산한다. AutoDock Vina는 ligand를 fragment 단위로 처리하며, bond length와 bond angle은 고정한 상태에서 주로 rotatable bond의 torsion을 탐색한다.

이번 설치 가이드에서는 다음 tool을 사용한다.

| Tool | 역할 |
|---|---|
| AutoDock Vina | 기본 docking engine |
| Quick Vina 2 | AutoDock Vina 계열의 빠른 docking engine |
| OpenBabel | SMILES 변환, protonation state 처리, 3D ligand structure 생성 |
| AutoDockTools_py3 | receptor와 ligand를 AutoDock Vina용 `pdbqt` format으로 변환 |

`Smina`도 AutoDock Vina 계열의 docking tool이지만, 본 글에서는 AutoDock Vina와 Quick Vina 2 사용에 집중하기 위해 설치 대상에서 제외한다.

## Conda env 생성

먼저 docking simulation용 conda 가상환경을 생성한다. 여러 cheminformatics package와 docking tool은 dependency 충돌이 발생할 수 있으므로, base environment에 직접 설치하기보다 별도의 가상환경을 사용하는 것이 좋다.

```bash
conda create -n docking python=3.9 -y
conda activate docking
```

환경이 정상적으로 활성화되었는지 확인한다.

```bash
python --version
which python
```

정상적으로 설정되었다면 현재 Python 경로가 docking environment 내부를 가리켜야 한다.

## AutoDock Vina와 OpenBabel 설치

AutoDock Vina와 OpenBabel은 conda-forge channel을 통해 설치할 수 있다.

```bash
conda install -c conda-forge vina openbabel openmm pdbfixer -y
```

여기서 `vina`는 AutoDock Vina docking engine이고, `openbabel`은 ligand preprocessing에 사용된다. 예를 들어 SMILES로부터 3D ligand structure를 생성하거나, pH 7.4 조건에서 protonation state를 처리할 때 `obabel` command를 사용할 수 있다.

설치 후 다음 명령어로 정상 설치 여부를 확인한다.

```bash
vina --help
obabel -V
```

## Quick Vina 2 설치

Quick Vina 2는 `qvina02` 실행파일을 다운로드하여 사용할 수 있다. 실습 자료에서는 Quick Vina 2가 AutoDock Vina 1과 거의 유사하지만, 더 빠른 변종이라고 설명한다.

먼저 Quick Vina 2 repository 또는 release page에서 Linux용 `qvina02` 실행파일을 다운로드한다.

```bash
https://github.com/QVina/qvina.git
```

```bash
# 예시: qvina02 파일을 현재 작업 폴더에 다운로드했다고 가정
chmod +x qvina02
```

실행 여부를 확인한다.

```bash
./qvina02 --help
```

현재 폴더에서만 사용할 경우 `./{your_path}/qvina02` 형태로 실행하면 된다.

```bash
./qvina02 --config config.txt --ligand ligand.pdbqt --out dock_ligand.pdbqt
```

어느 위치에서든 `qvina02`를 실행하고 싶다면 `PATH`에 등록된 디렉터리로 옮긴다. 예를 들어 개인 실행파일 폴더인 `~/bin`을 사용할 수 있다.

```bash
mkdir -p ~/bin
mv qvina02 ~/bin/
export PATH="$HOME/bin:$PATH"
```

위 설정을 영구적으로 적용하려면 `~/.bashrc`에 추가한다.

```bash
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

이후에는 다음처럼 실행할 수 있다.

```bash
qvina02 --help
```

## AutoDockTools_py3 설치

AutoDock Vina와 Quick Vina 2는 입력 파일로 `pdbqt` format을 사용한다. 따라서 일반적인 `pdb` 구조 파일을 docking에 사용하려면 receptor와 ligand를 `pdbqt`로 변환해야 한다.

이를 위해 `AutoDockTools_py3`를 설치한다.

```bash
git clone https://github.com/Valdes-Tresanco-MS/AutoDockTools_py3.git
cd AutoDockTools_py3
python setup.py install
```

설치가 끝난 뒤 `prepare_receptor4`와 `prepare_ligand4` command를 확인한다.

```bash
which prepare_receptor4
which prepare_ligand4

prepare_receptor4 -h
prepare_ligand4 -h
```

일부 실습 자료에서는 `.py` 확장자가 붙은 command를 사용하기도 한다. 만약 `.py` command로 실행하고 싶다면 아래도 확인한다.

```bash
which prepare_receptor4.py
which prepare_ligand4.py
```

다만 최신 `AutoDockTools_py3` 설치에서는 `console_scripts` 형태로 등록되어 `prepare_receptor4`, `prepare_ligand4`처럼 `.py` 없이 실행되는 경우가 많다.

## 설치 확인

지금까지 설치한 tool이 정상적으로 동작하는지 확인한다.

```bash
python --version
vina --help
qvina02 --help
obabel -V
prepare_receptor4 -h
prepare_ligand4 -h
```

각 command가 정상적으로 실행되면 기본 설치는 완료된 것이다.

## 최소 설치 구성 정리

AutoDock Vina와 Quick Vina 2를 사용하기 위한 최소 구성은 사용 목적에 따라 달라진다.

목적 | 필요한 tool

이미 준비된 `pdbqt` 파일로 docking만 수행	| `vina` 또는 `qvina02`
`pdb`를 `pdbqt`로 변환	| `AutoDockTools_py3`
SMILES에서 3D ligand structure 생성	| `OpenBabel`
AutoDock Vina 실행	| `vina`
Quick Vina 2 실행	| `qvina02`

따라서 본 실습에서는 smina를 설치하지 않고, 다음 조합만 사용한다.

- AutoDock Vina
- Quick Vina 2
- OpenBabel
- AutoDockTools_py3

## 간단한 실행 예시

설치가 끝난 뒤에는 receptor와 ligand를 `pdbqt`로 변환한 다음 docking을 수행할 수 있다.

### Receptor pdbqt 변환

```bash
prepare_receptor4 \
    -U nphs_lps \
    -r pdb/3HMMA_receptor_HOH.pdb \
    -o pdb/3HMMA_receptor_HOH.pdbqt
```

### Ligand pdbqt 변환

```bash
prepare_ligand4 \
    -U nphs_lps \
    -l pdb/3HMMA_855.pdb \
    -o pdb/3HMMA_855.pdbqt
```

### config.txt 작성

AutoDock Vina와 Quick Vina 2는 docking box 정보를 `config.txt`에 작성하여 사용할 수 있다.

```txt
receptor=pdb/3HMMA_receptor_HOH.pdbqt
center_x=17.994
center_y=68.852
center_z=7.446
size_x=26.718
size_y=19.984
size_z=22.033
cpu=10
num_modes=10
exhaustiveness=10
```

각 항목의 의미는 다음과 같다.

| Parameter                          | 의미                               |
| ---------------------------------- | -------------------------------- |
| `receptor`                         | docking에 사용할 receptor `pdbqt` 파일 |
| `center_x`, `center_y`, `center_z` | docking box 중심 좌표                |
| `size_x`, `size_y`, `size_z`       | docking box 크기                   |
| `cpu`                              | 사용할 CPU thread 수                 |
| `num_modes`                        | 출력할 binding pose 개수              |
| `exhaustiveness`                   | conformational search 강도         |

### AutoDock Vina 실행

```bash
vina \
    --config config.txt \
    --ligand pdb/3HMMA_855.pdbqt \
    --out dock_3HMMA_855_vina.pdbqt
```

### Quick Vina 2 실행

```bash
qvina02 \
    --config config.txt \
    --ligand pdb/3HMMA_855.pdbqt \
    --out dock_3HMMA_855_qvina.pdbqt
```

## 마무리

이번 글에서는 AutoDock Vina와 Quick Vina 2를 사용하기 위한 기본 환경을 구성하였다. smina는 별도의 docking tool이므로 본 실습에서는 제외하였고, SMILES 기반 ligand preprocessing을 위해 OpenBabel을 함께 설치하였다.

다음 글에서는 receptor와 ligand를 준비한 뒤, config.txt를 작성하고 실제 docking을 수행하는 과정을 정리한다.


## Chimera 설치

[Download Chimera](https://www.cgl.ucsf.edu/chimera/download.html)

```bash
chmod +x chimera-1.19-linux_x86_64.bin
./chimera-1.19-linux_x86_64.bin
```

mkdir -p /HDD1/rlawlsgurjh/tools



enter locatoin: ./your/path/

Install desktop menu and icon? no

[hit Enter for default (0)]: 가 나오면 0 입력 또는 Enter 입력한다


enter location에 폴더 안이 비어있어야 된다.

`chimera`는 GUI 프로그램이고, conda env 내부의 핵심 docking command처럼 자주 쓰는 실행파일이 아니기 때문임

설치가 끝난 후 `PATH`에 등록

```bash
echo 'export PATH="/HDD1/rlawlsgurjh/tools/chimera-1.19/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```



## PBI 설치

```bash
git clone https://github.com/gicsaw/PBI.git
```

```bash
python setup.py install
```
