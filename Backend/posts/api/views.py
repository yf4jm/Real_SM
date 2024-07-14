from posts.models import (
    Hashtag,Novel,NovelChapter,
    Comic,ComicChapter,ComicImage,
    Poll,PollChoice,Quiz,QuizChoice,Blog
)
from rest_framework import generics
from .serializers import HashtagSerializer, NovelSerializer, NovelChapterSerializer, ComicSerializer, ComicChapterSerializer, ComicImageSerializer, PollSerializer, PollChoiceSerializer, QuizSerializer, QuizChoiceSerializer, BlogSerializer

# Hashtag Views
class HashtagListCreateView(generics.ListCreateAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer

class HashtagDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer

# Novel Views
class NovelListCreateView(generics.ListCreateAPIView):
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer

class NovelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer

# NovelChapter Views
class NovelChapterListCreateView(generics.ListCreateAPIView):
    queryset = NovelChapter.objects.all()
    serializer_class = NovelChapterSerializer

class NovelChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NovelChapter.objects.all()
    serializer_class = NovelChapterSerializer

# Comic Views
class ComicListCreateView(generics.ListCreateAPIView):
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer

class ComicDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer

# ComicChapter Views
class ComicChapterListCreateView(generics.ListCreateAPIView):
    queryset = ComicChapter.objects.all()
    serializer_class = ComicChapterSerializer

class ComicChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ComicChapter.objects.all()
    serializer_class = ComicChapterSerializer

# ComicImage Views
class ComicImageListCreateView(generics.ListCreateAPIView):
    queryset = ComicImage.objects.all()
    serializer_class = ComicImageSerializer

class ComicImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ComicImage.objects.all()
    serializer_class = ComicImageSerializer

# Poll Views
class PollListCreateView(generics.ListCreateAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

class PollDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

# PollChoice Views
class PollChoiceListCreateView(generics.ListCreateAPIView):
    queryset = PollChoice.objects.all()
    serializer_class = PollChoiceSerializer

class PollChoiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PollChoice.objects.all()
    serializer_class = PollChoiceSerializer

# Quiz Views
class QuizListCreateView(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

# QuizChoice Views
class QuizChoiceListCreateView(generics.ListCreateAPIView):
    queryset = QuizChoice.objects.all()
    serializer_class = QuizChoiceSerializer

class QuizChoiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = QuizChoice.objects.all()
    serializer_class = QuizChoiceSerializer

# Blog Views
class BlogListCreateView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer