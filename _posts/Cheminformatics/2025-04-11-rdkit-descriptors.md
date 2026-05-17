---
layout: post
title: "RDKit 기초"
date: 2025-04-11
categories: ["Cheminformatics"]
tags:
  - cheminformatics
  - molecular-representation
  - rdkit
description: "RDKit 사용법 기초"
toc:
  sidebar: left
pretty_table: true
---

## RDKit 소개

RDKit은 Cheminformatics에서 널리 사용되는 open-source toolkit이다. Molecule parsing, descriptor 계산, fingerprint 생성, substructure search, molecular visualization 등 다양한 기능을 제공한다.

Drug discovery 연구에서는 compound의 SMILES를 입력으로 받아 molecular representation을 만들거나, basic physicochemical property를 계산하는 과정에서 RDKit을 자주 사용한다. RDKit의 기본적인 사용 흐름은 다음과 같다.

1. SMILES를 입력으로 받는다.
2. SMILES를 RDKit `Mol` object로 변환한다.
3. `Mol` object를 기반으로 descriptor, fingerprint, molecular property 등을 계산한다.

---

## Mol Object

RDKit에서 가장 기본이 되는 molecular representation은 `Mol` object이다. `Mol` object는 atom, bond, aromaticity, charge, stereochemistry 등 molecule graph에 필요한 정보를 포함하는 내부 객체이다.

SMILES는 molecule을 문자열로 표현한 형식이고, `Mol` object는 RDKit이 SMILES를 계산 가능한 molecular graph로 해석한 결과라고 볼 수 있다. 따라서 descriptor 계산이나 molecular property 분석을 수행하려면 먼저 SMILES를 `Mol` object로 변환해야 한다.

```python
from rdkit import Chem
from rdkit.Chem.rdchem import Mol


def smiles_to_mol(smiles: str) -> Mol | None:
    """
    Convert a SMILES string into an RDKit Mol object.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        Mol | None: RDKit Mol object if the SMILES is valid, otherwise None.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    return mol


smiles = "CCO"
mol = smiles_to_mol(smiles)

if mol is None:
    print("Invalid SMILES")
else:
    print("Valid molecule")
```

위 코드에서 `Chem.MolFromSmiles()`는 SMILES string을 RDKit `Mol` object로 변환한다. 유효하지 않은 SMILES가 입력되면 `None`이 반환될 수 있으므로, 실제 dataset을 처리할 때는 invalid SMILES를 확인하는 과정이 필요하다.

---

## Descriptor 계산

Molecular descriptor는 molecule의 structure나 physicochemical property를 numerical value로 요약한 feature이다. Descriptor는 QSAR, ADMET prediction, molecular property prediction 등에서 input feature 또는 compound filtering 기준으로 사용된다.

RDKit에서는 `Descriptors` module을 사용하여 다양한 descriptor를 계산할 수 있다. 대표적인 descriptor는 다음과 같다.

| Descriptor | 의미 |
| :--- | :--- |
| **MolWt** | Molecular weight |
| **MolLogP** | Octanol-water partition coefficient의 예측값 |
| **NumHDonors** | Hydrogen bond donor 개수 |
| **NumHAcceptors** | Hydrogen bond acceptor 개수 |
| **TPSA** | Topological polar surface area |
| **NumRotatableBonds** | Rotatable bond 개수 |

```python
from rdkit import Chem
from rdkit.Chem import Descriptors
from rdkit.Chem.rdchem import Mol


def calculate_basic_descriptors(smiles: str) -> dict[str, float | int] | None:
    """
    Calculate basic molecular descriptors from a SMILES string.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        dict[str, float | int] | None: Dictionary containing molecular descriptors if the SMILES is valid,
        otherwise None.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    if mol is None:
        return None

    descriptor_dict: dict[str, float | int] = {
        "MolWt": Descriptors.MolWt(mol),
        "MolLogP": Descriptors.MolLogP(mol),
        "NumHDonors": Descriptors.NumHDonors(mol),
        "NumHAcceptors": Descriptors.NumHAcceptors(mol),
        "TPSA": Descriptors.TPSA(mol),
        "NumRotatableBonds": Descriptors.NumRotatableBonds(mol),
    }

    return descriptor_dict


smiles = "CC(=O)Oc1ccccc1C(=O)O"
descriptor_dict = calculate_basic_descriptors(smiles)

print(descriptor_dict)
```

