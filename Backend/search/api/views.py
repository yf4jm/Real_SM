from rest_framework import generics
from search.models import Keyword,SearchHistory
from .serializers import KeywordSerializer,SearchHistorySerializer
from autocorrect import Speller
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Subquery, OuterRef
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.db.models import Q
from django.contrib.postgres.search import TrigramSimilarity

spell = Speller(lang='en', fast=True)


# class SearchSuggestionView(generics.ListAPIView):
#     serializer_class = SearchHistorySerializer

#     def get_queryset(self):
#         query = self.request.query_params.get('q', None)
#         if query:
#             keywords = word_tokenize(query)
#             stemmed_words =[stem(w) for w in keywords]
#             corrected_word =[spell(w) for w in keywords]
#             query_filter = Q()
#             for keyword in corrected_word:
#                 query_filter &= Q(search_query__icontains=keyword)
#             results = SearchHistory.objects.filter(query_filter).order_by('-search_query_count')[:5]
#             return results

#         return SearchHistory.objects.none()
    
class SearchSuggestionView(generics.ListAPIView):
    serializer_class = SearchHistorySerializer

    def get_queryset(self):
        
        query = self.request.query_params.get('q', None)
        if query:
            results = SearchHistory.objects.annotate(
                similarity=TrigramSimilarity('search_query', spell(query))
            ).filter(similarity__gt=0.1).order_by('-similarity', '-search_query_count')[:5]
            return results
        return SearchHistory.objects.none()

class KeywordListCreateView(generics.ListCreateAPIView):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

class KeywordDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

