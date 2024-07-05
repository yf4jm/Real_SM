from django.db import models
import uuid
from communities.models import Community
from django_quill.fields import QuillField
from users.models import Profile

class Alliance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='alliance_icons/', default='alliance.png')
    communities = models.ManyToManyField(Community, blank=True)
    description = models.TextField(max_length=1024)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class AllianceBadge(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='alliance_badges/')
    description = models.TextField(max_length=1024)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class AllianceStats(models.Model):
    alliance = models.OneToOneField(Alliance, on_delete=models.CASCADE, related_name='stats')
    contribution_power = models.FloatField(default=0)
    popularity_points = models.FloatField(default=0)
    coins = models.IntegerField(default=0)
    comm_count = models.IntegerField(default=1)

class AllianceLevel(models.Model):
    level = models.IntegerField(default=0)
    badge = models.OneToOneField(AllianceBadge, on_delete=models.CASCADE)
    acquired_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Level {self.level} - {self.badge}"

class AllianceMission(models.Model):
    TYPE_CHOICES = (
        ('DAILY', 'daily'),
        ('WEEKLY', 'weekly'),
        ('MONTHLY', 'monthly')
    )
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1024)
    c_reward = models.FloatField(default=0)
    coins = models.IntegerField(default=0)
    type = models.CharField(choices=TYPE_CHOICES, max_length=20, default='DAILY')
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()

    def __str__(self):
        return self.name

class AllianceEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = QuillField()
    media = models.ImageField(upload_to='alliance_event_media/')

    def __str__(self):
        return self.title

class AllianceEventMedia(models.Model):
    event = models.ForeignKey(AllianceEvent, on_delete=models.CASCADE, related_name='media_items')
    image = models.ImageField(upload_to='alliance_event_media/')

    def __str__(self):
        return f"{self.event.title} Media"
    
class AllianceContribution(models.Model):
    contributor = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    alliance = models.ForeignKey(Alliance, on_delete=models.CASCADE, null=True, blank=True)
    power = models.FloatField(default=0.0)
