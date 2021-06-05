from django.urls import path

from . import views

""" front-end로부터 들어온 요청을 분리하고 해당 작업을 처리하는 view와 연결하는 파일

    Notes: 
        - 아래 주석을 참고하여 HTTP 요청 시 적절한 methods, data를 url로 통신할 것
        - /new로 요청 시 해당 데이터베이스 테이블에 해당하는 데이터 정보를 보낼 것
        - models.py 데이터베이스 구조 참고

    Paths:
    - User 관련
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
    - Study 관련    
        studies: 스터디 목록 조회 요청을 처리하는 url
            - GET
        studies/new: 스터디 생성 요청을 처리하는 url
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
    - Board 관련
        boards: board 목록 조회 요청을 받는 url
            - GET
        boards/new: board 생성 요청을 받는 url
            - POST
            - Data) board 테이블 생성에 필요한 데이터 (models.py: Board 클래스 참고)
        boards/<int:board_id>: board 상세 조회 요청을 받는 url
            - POST
            - Data) board_id
        boards/<int:board_id>/update: board 수정 요청을 받는 url
            - POST
            - Data) board_id, board 테이블 데이터 (models.py: Baord 클래스)
        boards/<int:board_id>/delete: board 삭제 요청을 받는 url
            - POST
            - Data) board_id, user_id
        boards/<int:board_id>/board_postlist: board안에 속한 postlist를 요청하는 url
            - POST
            - Data) board_id
    - Post 관련
        posts: post 목록 조회 요청을 받은 url
            - GET
        posts/new: post 생성 요청을 받는 url
            - POST
            - Data) post 테이블 생성에 필요한 데이터 (models.py: Post 클래스 참고)
        posts/<int:post_id>: post 상세 조회 요청을 받는 url
            - POST
            - Data) post_id
        posts/<int:post_id>/update: post 수정 요청을 받는 url
            - POST
            - Data) post_id, post 테이블 데이터 (models.py: POST 클래스)
        posts/<int:post_id>/delete: board 삭제 요청을 받는 url
            - POST
            - Data) post_id, user_id
"""

urlpatterns = [
    path('login', views.login),
    path('users', views.user_list),
    path('users/new', views.create_user),
    path('users/<str:user_id>', views.user_detail),
    path('users/<str:user_id>/save_time', views.save_time),
    path('users/<str:user_id>/mygroups', views.show_mygroups),
    path('studies', views.study_list),
    path('studies/new', views.create_study),
    path('studies/<int:study_id>', views.study_detail),
    path('studies/<int:study_id>/userlist', views.study_userlist),
    path('silent-refresh', views.silent_refresh),
    path('studies/<int:study_id>/join', views.study_join),
    path('studies/<int:study_id>/disjoin', views.study_disjoin),
    path('boards', views.board_list),
    path('boards/new', views.create_board),
    path('boards/<int:board_id>', views.board_detail),
    path('boards/<int:board_id>/update', views.board_update),
    path('boards/<int:board_id>/delete', views.board_delete),
    path('boards/<int:board_id>/board_postlist', views.board_postlist),
    path('posts', views.post_list),
    path('posts/new', views.create_post),
    path('posts/<int:post_id>', views.post_detail),
    path('posts/<int:post_id>/update', views.post_update),
    path('posts/<int:post_id>/delete', views.post_delete),
]