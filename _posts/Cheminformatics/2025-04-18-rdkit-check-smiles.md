---
layout: post
title: "InChIKey를 이용한 동일 분자구조 비교"
date: 2025-04-18
categories: ["Cheminformatics"]
tags:
  - cheminformatics
  - rdkit
  - smiles
  - inchikey
  - molecular-identifier
description: "RDKit과 InChIKey를 이용한 동일 분자구조 비교"
toc:
  sidebar: left
pretty_table: true
---

## InChIKey 소개

SMILES는 molecule structure를 문자열로 표현하는 대표적인 molecular representation이다. 하지만 같은 molecule이라도 atom ordering이나 branch 표현 방식에 따라 서로 다른 SMILES로 작성될 수 있다.

예를 들어 ethanol은 다음과 같이 서로 다른 SMILES로 표현할 수 있다.

```text
CCO
OCC
```

두 SMILES string은 서로 다르지만, 실제로는 같은 ethanol structure를 나타낸다. 따라서 molecule의 동일 여부를 판단할 때 SMILES string을 그대로 비교하면 같은 molecule을 다른 molecule로 잘못 판단할 수 있다.

이 문제를 해결하기 위해 SMILES를 RDKit `Mol` object로 변환한 뒤, canonical representation 또는 molecular identifier를 생성하여 비교할 수 있다. 이 글에서는 InChIKey를 이용하여 두 SMILES가 같은 molecule을 나타내는지 확인하는 방법을 정리한다.

## InChI와 InChIKey

InChI는 International Chemical Identifier의 약자로, molecule structure를 표준화된 문자열로 표현하기 위한 identifier이다. InChIKey는 InChI를 고정 길이 hash 형태로 변환한 identifier이다.

InChI와 InChIKey의 차이는 다음과 같이 정리할 수 있다.

| Identifier | 설명 |
| --- | --- |
| InChI | Molecule structure 정보를 계층적으로 포함하는 긴 문자열 |
| InChIKey | InChI를 fixed-length hash 형태로 변환한 문자열 |
| Canonical SMILES | Toolkit의 canonicalization rule에 따라 생성된 SMILES |
| Input SMILES | 사용자가 입력한 원본 SMILES string |

InChIKey는 길이가 고정되어 있어 database matching, duplicate checking, compound ID mapping 등에 사용하기 편하다. 따라서 서로 다른 SMILES가 같은 molecule을 나타내는지 확인할 때 InChIKey 비교를 사용할 수 있다.

## RDKit에서 InChIKey 생성

RDKit에서는 SMILES를 `Mol` object로 변환한 뒤 `Chem.MolToInchiKey()`를 사용하여 InChIKey를 생성할 수 있다.

```python
from rdkit import Chem
from rdkit.Chem.rdchem import Mol


def get_inchikey(smiles: str) -> str | None:
    """
    Convert a SMILES string into an InChIKey.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        str | None: InChIKey if the input SMILES is valid, otherwise None.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    if mol is None:
        return None

    inchikey: str = Chem.MolToInchiKey(mol)

    return inchikey


smiles = "CCO"
inchikey = get_inchikey(smiles)

print(inchikey)
```

위 코드에서 `Chem.MolFromSmiles()`는 SMILES string을 RDKit `Mol` object로 변환한다. 이후 `Chem.MolToInchiKey()`는 해당 `Mol` object를 기반으로 InChIKey를 생성한다.

## 서로 다른 SMILES의 동일 여부 비교

두 SMILES가 같은 molecule을 나타내는지 확인하려면 각각을 InChIKey로 변환한 뒤, 두 InChIKey가 같은지 비교하면 된다.

```python
from rdkit import Chem
from rdkit.Chem.rdchem import Mol


def get_inchikey(smiles: str) -> str | None:
    """
    Convert a SMILES string into an InChIKey.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        str | None: InChIKey if the input SMILES is valid, otherwise None.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    if mol is None:
        return None

    inchikey: str = Chem.MolToInchiKey(mol)

    return inchikey


def is_same_molecule(smiles_1: str, smiles_2: str) -> bool:
    """
    Compare two SMILES strings using InChIKey.

    Args:
        smiles_1 (str): First input SMILES string.
        smiles_2 (str): Second input SMILES string.

    Returns:
        bool: True if both SMILES strings are valid and have the same InChIKey, otherwise False.
    """
    inchikey_1: str | None = get_inchikey(smiles_1)
    inchikey_2: str | None = get_inchikey(smiles_2)

    if inchikey_1 is None or inchikey_2 is None:
        return False

    return inchikey_1 == inchikey_2


smiles_1 = "CCO"
smiles_2 = "OCC"

print(get_inchikey(smiles_1))
print(get_inchikey(smiles_2))
print(is_same_molecule(smiles_1, smiles_2))
```

위 예시에서 `"CCO"`와 `"OCC"`는 서로 다른 SMILES string이지만 같은 ethanol molecule을 나타낸다. 따라서 두 SMILES를 InChIKey로 변환하면 같은 값이 생성되고, `is_same_molecule()` 함수는 `True`를 반환한다.

## Canonical SMILES와 InChIKey 비교

동일 molecule 여부를 확인할 때는 canonical SMILES를 사용할 수도 있다. RDKit에서는 `Chem.MolToSmiles()`에 `canonical=True`를 지정하여 canonical SMILES를 생성할 수 있다.

```python
from rdkit import Chem
from rdkit.Chem.rdchem import Mol


def get_canonical_smiles(smiles: str) -> str | None:
    """
    Convert a SMILES string into a canonical SMILES string.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        str | None: Canonical SMILES if the input SMILES is valid, otherwise None.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    if mol is None:
        return None

    canonical_smiles: str = Chem.MolToSmiles(
        mol,
        canonical=True,
        isomericSmiles=True,
    )

    return canonical_smiles


smiles_1 = "CCO"
smiles_2 = "OCC"

print(get_canonical_smiles(smiles_1))
print(get_canonical_smiles(smiles_2))
```