위 예시는 aspirin의 SMILES를 입력으로 받아 basic molecular descriptor를 계산한다. 반환된 dictionary는 molecule-level physicochemical property를 포함한다.

Descriptor는 molecule의 전체 구조를 하나의 numerical feature set으로 요약한다는 장점이 있다. 다만 descriptor만으로 molecule의 모든 structural information을 표현할 수는 없으므로, fingerprint, graph representation, molecular image representation 등과 함께 사용할 수 있다.

---

## Lipinski's Rule of Five

Lipinski's rule of five는 oral drug-likeness를 빠르게 판단하기 위한 empirical rule이다. 이 rule은 compound의 absorption 또는 permeation 문제가 발생할 가능성을 molecular property 기준으로 평가한다.

Lipinski's rule은 일반적으로 다음 네 가지 조건을 사용한다.

| 조건 | 기준 |
| :--- | :--- |
| **Molecular weight** | $$\le 500$$ |
| **LogP** | $$\le 5$$ |
| **Hydrogen bond donors** | $$\le 5$$ |
| **Hydrogen bond acceptors** | $$\le 10$$ |

Lipinski's rule에서는 위 조건을 위반하는 개수가 많을수록 oral absorption 또는 permeation 측면에서 불리할 가능성이 있다고 해석한다. 일반적으로 violation이 1개 이하이면 Lipinski's rule을 통과한다고 판단하는 경우가 많다.

```python
from rdkit import Chem
from rdkit.Chem import Descriptors
from rdkit.Chem.rdchem import Mol


def check_lipinski_rule(smiles: str) -> dict[str, float | int | bool] | None:
    """
    Check whether a molecule satisfies Lipinski's rule of five.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        dict[str, float | int | bool] | None: Dictionary containing Lipinski properties,
        violation count, and pass/fail result if the SMILES is valid, otherwise None.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    if mol is None:
        return None

    mol_wt: float = Descriptors.MolWt(mol)
    log_p: float = Descriptors.MolLogP(mol)
    hbd: int = Descriptors.NumHDonors(mol)
    hba: int = Descriptors.NumHAcceptors(mol)

    violations: int = 0

    if mol_wt > 500:
        violations += 1

    if log_p > 5:
        violations += 1

    if hbd > 5:
        violations += 1

    if hba > 10:
        violations += 1

    result: dict[str, float | int | bool] = {
        "MolWt": mol_wt,
        "MolLogP": log_p,
        "NumHDonors": hbd,
        "NumHAcceptors": hba,
        "Violations": violations,
        "LipinskiPass": violations <= 1,
    }

    return result


smiles = "CC(=O)Oc1ccccc1C(=O)O"
lipinski_result = check_lipinski_rule(smiles)

print(lipinski_result)
```

위 코드는 SMILES를 입력받아 Lipinski's rule 통과 여부를 판단한다. `violations`는 네 가지 조건 중 몇 개를 위반했는지를 의미하고, `LipinskiPass`는 violation이 1개 이하인지 여부를 나타낸다.

다만 Lipinski's rule은 절대적인 drug-likeness 기준이 아니라 rule-based filtering 기준이다. Peptide-like compound, natural product, transporter substrate, macrocycle 등은 rule을 벗어나더라도 drug candidate가 될 수 있다. 따라서 Lipinski's rule은 compound filtering의 초기 기준으로 사용하는 것이 적절하다.

---

## 전체 예시 코드

