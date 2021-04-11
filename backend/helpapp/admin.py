from django.contrib import admin
from .models import User

class MemberAdmin(admin.ModelAdmin):
    search_fields = ['id']

admin.site.register(User, MemberAdmin)