Canonical SMILES와 InChIKey는 모두 molecule comparison에 사용할 수 있지만, 목적에 따라 적절히 선택해야 한다.

| 방법 | 장점 | 주의점 |
| --- | --- | --- |
| Canonical SMILES | RDKit 내부에서 빠르게 생성 가능 | Toolkit과 option에 따라 결과가 달라질 수 있음 |
| InChIKey | Fixed-length identifier로 database matching에 편리함 | Standardization 기준에 따라 결과 해석이 달라질 수 있음 |

RDKit 내부 preprocessing이나 같은 환경에서의 duplicate checking에는 canonical SMILES가 유용하다. 반면 external database와 compound를 matching하거나, 서로 다른 source에서 수집한 molecule을 비교할 때는 InChIKey가 더 편리할 수 있다.

## Dataset에서 Duplicate Molecule 확인

실제 Cheminformatics dataset에서는 같은 molecule이 서로 다른 SMILES로 여러 번 등장할 수 있다. 이 경우 InChIKey를 생성한 뒤 중복 여부를 확인할 수 있다.

```python
from rdkit import Chem
from rdkit.Chem.rdchem import Mol
import pandas as pd


def get_inchikey(smiles: str) -> str | None:
    """
    Convert a SMILES string into an InChIKey.

    Args:
        smiles (str): Input SMILES string.

    Returns:
        str | None: InChIKey if the input SMILES is valid, otherwise None.
    """
    mol: Mol | None = Chem.MolFromSmiles(smiles)

    if mol is None:
        return None

    inchikey: str = Chem.MolToInchiKey(mol)

    return inchikey


def add_inchikey_column(df: pd.DataFrame, smiles_col: str) -> pd.DataFrame:
    """
    Add an InChIKey column to a DataFrame containing SMILES strings.

    Args:
        df (pd.DataFrame): Input DataFrame.
        smiles_col (str): Column name containing SMILES strings.

    Returns:
        pd.DataFrame: DataFrame with an added InChIKey column.
    """
    result_df: pd.DataFrame = df.copy()
    result_df["InChIKey"] = result_df[smiles_col].apply(get_inchikey)

    return result_df


data = {
    "CompoundID": ["mol1", "mol2", "mol3"],
    "SMILES": ["CCO", "OCC", "CC(=O)Oc1ccccc1C(=O)O"],
}

df = pd.DataFrame(data)
df = add_inchikey_column(df, smiles_col="SMILES")

print(df)
print(df[df.duplicated(subset=["InChIKey"], keep=False)])
```

위 코드는 `SMILES` column을 가진 `DataFrame`에 `InChIKey` column을 추가한다. 이후 `duplicated()`를 사용하면 같은 InChIKey를 가진 molecule을 확인할 수 있다.

`mol1`과 `mol2`는 서로 다른 SMILES로 입력되었지만 같은 ethanol을 나타내므로 같은 InChIKey를 가진다. 따라서 InChIKey 기준 duplicate molecule로 확인된다.

## InChIKey 비교 시 주의점

InChIKey 비교는 단순 SMILES string 비교보다 안정적이지만, 항상 모든 chemical equivalence 문제를 해결하는 것은 아니다. 특히 molecule standardization 기준에 따라 동일 여부 판단 결과가 달라질 수 있다.

주의해야 할 대표적인 요소는 다음과 같다.

| 요소 | 설명 |
| --- | --- |
| Salt form | 같은 active compound라도 salt가 포함되면 identifier가 달라질 수 있음 |
| Protonation state | pH나 charge state에 따라 structure 표현이 달라질 수 있음 |
| Tautomer | 같은 compound의 tautomeric form이 다른 identifier를 가질 수 있음 |
| Stereochemistry | stereochemistry 유지 여부에 따라 같은 molecule 또는 다른 molecule로 판단될 수 있음 |
| Isotope | isotope 정보가 포함되면 identifier가 달라질 수 있음 |

따라서 large-scale dataset에서 duplicate molecule을 제거할 때는 InChIKey를 생성하기 전에 standardization rule을 먼저 정해야 한다. 예를 들어 salt removal, charge normalization, tautomer canonicalization, stereochemistry 유지 여부 등을 명확히 해야 한다.

## Summary

SMILES는 molecule structure를 표현하는 유용한 문자열 형식이지만, 같은 molecule도 여러 SMILES로 표현될 수 있다. 따라서 molecule의 동일 여부를 판단할 때 input SMILES string을 그대로 비교하는 것은 적절하지 않다.

RDKit에서는 SMILES를 `Mol` object로 변환한 뒤 InChIKey를 생성할 수 있다. 두 SMILES의 InChIKey가 같으면 동일한 molecule structure를 나타낸다고 판단할 수 있다.

Canonical SMILES도 동일 molecule 비교에 사용할 수 있지만, toolkit과 option에 따라 결과가 달라질 수 있다. InChIKey는 fixed-length identifier이므로 database matching과 duplicate checking에 유용하다.

다만 InChIKey 비교 결과는 salt form, protonation state, tautomer, stereochemistry, isotope 정보에 영향을 받을 수 있다. 따라서 실제 dataset preprocessing에서는 standardization 기준을 먼저 정한 뒤 InChIKey를 생성하는 것이 중요하다.

## References

- RDKit Documentation. "Getting Started with the RDKit in Python."
- RDKit Documentation. "rdkit.Chem.inchi module."