아래 코드는 SMILES list를 입력받아 basic descriptor와 Lipinski's rule 결과를 한 번에 계산하는 예시이다.

```python
from rdkit import Chem
from rdkit.Chem import Descriptors
from rdkit.Chem.rdchem import Mol


def summarize_molecule(smiles: str) -> dict[str, str | float | int | bool | None]:
    """
    Summarize a molecule using RDKit.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        dict[str, str | float | int | bool | None]: Dictionary containing molecular descriptors,
        Lipinski violation count, and pass/fail result.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    if mol is None:
        return {
            "InputSMILES": smiles,
            "Valid": False,
            "MolWt": None,
            "MolLogP": None,
            "NumHDonors": None,
            "NumHAcceptors": None,
            "TPSA": None,
            "NumRotatableBonds": None,
            "Violations": None,
            "LipinskiPass": None,
        }

    mol_wt: float = Descriptors.MolWt(mol)
    log_p: float = Descriptors.MolLogP(mol)
    hbd: int = Descriptors.NumHDonors(mol)
    hba: int = Descriptors.NumHAcceptors(mol)
    tpsa: float = Descriptors.TPSA(mol)
    rot_bonds: int = Descriptors.NumRotatableBonds(mol)

    violations: int = 0

    if mol_wt > 500:
        violations += 1

    if log_p > 5:
        violations += 1

    if hbd > 5:
        violations += 1

    if hba > 10:
        violations += 1

    summary: dict[str, str | float | int | bool | None] = {
        "InputSMILES": smiles,
        "Valid": True,
        "MolWt": mol_wt,
        "MolLogP": log_p,
        "NumHDonors": hbd,
        "NumHAcceptors": hba,
        "TPSA": tpsa,
        "NumRotatableBonds": rot_bonds,
        "Violations": violations,
        "LipinskiPass": violations <= 1,
    }

    return summary


smiles_list = [
    "CCO",
    "CC(=O)Oc1ccccc1C(=O)O",
    "invalid_smiles",
]

for smiles in smiles_list:
    result = summarize_molecule(smiles)
    print(result)
```

이 코드는 SMILES preprocessing의 가장 기본적인 형태를 보여준다. 실제 dataset을 다룰 때는 이 결과를 `pandas.DataFrame`으로 변환하여 CSV로 저장하거나, invalid molecule을 제거한 뒤 downstream model input으로 사용할 수.있다.

---

## Summary

RDKit의 기본 사용 흐름은 SMILES를 `Mol` object로 변환한 뒤, 해당 `Mol` object를 기반으로 descriptor와 molecular property를 계산하는 방식이다.

- **Mol object**는 RDKit 내부에서 molecule을 graph structure로 다루기 위한 핵심 representation이다.
- **Descriptor 계산**은 `Mol` object를 입력으로 사용하며, molecular property prediction이나 compound filtering에서 기본 feature로 활용할 수 있다.
- **Lipinski's rule**은 molecular weight, LogP, hydrogen bond donor, hydrogen bond acceptor를 기준으로 oral drug-likeness를 빠르게 평가하는 rule-based filter이다. 다만 절대적인 기준은 아니며, compound class와 연구 목적에 따라 예외가 존재한다.

서로 다른 SMILES가 같은 molecule을 나타내는지 확인하는 방법은 다음 글에서 canonical SMILES와 InChIKey를 중심으로 정리한다.

---

## References
- RDKit Documentation. ["Getting Started with the RDKit in Python."](https://www.rdkit.org/docs/GettingStartedInPython.html)
- RDKit Documentation. ["rdkit.Chem module."](https://www.rdkit.org/docs/source/rdkit.Chem.html#module-rdkit.Chem)
- RDKit Documentation. ["rdkit.Chem.Descriptors module."](https://www.rdkit.org/docs/source/rdkit.Chem.Descriptors.html#module-rdkit.Chem.Descriptors)
