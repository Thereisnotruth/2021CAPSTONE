from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login),
    path('users', views.user_list),
    path('users/new', views.create_user),
    path('users/<int:user_number>/', views.user_detail),
    path('studies', views.study_list),
    path('studies/new', views.create_study),
    path('studies/<int:study_id>/', views.study_detail),
    path('studies/<int:study_id>/userlist', views.study_userlist),
    path('silent-refresh', views.silent_refresh),
]