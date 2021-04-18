from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework.parsers import JSONParser

class ListUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
@csrf_exempt
def signup(request):

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        print('유저', data)
        print('시리얼라이저', serializer)
        if serializer.is_valid(): 
            serializer.save() 
            return JsonResponse(serializer.data, status=201) 
        return JsonResponse(serializer.errors, status=400)

    else:
        return render(request, 'helpapp/signup.html')
    
@csrf_exempt
def test(request):
    # 프론트는 Json 형식의 데이터를 받아서 화면에 표시
    if request.method == 'GET':
        return JsonResponse({
            'message': 'GET 테스트'
        }, json_dumps_params={'ensure_ascii': False}, status=200)
    elif request.method == 'POST':
        return JsonResponse({
            'message': 'POST 테스트'
        }, json_dumps_params={'ensure_ascii': False}, status=200)