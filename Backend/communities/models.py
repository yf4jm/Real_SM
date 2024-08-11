from django.db import models
import uuid
# Create your models here.
class Community(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.CharField(max_length=1024)
    image = models.ImageField(upload_to='community_images/')
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CommunityStats(models.Model):
    community = models.OneToOneField(Community, on_delete=models.CASCADE)
    popularity_points = models.FloatField(default=0)

    def __str__(self):
        return f"{self.community.name} Stats"