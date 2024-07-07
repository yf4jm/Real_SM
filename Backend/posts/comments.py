from django.db import models
from .models import (
    Profile
)
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation

class Comment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    replies = models.ManyToManyField('self', through='Reply', symmetrical=False, related_name='comment_replies')
    def get_post_type(self):
        return self.content_type.model_class().__name__

class Reply(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='replies')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='reply_comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)