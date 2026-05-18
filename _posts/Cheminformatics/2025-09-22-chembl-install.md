---
layout: post
title: "ChEMBL Database 설치 및 PostgreSQL 복원 가이드"
date: 2025-09-22
categories: [Cheminformatics]
tags:
  - cheminformatics
  - database
description: "PostgreSQL 기반의 ChEMBL 데이터베이스를 다운로드하고 로컬 서버에 설치 및 복원(Restore)하는 방법 정리"
toc:
  sidebar: left
---

ChEMBL은 분자 구조, 생리활성 및 생물학적 표적 정보를 제공하는 대표적인 대규모 데이터베이스이다. 신약 개발 및 화학정보학 연구에서 널리 활용된다. 본 포스트에서는 PostgreSQL 기반의 ChEMBL 데이터베이스를 다운로드하고 설치하여 로컬 서버에 구축하는 과정을 단계별로 정리한다.

---

### 1. ChEMBL PostgreSQL DB 다운로드 및 압축 해제

PostgreSQL 전용 ChEMBL dump 파일을 다운로드하고 압축을 해제한다. (2025년 9월 기준 `chembl_36`이 최신 릴리스 버전이다.)

```bash
# 최신 ChEMBL PostgreSQL dump 파일 다운로드
wget https://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb/latest/chembl_36_postgresql.tar.gz

# 다운로드한 파일 압축 해제
tar -zxvf chembl_36_postgresql.tar.gz
```

---

### 2. Dump 파일을 임시 디렉토리 (`/tmp`)로 이동

PostgreSQL의 복원 명령어인 `pg_restore`를 실행할 때, 데이터베이스 관리자 계정(`postgres`)이 dump 파일에 원활하게 접근할 수 있도록 파일을 공용 임시 디렉토리인 `/tmp/` 경로로 이동한다. 이때, 사용자가 실제 다운로드 및 압축 해제 작업을 진행한 상위 커스텀 경로(`/path/to/custom_path`, 예: `/home/{username}/hdd/data/`) 아래에 생성된 `chembl_36_postgresql/chembl_36_postgresql.dmp` 파일의 위치를 정확하게 지정해야 한다.

```bash
# 압축 해제된 dmp 파일을 /tmp/ 경로로 이동
# ('/path/to/custom_path' 부분은 본인의 실제 작업 환경에 맞는 상위 디렉토리 경로로 대체해야 한다.)
mv /path/to/custom_path/chembl_36_postgresql/chembl_36_postgresql.dmp /tmp/
```

---

### 3. PostgreSQL 데이터베이스 생성 및 복원 (Restore)

새로운 데이터베이스를 생성하고, `/tmp` 경로로 옮긴 dump 파일을 복원한다.

```bash
# 1. ChEMBL 데이터베이스 생성
sudo -u postgres createdb chembl_36

# 2. pg_restore를 이용해 dump 파일로부터 데이터 복원
sudo -u postgres pg_restore --verbose -d chembl_36 /tmp/chembl_36_postgresql.dmp
```

---

### 참고 자료

- [ChEMBL PostgreSQL](https://chembl.github.io/chembl-postgresql/)
- [Downloads &#124; ChEMBL Interface Documentation](https://chembl.gitbook.io/chembl-interface-documentation/downloads)
- [Index of /pub/databases/chembl/ChEMBLdb/latest](https://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb/latest/)
