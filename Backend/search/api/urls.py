from django.contrib import admin
from django.urls import path,include
from .views import (
                    SearchSuggestionView,SearchKeywordView
)
urlpatterns =[
path("search-keywords/",SearchKeywordView.as_view(),name="search-keywords-list-create"),

# path("searchs/",SearchListCreateView.as_view(),name="searchs-list-create"),
# path("searchs/<int:pk>",SearchDetailView.as_view(),name="searchs-list-detail"),

path("s-search/",SearchSuggestionView.as_view(),name="searchs-list-create"),
]