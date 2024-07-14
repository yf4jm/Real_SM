from django.contrib import admin
from .models import(
    Comment,Reply
)
# Register your models here.
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('text','object_id')
    search_fields = ('text','object_id')
    list_filter = ('created_on','content_type')
@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ('text','comment')
    list_filter = ('created_on',)