# chat/urls.py
from django.urls import path
from chat.api.views import ChatRoomListView, MessageListView, room_exists, ChatRoomDetailView

urlpatterns = [
    path('rooms/', ChatRoomListView.as_view(), name='chatroom-list'),
    path('rooms/<int:pk>/', ChatRoomDetailView.as_view(), name='chatroom-detail'),
    path('rooms/<int:room_id>/messages/', MessageListView.as_view(), name='message-list'),
    path('rooms/<int:pk>/exists/', room_exists, name='room-exists'),
]
