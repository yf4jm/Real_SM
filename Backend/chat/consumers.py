# chat/consumers.py
import json
from rest_framework_simplejwt.tokens import AccessToken
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from users.models import Profile
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        query_string = self.scope['query_string'].decode()
        token = None
        if 'token=' in query_string:
            token = query_string.split('token=')[-1]

        if not token:
            await self.close()
            return

        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            user = await self.get_user(user_id)
            if not user:
                await self.close()
                return
            self.scope['user'] = user
        except Exception as e:
            print(f"Token error: {e}")
            await self.close()
            return

        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room_group_name = f"chat_{self.room_id}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            user =User.objects.get(id=user_id)
            return Profile.objects.get(user=user)
        except User.DoesNotExist:
            return None

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        profile = text_data_json["profile"]
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", 
                                   "message": message,
                                   "profile":profile, 
                                   }
        )

    async def chat_message(self, event):
        message = event["message"]
        profile = event["profile"]
        await self.send(text_data=json.dumps({"message": message,
                                              "profile":profile
                                              }))

