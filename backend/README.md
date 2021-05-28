"""
작성일: 2021.05.28
작성자: 신구현
"""

## Directory
backend
├─config : 프로젝트 setting 정보 설정 파일 보관
├─helpapp : 헬프스터디 웹 핵심 구동부
└─templates : 웹 앱 구동에 필요한 template 파일
  └─helpapp

## Description
- 헬스 스터디 웹앱 backend 구동을 담당하는 폴더
- front-end로부터 전송받은 정보를 DB에 저장하고, 서버 요청을 처리하는 역할
- 대표적인 역할은 다음과 같음
    1. User 회원가입/로그인 기능 처리
    2. Study 생성/가입/탈퇴/조회 기능 처리
    3. 게시판/글 생성/삭제/조회 기능
 
## Environment
### Version
- Python: 3.8.8
- Django: 3.1.7
- Django-restframework: 3.12.4
- Django_cors_headers: 3.7.0
- PyMysql: 1.0.2

### virtual env settings
cmd commands
1. python -m venv venv
    - 가상환경 생성
2. venv/scripts/activate
    - 가상환경 진입
3. pip install django==3.1.7
    - 프로젝트 실행에 필요한 프레임워크 및 라이브러리 설치
4. python manage.py runserver
    - Django server 실행