from django.db import models

class PollManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().prefetch_related("choices").select_related("author")

class QuizManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().prefetch_related("choices").select_related("author")