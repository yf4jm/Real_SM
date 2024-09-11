from posts.models import (
    Keyword,Novel,NovelChapter,
    Comic,ComicChapter,ComicImage,
    Poll,PollChoice,Quiz,QuizChoice,Blog
)
from rest_framework.response import Response
from django.db.models import Q
from itertools import chain
from operator import attrgetter
from rest_framework.views import APIView
from users.models import Profile
from rest_framework import generics
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .serializers import NovelSerializer, NovelChapterSerializer, ComicSerializer, ComicChapterSerializer, ComicImageSerializer, PollSerializer, PollChoiceSerializer, QuizSerializer, QuizChoiceSerializer, BlogSerializer
from django.contrib.contenttypes.models import ContentType
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.db.models import Prefetch
from real.metadata import CustomMetadata
class LikeToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, post_type):
        user_profile = get_object_or_404(Profile, user=request.user)
        content_type = get_object_or_404(ContentType, model=post_type)
        post_model = content_type.model_class()
        post = get_object_or_404(post_model, id=post_id)
        
        if post.likes.filter(id=user_profile.id).exists():
            # User has already liked this post, so we remove the like
            post.likes.remove(user_profile)
            post.likes_count -=1
            liked = False
        else:
            # User has not liked this post, so we add the like
            post.likes.add(user_profile)
            post.likes_count +=1
            liked = True
        
        post.save()
        return Response({'liked': liked, 'likes_count': post.likes.count()}, status=status.HTTP_200_OK)
# @method_decorator(cache_page(60 * 15), name='dispatch')
class UserPostsView(APIView):
    metadata_class = CustomMetadata
    
    def get(self, request, profile_id):
        # Pass profile_id to metadata class
        meta = self.metadata_class(profile_id=profile_id)
        data = meta.determine_metadata(request, self)

        data['description'] = 'Custom Header Value'
        
        # Fetch all posts created by the user
        polls = Poll.objects.filter(author_id=profile_id)
        quizzes = Quiz.objects.filter(author_id=profile_id)
        blogs = Blog.objects.filter(author_id=profile_id)
        novels = Novel.objects.filter(author_id=profile_id)
        comics = Comic.objects.filter(author_id=profile_id)

        # Serialize the data with request context
        poll_serializer = PollSerializer(polls, many=True, context={'request': request})
        quiz_serializer = QuizSerializer(quizzes, many=True, context={'request': request})
        blog_serializer = BlogSerializer(blogs, many=True, context={'request': request})
        novel_serializer = NovelSerializer(novels, many=True, context={'request': request})
        comic_serializer = ComicSerializer(comics, many=True, context={'request': request})

        # Combine and sort by created_on field
        all_posts = list(chain(
            poll_serializer.data,
            quiz_serializer.data,
            blog_serializer.data,
            novel_serializer.data,
            comic_serializer.data,
        ))
        all_posts_sorted = sorted(all_posts, key=lambda x: x['created_on'], reverse=True)

        return Response(all_posts_sorted, status=status.HTTP_200_OK)




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

# @method_decorator(cache_page(60 * 15), name='dispatch')
class BlogListCreateView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer



class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
