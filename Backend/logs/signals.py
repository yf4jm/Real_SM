from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from logs.models import Log
from posts.models import Blog,Novel,Comic,Poll,Quiz

@receiver(post_save, sender=Blog)
def log_blog_changes(sender, instance, created, **kwargs):
    """Log blog creation and updates."""
    action = "created" if created else "updated"
    Log.objects.create(user=instance.author, data={"id": str(instance.id),"action":action,"model":"blog"})

@receiver(post_delete, sender=Blog)
def log_blog_deletion(sender, instance, **kwargs):
    """Log blog deletions."""
    Log.objects.create(user=instance.author, data={"id": str(instance.id),"action":"delete"})

#Novel,Comic,Poll,Quiz
#Like call in the views
#Comment call in the views


