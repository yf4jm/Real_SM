from django.db import models
from django.contrib.auth.models import User
from users.models import Profile
from django.utils.text import slugify
import uuid
from django_quill.fields import QuillField
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation

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

class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Post(TimeStamp):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(default="", null=True, unique=True, blank=True)
    status = models.CharField(max_length=7, choices=Status.choices, default=Status.PUBLIC)
    # comments = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True)
    
    objects = PostManager()

    class Meta:
        abstract = True

class Hashtag(models.Model):
    name = models.SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.name

#///////////////Novel////////////////////////
class Novel(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='novels', db_index=True)
    media = models.ImageField(default="no_img.png", upload_to='novel_icons/')
    description = models.CharField(max_length=750, blank=True, null=True)
    hashtags = models.ManyToManyField(Hashtag, related_name='novels', blank=True)

class NovelChapter(TimeStamp):
    novel = models.ForeignKey(Novel, on_delete=models.CASCADE, related_name='chapters', db_index=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    text = models.TextField(max_length=30000, null=False, blank=False)

#////////////////////////////////////////////

#//////////////Comic///////////////////
class Comic(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comics', db_index=True)
    media = models.ImageField(default="no_img.png", upload_to='comic_icons/')

    def __str__(self):
        return self.title

class ComicChapter(TimeStamp):
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE, related_name='chapters', db_index=True)
    name = models.CharField(max_length=50, null=True, blank=False)

    def __str__(self):
        return self.name

class ComicImage(models.Model):
    comic_chapter = models.ForeignKey(ComicChapter, on_delete=models.CASCADE, related_name='images', db_index=True, null=True, blank=True)
    image = models.ImageField(upload_to='comic_images/')

#/////////////////////////////////////////////

#//////////////Poll///////////////////
class Poll(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='polls', db_index=True)

class PollChoice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='choices', db_index=True)
    votes = models.IntegerField(default=0)
    image = models.ImageField(upload_to='poll_images/', null=True, blank=True)
    text = models.CharField(max_length=100)

#/////////////////////////////////////////////

#//////////////Quiz///////////////////
class Quiz(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='quizzes', db_index=True)

class QuizChoice(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='choices', db_index=True)
    image = models.ImageField(upload_to='quiz_images/', null=True, blank=True)
    text = models.CharField(max_length=255)
    answer = models.BooleanField(default=False)

#/////////////////////////////////////////////
#//////////////Blog///////////////////
class Blog(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='blogs', db_index=True)
    description = QuillField()
    hashtags = models.ManyToManyField(Hashtag, related_name='blogs', blank=True)
#/////////////////////////////////////////////

