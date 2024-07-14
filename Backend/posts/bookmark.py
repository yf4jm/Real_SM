from django.db import models
from .models import Post
from users.models import Profile
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
class PostBookmark(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE,null=True)
    object_id = models.UUIDField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    created_on = models.DateTimeField(auto_now_add=True,null=True)