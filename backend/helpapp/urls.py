from django.urls import path

from . import views

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