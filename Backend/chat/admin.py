from django.contrib import admin
from .models import ChatMessage,ChatRoom
# Register your models here.

admin.site.register(ChatRoom)
admin.site.register(ChatMessage)