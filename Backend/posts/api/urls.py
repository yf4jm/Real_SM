from django.urls import path
from .views import (
    NovelListCreateView, NovelDetailView,
    NovelChapterListCreateView, NovelChapterDetailView,
    ComicListCreateView, ComicDetailView,
    ComicChapterListCreateView, ComicChapterDetailView,
    ComicImageListCreateView, ComicImageDetailView,
    PollListCreateView, PollDetailView,
    PollChoiceListCreateView, PollChoiceDetailView,
    QuizListCreateView, QuizDetailView,
    QuizChoiceListCreateView, QuizChoiceDetailView,
    BlogListCreateView, BlogDetailView,LikeToggleView,UserPostsView
)
from django.views.decorators.cache import cache_page

urlpatterns = [
    path('user/<uuid:profile_id>/posts/', UserPostsView.as_view(), name='user-posts'),


    path('<str:post_type>/<uuid:post_id>/like/', LikeToggleView.as_view(), name='like-toggle'),
    
    path('novels/', NovelListCreateView.as_view(), name='novel-list-create'),
    path('novels/<uuid:pk>/', NovelDetailView.as_view(), name='novel-detail'),
    
    path('novel-chapters/', NovelChapterListCreateView.as_view(), name='novel-chapter-list-create'),
    path('novel-chapters/<int:pk>/', NovelChapterDetailView.as_view(), name='novel-chapter-detail'),
    
    path('comics/', ComicListCreateView.as_view(), name='comic-list-create'),
    path('comics/<uuid:pk>/', ComicDetailView.as_view(), name='comic-detail'),
    
    path('comic-chapters/', ComicChapterListCreateView.as_view(), name='comic-chapter-list-create'),
    path('comic-chapters/<int:pk>/', ComicChapterDetailView.as_view(), name='comic-chapter-detail'),
    
    path('comic-images/', ComicImageListCreateView.as_view(), name='comic-image-list-create'),
    path('comic-images/<int:pk>/', ComicImageDetailView.as_view(), name='comic-image-detail'),
    
    path('polls/', PollListCreateView.as_view(), name='poll-list-create'),
    path('polls/<uuid:pk>/', PollDetailView.as_view(), name='poll-detail'),
    
    path('poll-choices/', PollChoiceListCreateView.as_view(), name='poll-choice-list-create'),
    path('poll-choices/<int:pk>/', PollChoiceDetailView.as_view(), name='poll-choice-detail'),
    
    path('quizzes/', QuizListCreateView.as_view(), name='quiz-list-create'),
    path('quizzes/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),
    
    path('quiz-choices/', QuizChoiceListCreateView.as_view(), name='quiz-choice-list-create'),
    path('quiz-choices/<int:pk>/', QuizChoiceDetailView.as_view(), name='quiz-choice-detail'),
    
    path('blogs/', cache_page(60*15)(BlogListCreateView.as_view()), name='blog-list-create'),
    path('blogs/<uuid:pk>/', BlogDetailView.as_view(), name='blog-detail'),
]
