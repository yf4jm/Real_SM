from django.db import models
from users.models import (
    Profile
)
from posts.timestamp import TimeStamp
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class Comment(TimeStamp):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    replies = models.ManyToManyField('self', through='Reply', symmetrical=False, related_name='comment_replies')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE,null=True)
    object_id = models.UUIDField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    likes = models.ManyToManyField(Profile,blank=True,related_name='liked_comments')


class Reply(TimeStamp):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='replies')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='reply_comments')
    text = models.TextField()
    likes = models.ManyToManyField(Profile)

