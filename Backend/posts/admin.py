# admin.py
from django.contrib import admin
from .models import (
    Novel, NovelChapter,
    Comic, ComicChapter, ComicImage,
    Poll, PollChoice,
    Quiz, QuizChoice,
    Hashtag,
    Blog
)

#////////////////////Novel////////////////////////
class NovelChapterInline(admin.TabularInline):
    model = NovelChapter
    extra = 1

@admin.register(Novel)
class NovelAdmin(admin.ModelAdmin):
    inlines = [NovelChapterInline]
    list_display = ['title', 'author', 'created_at', 'status']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'author__user__username']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

@admin.register(NovelChapter)
class NovelChapterAdmin(admin.ModelAdmin):
    list_display = ['name', 'novel', 'created_at']
    list_filter = ['novel', 'created_at']
    search_fields = ['name', 'novel__title', 'novel__author__user__username']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

#////////////////////Comic////////////////////////
class ComicChapterInline(admin.TabularInline):
    model = ComicChapter
    extra = 1

class ComicImageInline(admin.TabularInline):
    model = ComicImage
    extra = 1

@admin.register(Comic)
class ComicAdmin(admin.ModelAdmin):
    inlines = [ComicChapterInline]
    list_display = ['title', 'author', 'created_at', 'status']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'author__user__username']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

@admin.register(ComicChapter)
class ComicChapterAdmin(admin.ModelAdmin):
    inlines = [ComicImageInline]
    list_display = ['name', 'comic', 'created_at']
    list_filter = ['comic', 'created_at']
    search_fields = ['name', 'comic__title', 'comic__author__user__username']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

#////////////////////Poll////////////////////////
class PollChoiceInline(admin.TabularInline):
    model = PollChoice
    extra = 1

@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    inlines = [PollChoiceInline]
    list_display = ['title', 'author', 'created_at', 'status']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'author__user__username']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

#////////////////////Quiz////////////////////////
class QuizChoiceInline(admin.TabularInline):
    model = QuizChoice
    extra = 1

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    inlines = [QuizChoiceInline]
    list_display = ['title', 'author', 'created_at', 'status']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'author__user__username']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

#////////////////////Hashtag//////////////////////
@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    ordering = ['name']

#////////////////////Blog/////////////////////////

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'created_at', 'status']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'author__user__username']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']



