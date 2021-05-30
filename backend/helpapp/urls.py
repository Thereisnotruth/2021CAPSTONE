from django.urls import path

from . import views

""" front-end로부터 들어온 요청을 분리하고 해당 작업을 처리하는 view와 연결하는 파일

    Notes: 
        - 아래 주석을 참고하여 HTTP 요청 시 적절한 methods, data를 url로 통신할 것
        - /new로 요청 시 해당 데이터베이스 테이블에 해당하는 데이터 정보를 보낼 것
        - models.py 데이터베이스 구조 참고

    Paths:
        login: login 요청 처리하는 url
            - POST
            - Data) user_id, user_pw
        users: user 목록 조회 요청을 처리하는 url
            - GET
        users/new: user 생성 요청을 처리하는 url
            - POST
            - Data) user 생성에 필요한 정보
        users/<int:user_number>/: user 개인 정보를 조회 요청을 처리하는 url
            - POST
            - Data) user_number
        user/<int:user_number>/save_time: 운동 시간 저장 요청을 처리하는 url
            - POST
            - Data) user_number, 6개 부위별 exp
        user/<int:user_number>/mygroups: 해당 user가 가입한 스터디 조회 요청을 처리하는 url
            - POST
            - Data) user_number
        studies: 스터디 목록 조회 요청을 처리하는 url
            - GET
        studies/new: 스터드 생성 요청을 처리하는 url
            - POST
            - Data) Study 테이블 생성에 필요한 데이터
        studies/<int:study_id>/: 스터디 정보 조회를 요청하는 url
            - POST
            - Data) study_id
        studies/<int:study_id>/userlist: 스터디에 가입한 유저들을 조회하는 url
            - POST
            - Data) study_id
        studies/<int:study_id>/join: 스터디 가입 요청을 처리하는 url
            - POST
            - Data) user_id, study_id
        studies/<int:study_id>/disjoin: 스터디 탈퇴 요청을 처리하는 url
            - POST
            - Data) user_id, study_id
"""

urlpatterns = [
    path('login', views.login),
    path('users', views.user_list),
    path('users/new', views.create_user),
    path('users/<int:user_number>/', views.user_detail),
    path('users/<int:user_number>/save_time', views.save_time),
    path('users/<int:user_number>/mygroups', views.show_mygroups),
    path('studies', views.study_list),
    path('studies/new', views.create_study),
    path('studies/<int:study_id>/', views.study_detail),
    path('studies/<int:study_id>/userlist', views.study_userlist),
    path('silent-refresh', views.silent_refresh),
    path('studies/<int:study_id>/join', views.study_join),
    path('studies/<int:study_id>/disjoin', views.study_disjoin),
    path('posts', views.post_list),
    path('posts/new', views.create_post),
    path('posts/<int:post_id>/', views.post_detail),
    path('boards', views.board_list),
    path('boards/new', views.create_board),
    path('boards/<int:board_id>/', views.board_detail),
]