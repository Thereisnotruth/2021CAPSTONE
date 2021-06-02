from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def user_list(request):
    user_list = User.objects.all()
    serializer = UserSerializer(user_list, many=True)
    return JsonResponse(serializer.data, status=200)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def user_detail(request, user_number):
    user = User.objects.get(user_number=user_number)
    serializer = UserSerializer(user)
    print(serializer.data)
    return JsonResponse(serializer.data, status=200)

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
@permission_classes((permissions.AllowAny,))
def show_mygroups(request, user_id):
    if request.method == 'POST':
        user_id = request.data['user_id']
        user = get_object_or_404(User, user_id=user_id)
        study_list = Study.objects.filter(user_id=user)
        serializer = StudySerializer(data=study_list, many=True)
        return JsonResponse(serializer.data, status=200)
    return HttpResponse(status=400)

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
    return JsonResponse(serializer.data, status=200, safe=False)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def study_detail(request, study_id):
    study = Study.objects.filter(study_id=study_id)
    serializer = StudySerializer(study, many=True)
    return JsonResponse(serializer.data, status=200)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def create_study(request):
    if request.method == 'POST':
        user_id = request.data['user_id']
        study_name = request.data['study_name']
        capacity = request.data['capacity']
        print(request)
        print(user_id)
        user = get_object_or_404(User, user_id=user_id)
        study = Study(study_name=study_name, user_id=user, capacity=capacity)
        study.save()
        user_study = User_Study(user_id=user, study_id=study)
        user_study.save()
        print(user_study)
        serializer = UserStudySerializer(study)
        return JsonResponse(serializer.data, status=201)

    return HttpResponse(status=400)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def study_userlist(request, study_id):
    userlist = User_Study.objects.filter(study_id=study_id)
    serializer = UserStudySerializer(userlist, many=True)
    return JsonResponse(serializer.data, status=200)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def study_join(request, study_id):
    if request.method == 'POST':
        study = get_object_or_404(Study, study_id=study_id)
        user = get_object_or_404(User, user_id=request.data['user_id'])
        user_study = User_Study(user_id=user, study_id=study)
        user_study.save()
        study.current_user_count += 1
        study.save()

        return HttpResponse(status=201)
    return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def study_disjoin(request, study_id):
    if request.method == 'POST':
        study = get_object_or_404(Study, study_id=study_id)
        user = get_object_or_404(User, user_id=request.data['user_id'])
        User_Study.objects.get(user_id=user, study_id=study).delete()
        study.current_user_count -= 1
        study.save()

        return HttpResponse(status=201)
    return HttpResponse(status=200)

class DiffPw(Exception):    # Exception을 상속받아서 새로운 예외를 만듦
    def __init__(self):
        super()

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login(request):
    if request.method == 'POST':
        id = request.data['user_id']
        pw = request.data['user_pw']
        print(request.data);
        try:
            user = User.objects.get(user_id=id)
            serializer = UserSerializer(user)
            if pw != serializer.data['user_pw']:
                raise DiffPw
            res = JsonResponse(serializer.data, status=200)
            res.set_cookie('refreshToken', id, 600, httponly=True)
            return res
        except User.DoesNotExist:
            return JsonResponse({ 'Error': '회원이 아님' }, status=400)
        except DiffPw:
            return JsonResponse({ 'Error': '비밀번호가 다름' }, status=401)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def silent_refresh(request):
    if request.method == 'POST':
        res = JsonResponse({ 'Message': '로그인 갱신' }, status=201)
        res.set_cookie('refreshToken', request.data['id'], 600, httponly=True)
        return res;
@api_view(['GET'])
@permission_classes(permissions.AllowAny)
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(data=posts, many=True)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes(permissions.AllowAny)
def create_post(request):
    if request.method == 'POST':
        user_id = request.data['user_id']
        board_id = request.data['board_id']
        post_title = request.data['post_title']
        post_content = request.data['post_content']
        post = Post(user_id=user_id, board_id=board_id, post_title=post_title, post_content=post_content)
        post.save()
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data, status=201)
    else:
        return HttpResponse(status=400)

@api_view(['GET'])
@permission_classes(permissions.AllowAny)
def post_detail(request, post_id):
    if request.method == 'GET':
        post = Post.objects.filter(post_id=post_id)
        serializer = PostSerializer(data=post)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)

@api_view(['GET'])
@permission_classes(permissions.AllowAny)
def board_list(request):
    if request.method == 'GET':
        board = Board.objects.all()
        serializer = BoardSerializer(data=board)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)


@api_view(['POST'])
@permission_classes(permissions.AllowAny)
def create_board(request):
    if request.method == 'POST':
        board_name = request.data['board_name']
        board = Board(board_name=board_name)
        board.save()
        serializer = BoardSerializer(data=board)
        return JsonResponse(serializer.data, status=201)
    else:
        return HttpResponse(status=400)

@api_view(['GET'])
@permission_classes(permissions.AllowAny)
def board_detail(request, board_id):
    if request.method == 'GET':
        board = Board.objects.filter(board_id=board_id)
        serializer = BoardSerializer(board)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)