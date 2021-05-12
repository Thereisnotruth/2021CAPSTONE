from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def user_list(request):
    user_list = User.objects.all()
    serializer = UserSerializer(user_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def user_detail(request, user_number):
    user = User.objects.filter(user_number=user_number)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def create_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny),)
def save_time(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user_id = serializer.data['user_id']
        user = User.objects.get(user_id=user_id)

        user.back_exp = serializer.data['back_exp']
        user.chest_exp = serializer.data['chest_exp']
        user.shoulder_exp = serializer.data['shoulder_exp']
        user.belly_exp = serializer.data['belly_exp']
        user.arm_exp = serializer.data['arm_exp']
        user.leg_exp = serializer.data['leg_exp']
        user.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def study_list(request):
    study_list = Study.objects.all()
    serializer = StudySerializer(study_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def study_detail(request, study_id):
    study = Study.objects.filter(study_id=study_id)
    serializer = StudySerializer(study, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def create_study(request):
    if request.method == 'POST':
        user_id = request.GET.get('user_id')
        study_name = request.GET.get('study_name')
        study_exp = request.GET.get('study_exp')
        study = Study(study_name=study_name, user_id=user_id, study_exp=study_exp)
        study.save()
        user_study = User_Study(user_id=user_id, study_id=study.study_id)
        user_study.save()
        serializer = StudySerializer(study)

        return JsonResponse(serializer.data, status=400)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def study_userlist(request, study_id):
    userlist = User_Study.objects.filter(study_id=study_id)
    serializer = UserStudySerializer(userlist, many=True)
    return JsonResponse(serializer.data, status=200)


class DiffPw(Exception):    # Exception을 상속받아서 새로운 예외를 만듦
    def __init__(self):
        super()

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login(request):
    if request.method == 'POST':
        print(request.data)
        id = request.data['user_id']
        pw = request.data['user_pw']
        try:
            user = User.objects.get(user_id=id)
            serializer = UserSerializer(user)
            if pw != serializer.data['user_pw']:
                raise DiffPw
            res = JsonResponse(serializer.data, status=200)
            res.set_cookie('user', id, 3600)
            return res
        except User.DoesNotExist:
            return JsonResponse({ 'Error': '회원이 아님' }, status=400)
        except DiffPw:
            return JsonResponse({ 'Error': '비밀번호가 다름' }, status=401)