from django.urls import path

from . import views

urlpatterns = [
    path('index',   views.index),
    path('login',   views.user_login),
    path('signup',  views.signup),
    path('test',    views.test),
    path('', views.ListUser.as_view()),
    path('<int:pk>/', views.DetailUser.as_view()),
]