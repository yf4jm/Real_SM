from django.db import models
import uuid
from django.utils.text import slugify
from .timestamp import TimeStamp
from users.models import Profile
from django.db.models import Count
from search.models import Keyword

from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
class Status(models.TextChoices):
    DRAFT = 'DRAFT', 'Draft'
    PUBLIC = 'PUBLIC', 'Public'
    PRIVATE = 'PRIVATE', 'Private'

class Click(models.Model):
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    post = GenericForeignKey('content_type', 'object_id')
    clicked_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        indexes = [
            models.Index(fields=['content_type', 'object_id']), 
        ]

class PostManager(models.Manager):
    def get_queryset(self):
        return (super().get_queryset()
                .select_related('author')
                    
                )

    def create_post(self, title, **kwargs):
        slug = kwargs.get('slug') or slugify(title)
        return self.create(title=title, slug=slug, **kwargs)
class Post(TimeStamp):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100,null=False,blank=False)
    slug = models.SlugField(default="", null=True, unique=True, blank=True, db_index=True)
    status = models.CharField(max_length=7, choices=Status.choices, default=Status.PUBLIC, db_index=True)
    likes = models.ManyToManyField(Profile, blank=True,related_name="+")
    likes_count = models.PositiveIntegerField(default=0,blank=True)
    keywords = models.ManyToManyField(Keyword, blank=True)
    keywords_score = models.JSONField(null=True,blank=True)
    clicks_count = models.PositiveIntegerField(default=0,blank=True)
    objects = PostManager()
    
    class Meta:
        abstract = True
    