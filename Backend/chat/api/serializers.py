# chat/api/serializers.py
from rest_framework import serializers
from chat.models import ChatRoom, ChatMessage
from users.api.serializers import UserProfileSerializer
class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'description']

class ChatMessageSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = ChatMessage
        fields = ['profile', 'message', 'timestamp']
