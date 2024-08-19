from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.postgres.search import SearchVector
from .models import SearchHistory


@receiver(post_save, sender=SearchHistory)
def update_search_vector(sender, instance, **kwargs):
    # Update the search_vector without triggering another save
    SearchHistory.objects.filter(pk=instance.pk).update(
        search_vector=SearchVector('search_query')
    )