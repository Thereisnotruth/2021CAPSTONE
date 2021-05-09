from django.contrib import admin
from .models import *

class MemberAdmin(admin.ModelAdmin):
    search_fields = ['id']

admin.site.register(User, MemberAdmin)
admin.site.register(Study, MemberAdmin)
admin.site.register(User_Study, MemberAdmin)
