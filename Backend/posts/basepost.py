from django.db import models
import uuid
from django.utils.text import slugify
from .timestamp import TimeStamp
from users.models import Profile
class Status(models.TextChoices):
    DRAFT = 'DRAFT', 'Draft'
    PUBLIC = 'PUBLIC', 'Public'
    PRIVATE = 'PRIVATE', 'Private'

class PostManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().all()

    def create_post(self, title, **kwargs):
        slug = kwargs.get('slug') or slugify(title)
        return self.create(title=title, slug=slug, **kwargs)
class Post(TimeStamp):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(default="", null=True, unique=True, blank=True)
    status = models.CharField(max_length=7, choices=Status.choices, default=Status.PUBLIC)
    likes = models.ManyToManyField(Profile,blank=True)
    objects = PostManager()

    class Meta:
        abstract = True