# chat/views.py
from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.decorators import api_view
from chat.models import ChatRoom, Message
from chat.api.serializers import ChatRoomSerializer, MessageSerializer

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

class MessageListView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        room_id = self.kwargs['room_id']
        return Message.objects.filter(room_id=room_id)
    
    def perform_create(self, serializer):
        room_id = self.kwargs['room_id']
        room = ChatRoom.objects.get(id=room_id)
        serializer.save(room=room, user=self.request.user)

@api_view(['GET'])
def room_exists(request, pk):
    exists = ChatRoom.objects.filter(id=pk).exists()
    return Response({'exists': exists})
