---
layout: post
title: "리눅스 명령어 정리"
date: 2025-03-31
categories: [linux]
tags:
  - ubuntu
description: "Linux Commend"
---

## 리눅스 명령어 정리

---

MobaXterm 또는 Terminal 등에서 자주 사용되는 명령어들을 정리한 예시입니다.

## 기본 명령어 모음

기본적인 명령어에 대한 설명입니다.

---

- `cd {dir}` : `{dir}` 로 이동하는 명령어입니다.

```bash
cd project  # 디렉토리를 home/user/project로 변경
cd ..  # 상위 디렉토리로 이동
cd -   # 이전 디렉토리로 이동
cd /data/processed  # 절대 경로로 디렉토리 이동
```

- **`ls`**: 현재 디렉토리 내 하위 파일 및 폴더 목록을 출력하는 명령어입니다.

```bash
ls  # 현재 디렉토리 내 파일 목록 출력
ls /project  # /project 디렉토리 내 파일 목록 출력
ls -a  # 숨김 파일을 포함한 파일 목록 출력
ls -l  # 파일의 자세한 정보를 포함한 목록 출력
ls *.csv  # 확장자가 .csv인 파일 목록 출력
```

- **`pwd`**: 현재 작업 중인 디렉토리의 절대 경로를 출력하는 명렁어 입니다.

```bash
pwd
```

- `mkdir {dir_name}`: `{dir_name}`이라는 새로운 디렉토리를 생성하는 명령어입니다.

```bash
mkdir new_folder  # 현재 디렉토리에 new_folder라는 디렉토리 생성
mkdir -p data/processed/new_folder  # 중첩된 디렉토리 생성 (없는 부모 디렉토리도 함께 생성)
```

- `rmdir {dir_name}`: 빈 디렉토리를 삭제하는 명령어입니다.

```bash
rmdir empty_folder  # 빈 디렉토리 삭제
```

- `rm {file}`: 파일을 삭제하는 명령어로, `-r` 옵션을 사용하면 디렉토리도 삭제할 수 있습니다.

```bash
rm test.csv  # test.csv 파일 삭제
rm -i test.csv  # 삭제 전에 확인 메시지 출력
rm -f test.csv  # 확인 없이 강제로 삭제
rm -r raw  # raw 디렉토리 및 그 안의 내용 삭제
rm -rf raw  # 강제로 디렉토리와 그 안의 내용 삭제
```

- `cp {source} {destination}`: 파일이나 디렉토리를 복사하는 명령어입니다.

```bash
cp train.csv /home/user/example/  # train.csv 파일을 example 디렉토리로 복사
cp -r raw /home/user/example/  # raw 디렉토리를 example 디렉토리로 복사
```

- `mv {source} {destination}`: 파일이나 디렉토리를 이동하거나 이름을 변경하는 명령어입니다.

```bash
mv file.txt /path/to/destination/  # file.txt를 지정된 경로로 이동
mv old_name.txt new_name.txt  # 파일 이름을 변경
```

- `touch {file}`: 새로운 빈 파일을 생성하는 명령어입니다.

```bash
touch newfile.txt  # newfile.txt 파일 생성
```

- `find {path} -name {pattern}`: `{path}`에서 `{pattern}`에 맞는 파일을 찾는 명령어입니다.

```bash
find /home/user/ -name "*.txt"  # .txt 확장자를 가진 파일 찾기
```

- `cat {file}`: 파일 내용을 출력하는 명령어입니다.

```bash
cat file.txt  # file.txt의 내용을 출력
```

- `history`: 현재까지의 명령어 히스토리를 출력하는 명령어입니다.

```bash
history # 명령어 히스토리 출력
```

- `clear`: 터미널 화면을 깨끗하게 지우는 명령어입니다.

```bash
clear  # 터미널 로그를 지우고 화면을 초기화
```

### 참고 자료

- [[한빛 채널: 카테고리]](https://www.hanbit.co.kr/channel/category/category_view.html?cms_code=CMS6390061632)

- [[TechPlay: Linux 명령어]](https://techplay.blog/%EB%A6%AC%EB%88%85%EC%8A%A4%EC%97%90%EC%84%9C-%EC%9E%90%EC%A3%BC%EC%82%AC%EC%9A%A9%EB%90%98%EA%B1%B0%EB%82%98-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%98%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4/)

---
