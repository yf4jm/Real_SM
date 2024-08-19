from django.contrib import admin
from django.urls import path,include
from .views import (KeywordListCreateView,KeywordDetailView,
                    SearchSuggestionView
)
urlpatterns =[
# path("keywords/",KeywordListCreateView.as_view(),name="keyword-list-create"),
# path("keywords/<int:pk>",KeywordDetailView.as_view(),name="keyword-detail"),

# path("search-keywords/",SearchKeywordListCreateView.as_view(),name="search-keywords-list-create"),
# path("search-keywords/<int:pk>",SearchKeywordDetailView.as_view(),name="search-keywords-detail"),

# path("searchs/",SearchListCreateView.as_view(),name="searchs-list-create"),
# path("searchs/<int:pk>",SearchDetailView.as_view(),name="searchs-list-detail"),

path("s-search/",SearchSuggestionView.as_view(),name="searchs-list-create"),
]