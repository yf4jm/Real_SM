import json
from rest_framework_simplejwt.tokens import AccessToken
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from chat.models import ChatRoom, ChatMessage
from users.models import Profile

# User Authentication Handling
class UserAuthConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room_group_name = f"chat_{self.room_id}"
        query_string = self.scope['query_string'].decode()
        token = None
        if 'token=' in query_string:
            token = query_string.split('token=')[-1]

        if not token:
            await self.close()
            return

        try:
            # Verify and decode the access token
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            user = await self.get_user(user_id)
            profile = await self.get_profile(user)
            if not profile:
                await self.close()
                return
            
            self.scope['user'] = user
            self.scope['profile'] = profile

            # Add user to the WebSocket group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
        except Exception as e:
            print(f"Token error: {e}")
            await self.close()

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @database_sync_to_async
    def get_profile(self, user):
        try:
            return Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return None

# Message Handling
class MessageHandler(AsyncWebsocketConsumer):

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get("message")
        profile = text_data_json.get("profile")
        room_id = self.scope["url_route"]["kwargs"]["room_id"]
        room, created = await self.get_or_create_chat_room(room_id)
        
        await self.create_chat_message(room, message, profile["id"])

        # Send the message to the group
        await self.channel_layer.group_send(
            self.room_group_name, {
                "type": "chat_message", 
                "message": message,
                "profile": profile, 
            }
        )

    @database_sync_to_async
    def get_or_create_chat_room(self, room_id):
        return ChatRoom.objects.get_or_create(id=room_id)

    @database_sync_to_async
    def create_chat_message(self, room, message, profile_id):
        profile = Profile.objects.get(id=profile_id)
        ChatMessage.objects.create(room=room, message=message, profile=profile)

    async def chat_message(self, event):
        message = event["message"]
        profile = event["profile"]
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "message": message,
            "profile": profile
        }))

# Main Chat Consumer combining all handlers
class ChatConsumer(UserAuthConsumer, MessageHandler):
    
    async def connect(self):
        await UserAuthConsumer.connect(self)

    async def disconnect(self, close_code):
        if self.scope['user'] and self.scope['user'].is_authenticated:
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
