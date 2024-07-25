# chat/views.py
from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.decorators import api_view
from chat.models import ChatRoom, ChatMessage
from chat.api.serializers import ChatRoomSerializer, ChatMessageSerializer
from users.models import Profile

class ChatRoomListView(generics.ListCreateAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

class ChatRoomDetailView(generics.RetrieveAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def get_object(self):
        try:
            return ChatRoom.objects.get(id=self.kwargs['pk'])
        except ChatRoom.DoesNotExist:
            raise NotFound(detail="Chat room not found.")

class ChatMessageListView(generics.ListCreateAPIView):
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        room_id = self.kwargs['room_id']
        return ChatMessage.objects.filter(room_id=room_id).order_by('timestamp')
    
    def perform_create(self, serializer):
        room_id = self.kwargs['room_id']
        room = ChatRoom.objects.get(id=room_id)

        # Get the profile associated with the request user
        profile = Profile.objects.get(user=self.request.user)
        
        # Save the message with the correct profile field
        serializer.save(room=room, profile=profile)

# @api_view(['GET'])
# def room_exists(request, pk):
#     exists = ChatRoom.objects.filter(id=pk).exists()
#     return Response({'exists': exists})
