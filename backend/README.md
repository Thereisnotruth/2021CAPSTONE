'''
작성일: 2021.05.28 <br>
작성자: 신구현 <br>
'''
## Install Dependencies
```
pip install -r requirements.txt
```

## Directory
helpapp <br>
├─migrations: Database migrations 파일 보관<br>
│  └─__pycache__ <br>
├─admin.py: django admin 페이지 관련 설정 파일 <br>
├─apps.py <br>
├─models.py: Database에 저장될 테이블을 정의한 파일 <br>
├─serializers.py: front-end 통신을 위한 REST API 구현 파일 <br>
├─test.py: unit test를 위한 파일 <br>
├─urls.py: 서버 요청을 처리하는 url 설정 파일 <br>
├─views.py: front로부터 들어온 요청을 처리하는 파일 <br>
├─manage.py: django 실행 파일 <br>
└─__init.py__: python 초기 설정 파일 <br>

## Description
- 헬스 스터디 웹(앱)의 실제 서버 기능을 담당하는 폴더
