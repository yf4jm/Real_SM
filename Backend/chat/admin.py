from django.contrib import admin
from .models import Message,ChatRoom
# Register your models here.

admin.site.register(ChatRoom)
admin.site.register(Message)