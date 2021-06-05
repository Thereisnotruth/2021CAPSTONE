"""
update contents:
    1. study_disjoin() 수정: 스터디인원이 0명이 될 시 스터디 삭제
"""


from django.shortcuts import get_object_or_404
from django.http import HttpResponse, JsonResponse
from .serializers import *
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from apscheduler.schedulers.background import BackgroundScheduler

def reset_exercise_time():
    userlist = User.objects.all()
    for user in userlist:
        user.today_exercise_time = 0
        user.save()

sched = BackgroundScheduler()
sched.add_job(reset_exercise_time, 'cron', year='*', month='*', day='*', hour='0')
sched.start()

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login(request):
    if request.method == 'POST':
        id = request.data['user_id']
        pw = request.data['user_pw']
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


class DiffPw(Exception):    # Exception을 상속받아서 새로운 예외를 만듦
    def __init__(self):
        super()

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def user_list(request):
    user_list = User.objects.all()
    serializer = UserSerializer(user_list, many=True)
    return JsonResponse(serializer.data, status=200)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def user_detail(request, user_id):
    user = get_object_or_404(User, user_id=user_id)
    serializer = UserSerializer(user)
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
@permission_classes((permissions.AllowAny,))
def save_time(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user_id = serializer.data['user_id']
        user = get_object_or_404(User, user_id=user_id)

        user.back_exp = serializer.data['back_exp']
        user.chest_exp = serializer.data['chest_exp']
        user.shoulder_exp = serializer.data['shoulder_exp']
        user.belly_exp = serializer.data['belly_exp']
        user.arm_exp = serializer.data['arm_exp']
        user.leg_exp = serializer.data['leg_exp']
        user.exercise_state = False
        user.total_exercise_time = serializer.data['total_exercise_time']
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

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def study_detail(request, study_id):
    study = get_object_or_404(Study, study_id=study_id)
    serializer = StudySerializer(study)
    return JsonResponse(serializer.data, status=200)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def create_study(request):
    if request.method == 'POST':
        user_id = request.data['user_id']
        study_name = request.data['study_name']
        capacity = request.data['capacity']
        user = get_object_or_404(User, user_id=user_id)
        study = Study(study_name=study_name, user_id=user, capacity=capacity)
        study.save()
        user_study = User_Study(user_id=user, study_id=study)
        user_study.save()
        serializer = UserStudySerializer(study)
        return JsonResponse(serializer.data, status=201)

    return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def study_userlist(request, study_id):
    user_set = User_Study.objects.filter(study_id=study_id)
    user_list = []
    for user in user_set:
        user_list.append(user.user_id)
    serializer = UserSerializer(user_list, many=True)
    return JsonResponse(serializer.data, status=200, safe=False)

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
        if study.current_user_count == 0:
            study.delete()
        else:
            study.save()

        return HttpResponse(status=201)
    return HttpResponse(status=200)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def silent_refresh(request):
    if request.method == 'POST':
        res = JsonResponse({ 'Message': '로그인 갱신' }, status=201)
        res.set_cookie('refreshToken', request.data['id'], 600, httponly=True)
        return res


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def study_list(request):
    study_list = Study.objects.all()
    serializer = StudySerializer(study_list, many=True)
    return JsonResponse(serializer.data, status=200, safe=False)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def board_list(request):
    board_list = Board.objects.all()
    serializer = BoardSerializer(board_list, many=True)
    return JsonResponse(serializer.data, status=200, safe=False)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def create_board(request):
    if request.method == 'POST':
        board_name = request.data['board_name']
        user_id = request.data['user_id']
        user = User.objects.get(user_id=user_id)
        board = Board(board_name=board_name, user_id=user)
        board.save()
        serializer = BoardSerializer(board)
        return JsonResponse(serializer.data, status=201)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def board_detail(request, board_id):
    if request.method == 'GET':
        board = Board.objects.get(board_id=board_id)
        serializer = BoardSerializer(board)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def board_update(request, board_id):
    if request.method == 'POST':
        board = Board.objects.get(board_id=board_id)
        board.board_name = request.data['board_name']
        board.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def board_delete(request, board_id):
    if request.method == 'POST':
        board = Board.objects.get(board_id=board_id)
        board.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
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

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def post_detail(request, post_id):
    if request.method == 'GET':
        post = Post.objects.get(post_id=post_id)
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def post_update(request, post_id):
    if request.method == 'POST':
        post = Post.objects.get(post_id=post_id)
        post.post_title = request.data['post_title']
        post.post_content = request.data['post_content']
        post.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def post_delete(request, post_id):
    if request.method == 'POST':
        post = Post.objects.get(post_id=post_id)
        post.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


