from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'user_id',
            'user_pw',
            'user_name',
            'gender',
            'character_type',
            'level',
            'exp',
            'point',
        )
        model = User

