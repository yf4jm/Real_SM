from django.contrib import admin
from .models import (Novel, NovelChapter, Comic, ComicChapter, ComicImage,Poll, PollChoice, Quiz, QuizChoice, Blog, Keyword)
from .bookmark import PostBookmark

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
    inlines = [ComicImageInline] 

class PollChoiceInline(admin.TabularInline):
    model = PollChoice
    extra = 1

class QuizChoiceInline(admin.TabularInline):
    model = QuizChoice
    extra = 1


@admin.register(Novel)
class NovelAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_on', 'updated_on')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [NovelChapterInline]
    list_filter = ('status', 'created_on', 'updated_on')

@admin.register(Comic)
class ComicAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_on', 'updated_on')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ComicChapterInline]
    list_filter = ('status', 'created_on', 'updated_on')

@admin.register(ComicChapter)
class ComicChapterAdmin(admin.ModelAdmin):
    list_display = ('name', 'comic', 'created_on', 'updated_on')
    search_fields = ('name', 'comic__title')
    inlines = [ComicImageInline]
    list_filter = ('created_on', 'updated_on')

@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_on', 'updated_on')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PollChoiceInline]
    list_filter = ('status', 'created_on', 'updated_on')

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_on', 'updated_on')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [QuizChoiceInline]
    list_filter = ('created_on', 'updated_on')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_on', 'updated_on')
    search_fields = ('title', 'author__user__username')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('status', 'created_on', 'updated_on')


admin.site.register(ComicImage)
admin.site.register(PostBookmark)

