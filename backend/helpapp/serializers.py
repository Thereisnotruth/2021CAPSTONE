from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *

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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = (
            'study_id',
            'user_id',
            'study_name',
            'capacity',
        )

class UserStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Study
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'