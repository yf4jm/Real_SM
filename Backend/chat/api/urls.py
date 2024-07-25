# chat/urls.py
from django.urls import path
from chat.api.views import ChatRoomListView, ChatMessageListView, ChatRoomDetailView

urlpatterns = [
    path('rooms/', ChatRoomListView.as_view(), name='chatroom-list'),
    path('rooms/<int:pk>/', ChatRoomDetailView.as_view(), name='chatroom-detail'),
    path('rooms/<int:room_id>/messages/', ChatMessageListView.as_view(), name='message-list'),
    # path('rooms/<int:pk>/exists/', room_exists, name='room-exists'),
]
