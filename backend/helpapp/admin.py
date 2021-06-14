""" admin.py
1. admin 계정으로 관리할 데이터베이스 엔티티를 정의하는 파일
"""

from django.contrib import admin
from .models import *

class MemberAdmin(admin.ModelAdmin):
    search_fields = ['id']

# admin 계정에서 관리할 Model 추가
admin.site.register(User, MemberAdmin)
admin.site.register(Study, MemberAdmin)
admin.site.register(User_Study, MemberAdmin)
admin.site.register(Board, MemberAdmin)
admin.site.register(Post, MemberAdmin)
admin.site.register(Comment, MemberAdmin)