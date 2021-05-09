from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
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

