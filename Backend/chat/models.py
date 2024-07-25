# chat/models.py
from django.db import models
from django.contrib.auth.models import User
from users.models import Profile
class ChatRoom(models.Model):
    CHAT_ROOM_TYPE_CHOICES = [
        ('1to1', '1-to-1'),
        ('group', 'Group'),
    ]
    name = models.CharField(max_length=100, default="")
    profiles = models.ManyToManyField(Profile,blank=True)
    chat_type = models.CharField(max_length=10, choices=CHAT_ROOM_TYPE_CHOICES, default='group')


class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    profile = models.ForeignKey(Profile, on_delete=models.DO_NOTHING,null=True)
    message = models.TextField(default="")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.profile}: {self.message}"
