from django.urls import path
from .views import CommentListCreateView,CommentDetailView

urlpatterns =[
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<uuid:pk>', CommentDetailView.as_view(), name='comment-detail'),
]