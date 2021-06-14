""" serializers.py
1. Rest API 통신을 위한 Serializer를 정의해 놓은 파일
2. Serializer는 데이터를 Json 형식으로 변환해주는 역할
"""


from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *

# Login Serializer
class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'user_pw')
    def validate(self, data):
        user_id = data.get('user_id', None)
        user_pw = data.get('user_pw', None)
        user = authenticate(user_id=user_id, user_pw=user_pw)
        if user is None:
            raise serializers.ValidationError(
                'A user with this id and pw is not found.'
            )
        return {
            'user_id': user.user_id
        }

# User 정보를 변환하는 Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


# Study 정보를 변환하는 Serializer
class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = '__all__'


# UserStudy 정보를 변환하는 Serializer
class UserStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Study
        fields = '__all__'


# Post 정보를 변환하는 Serializer
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

# Board 정보를 변환하는 Serializer
class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'