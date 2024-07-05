from django.urls import path
from .views import (
    AllianceListCreateView,AllianceDetailView
)
urlpatterns =[
path('alliances/',AllianceListCreateView.as_view(),name='alliance-list'),
path('alliances/',AllianceDetailView.as_view(),name='alliance-list-create'),


]