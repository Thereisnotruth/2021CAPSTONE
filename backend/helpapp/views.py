"""
update contents:
    1. board_postlist() 추가: Board에 속한 post 리스트를 반환하는 view
"""

from django.shortcuts import get_object_or_404, render
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

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def index(request):
    return render(request, 'index.html')

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

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def find_id(request):
    email = request.data['email']
    user = get_object_or_404(User, email=email)
    user_id = str(user.user_id)
    return JsonResponse({'user_id':user_id}, status=200)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def find_pw(request):
    user_id = request.data['user_id']
    user_name = request.data['user_name']
    question_number = request.data['question_number']
    hint = request.data['hint']
    user = get_object_or_404(User, user_id=user_id)
    if (str(user.user_name) == user_name) & \
        (int(user.question_number) == int(question_number)) & \
        (str(user.hint) == hint):
        return JsonResponse({'user_pw':str(user.user_pw)}, status=200)
    else:
        return JsonResponse({'message':'이름과 힌트를 다시 확인해 주세요.'}, status=403)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def change_pw(request):
    user_id = request.data['user_id']
    user_pw = request.data['user_pw']
    user = get_object_or_404(User, user_id=user_id)
    user.user_pw = user_pw
    user.save()
    return HttpResponse(status=200)

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
        user_id = user_id
        user = get_object_or_404(User, user_id=user_id)
        study_set = Study.objects.filter(user_id=user)
        study_list = []
        for study in study_set:
            study_list.append(study.study_id)
        serializer = StudySerializer(data=study_list, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)
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
    if request.method == 'POST':
        board = Board.objects.get(board_id=board_id)
        serializer = BoardSerializer(board)
        return JsonResponse(serializer.data, status=200)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def board_postlist(request, board_id):
    if request.method == 'POST':
        post_set = Post.objects.filter(board_id=board_id)
        post_list = []
        for post in post_set:
            post_list.append(post)
        serializer = PostSerializer(post_list, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def board_update(request, board_id):
    if request.method == 'POST':
        board = get_object_or_404(Board, board_id=board_id)
        user_id = request.data['user_id']
        if str(board.user_id) == request.data['user_id']:
            board = Board.objects.get(board_id=board_id)
            board.board_name = request.data['board_name']
            board.save()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=403)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def board_delete(request, board_id):
    if request.method == 'POST':
        board = Board.objects.get(board_id=board_id)
        if str(board.user_id) == request.data['user_id']:
            board.delete()
        else:
            return HttpResponse(status=403)
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
        user = User.objects.get(user_id=user_id)
        board_id = request.data['board_id']
        board = Board.objects.get(board_id=board_id)
        post_title = request.data['post_title']
        post_content = request.data['post_content']
        post = Post(user_id=user, board_id=board, post_title=post_title, post_content=post_content)
        post.save()
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data, status=201)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def post_detail(request, post_id):
    if request.method == 'POST':
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
        if str(post.user_id) == request.data['user_id']:
            post.post_title = request.data['post_title']
            post.post_content = request.data['post_content']
            post.save()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=403)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def post_delete(request, post_id):
    if request.method == 'POST':
        post = Post.objects.get(post_id=post_id)
        if str(post.user_id) == request.data['user_id']:
            post.delete()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=403)
    else:
        return HttpResponse(status=400)


