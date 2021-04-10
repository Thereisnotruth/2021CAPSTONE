from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.shortcuts import render
from django.http import HttpResponse
from .models import Member

def index(request):

    member_list = Member.objects.order_by('-height')

    return render(request, 'helpapp/index.html')

def user_login(request):

    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        print('출력', username, password)
        if user is not None:
            login(request, user)
            return render(request, 'helpapp/index.html')
        else:
            return render(request, 'helpapp/login.html')
    else:
        return render(request, 'helpapp/login.html')

def signup(request):

    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        gender = request.POST.get('gender', '')
        height = request.POST.get('height', '')
        weight = request.POST.get('weight', '')
        muscle = request.POST.get('muscle', '')
        fat = request.POST.get('fat', '')

        print('유저', username, password, gender , weight, height, muscle, fat)

        user = Member(username=username, password=password, gender=gender,
                      height=height, weight=weight, muscle=muscle, fat=fat)
        user.save()

        return render(request, 'helpapp/index.html')

    else:
        return render(request, 'helpapp/signup.html')