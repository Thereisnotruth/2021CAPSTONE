from django.urls import path

from . import views

urlpatterns = [
    path('index', views.index),
    path('login', views.user_login),
    path('signup', views.signup),
]