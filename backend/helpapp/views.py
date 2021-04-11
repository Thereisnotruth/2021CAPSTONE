from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.shortcuts import render
from django.http import HttpResponse
from .models import User

def index(request):

    user_list = User.objects.order_by('-user_id')

    return render(request, 'helpapp/index.html')

def user_login(request):

    if request.method == 'POST':
        user_id = request.POST.get('username', '')
        user_pw = request.POST.get('password', '')
        user = authenticate(request, username=user_id, password=user_pw)
        print('출력', user_id, user_pw)
        if user is not None:
            login(request, user)
            return render(request, 'helpapp/index.html')
        else:
            return render(request, 'helpapp/login.html')
    else:
        return render(request, 'helpapp/login.html')

def signup(request):

    if request.method == 'POST':
        user_id = request.POST.get('user_id', '')
        user_pw = request.POST.get('user_pw', '')
        gender = request.POST.get('gender', '')

        print('유저', user_id, user_pw, gender)

        user = User(user_id=user_id, user_pw=user_pw, gender=gender)
        user.save()

        return render(request, 'helpapp/index.html')

    else:
        return render(request, 'helpapp/signup.html')