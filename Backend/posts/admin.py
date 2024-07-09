from django.contrib import admin
from .models import (Novel, NovelChapter, Comic, ComicChapter, ComicImage,Poll, PollChoice, Quiz, QuizChoice, Blog, Hashtag)

from .forms import ComicImageForm

class NovelChapterInline(admin.TabularInline):
    model = NovelChapter
    extra = 1

class ComicImageInline(admin.TabularInline):
    model = ComicImage
    extra = 1

class ComicChapterInline(admin.StackedInline):
    model = ComicChapter
    extra = 1
    form = ComicImageForm
    inlines = [ComicImageInline]  # Nesting ComicImageInline within ComicChapterInline

class PollChoiceInline(admin.TabularInline):
    model = PollChoice
    extra = 1

class QuizChoiceInline(admin.TabularInline):
    model = QuizChoice
    extra = 1

@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Novel)
class NovelAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at', 'updated_at')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [NovelChapterInline]
    list_filter = ('status', 'created_at', 'updated_at')

@admin.register(Comic)
class ComicAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at', 'updated_at')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ComicChapterInline]  # Including ComicChapterInline in ComicAdmin
    list_filter = ('status', 'created_at', 'updated_at')

@admin.register(ComicChapter)
class ComicChapterAdmin(admin.ModelAdmin):
    list_display = ('name', 'comic', 'created_at', 'updated_at')
    search_fields = ('name', 'comic__title')
    inlines = [ComicImageInline]  # Directly registering ComicImageInline here is optional
    list_filter = ('created_at', 'updated_at')

@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at', 'updated_at')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PollChoiceInline]
    list_filter = ('status', 'created_at', 'updated_at')

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'author__user__username')
    inlines = [QuizChoiceInline]
    list_filter = ('created_at', 'updated_at')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at', 'updated_at')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('status', 'created_at', 'updated_at')

# Registering the models not directly managed by the inline classes
admin.site.register(ComicImage)
