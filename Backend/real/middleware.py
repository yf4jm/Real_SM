from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
import jwt
from django.conf import settings

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Look up the 'Authorization' header
        headers = dict(scope["headers"])
        if b'authorization' in headers:
            token_name, token_key = headers[b'authorization'].decode().split()
            if token_name == 'Bearer':
                try:
                    payload = jwt.decode(token_key, settings.SECRET_KEY, algorithms=['HS256'])
                    user = JWTAuthentication().get_user(payload)
                except jwt.ExpiredSignatureError:
                    user = AnonymousUser()
                except jwt.InvalidTokenError:
                    user = AnonymousUser()
                scope['user'] = user
        return await super().__call__(scope, receive, send)
