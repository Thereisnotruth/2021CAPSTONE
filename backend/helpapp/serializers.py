from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = __all__
        fields = (
            'user_number',
            'user_id',
            'user_pw',
            'user_name',
            'gender',
            'character_type',
            'level',
            'back_exp',
            'chest_exp',
            'shoulder_exp',
            'belly_exp',
            'arm_exp',
            'leg_exp',
            'point',
        )

class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = (
            'study_id',
            'user_id',
            'study_name',
            'study_exp',
            'capacity',
        )

class UserStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Study
        fields = '__all__'