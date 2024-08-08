from django.db import models
from django.contrib.auth.models import User
from users.models import Profile
from .basepost import Post
from .timestamp import TimeStamp
from django.utils.text import slugify
import uuid
from django_quill.fields import QuillField
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation

class Hashtag(models.Model):
    name = models.SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.name

#///////////////Novel////////////////////////
class Novel(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE,related_name='novels', db_index=True)
    media = models.ImageField(default="no_img.png", upload_to='novel_cover/')   
    description = models.CharField(max_length=750, blank=True, null=True)
    hashtags = models.ManyToManyField(Hashtag, related_name='novels', blank=True)

class NovelChapter(TimeStamp):
    novel = models.ForeignKey(Novel, on_delete=models.CASCADE, related_name='chapters', db_index=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    text = models.TextField(max_length=30000, null=False, blank=False)

#////////////////////////////////////////////

#//////////////Comic///////////////////
class Comic(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE,related_name='comics', db_index=True)
    media = models.ImageField(default="no_img.png", upload_to='comic_cover/')

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
    author = models.ForeignKey(Profile, on_delete=models.CASCADE,related_name='polls', db_index=True)

    def __str__(self):
        return self.title
class PollChoice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='choices', db_index=True)
    votes = models.IntegerField(default=0)
    image = models.ImageField(upload_to='poll_images/', null=True, blank=True)
    text = models.CharField(max_length=100)

#/////////////////////////////////////////////

#//////////////Quiz///////////////////
class Quiz(Post):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE,related_name='quizzes', db_index=True)
    def __str__(self):
        return self.title

class QuizChoice(models.Model):
    media = models.ImageField(upload_to='quiz_icons/',null=True,blank=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='choices', db_index=True)
    image = models.ImageField(upload_to='quiz_images/', null=True, blank=True)
    text = models.CharField(max_length=255)
    answer = models.BooleanField(default=False)

#/////////////////////////////////////////////
#//////////////Blog///////////////////
class Blog(Post):
    media = models.ImageField(upload_to='blog_cover/',null=True,blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE,related_name='blogs', db_index=True)
    description = QuillField()
    hashtags = models.ManyToManyField(Hashtag, related_name='hashtags_blogs', blank=True)
#/////////////////////////////////////////////

