from django.db import models
import uuid
from communities.models import Community
from django_quill.fields import QuillField
from users.models import Profile

from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save

from .managers import AllianceManager,AllianceStatsManager,AllianceMemberManager,AllianceLevelManager

class Alliance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True,null=True)
    icon = models.ImageField(upload_to='alliance_icons/', default='alliance.png')
    communities = models.ManyToManyField(Community)
    description = models.TextField(max_length=1024)
    created_on = models.DateTimeField(auto_now_add=True)
    objects = AllianceManager()
    def __str__(self):
        return self.name
    

class AllianceBadge(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='alliance_badges/')
    description = models.TextField(max_length=1024)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class AllianceLevel(models.Model):
    level = models.IntegerField(default=0)
    badge = models.OneToOneField(AllianceBadge, on_delete=models.CASCADE)
    c_requirement = models.FloatField(default=0, null=True, blank=True)
    acquired_on = models.DateTimeField(auto_now_add=True)
    objects = AllianceLevelManager()
    def __str__(self):
        return f"Level {self.level} - {self.badge}"


class AllianceStats(models.Model):
    alliance = models.OneToOneField(Alliance, on_delete=models.CASCADE, related_name='stats')
    contribution_power = models.FloatField(default=0)
    popularity_points = models.FloatField(default=0)
    coins = models.IntegerField(default=0)
    level = models.ForeignKey(AllianceLevel,on_delete=models.CASCADE,null=True,blank=True)
    comm_count = models.IntegerField(default=1)
    objects = AllianceStatsManager()



class AllianceMissionRewardItem(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE,null=True)
    object_id = models.UUIDField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')
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
    reward = models.ManyToManyField(AllianceMissionRewardItem,blank=True)

    def __str__(self):
        return self.name

class AllianceEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = QuillField()
    media = models.ImageField(upload_to='alliance_event_media/')

    def __str__(self):
        return self.title


class AllianceMember(models.Model):
    ROLES_CHOICES=(
        ('MEMBER','member'),
        ('OWNER','owner'),
        ('MODERATOR','moderator')
    )
    alliance = models.ForeignKey(Alliance, on_delete=models.CASCADE, null=True, blank=True)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True, blank=True)
    role=models.CharField(max_length=20,default="member",choices=ROLES_CHOICES)
    power = models.FloatField(default=0.0)
    joined_at = models.DateTimeField(auto_now_add=True)
    objects = AllianceMemberManager()
    def clean(self):
        if self.role == 'OWNER':
            existing_owner = AllianceMember.objects.filter(alliance=self.alliance, role='OWNER').exclude(pk=self.pk)
            if existing_owner.exists():
                raise ValidationError("There can't be more than one owner in the alliance.")
        

    def save(self, *args, **kwargs):
        self.full_clean()  # This calls the clean method
        super().save(*args, **kwargs)

