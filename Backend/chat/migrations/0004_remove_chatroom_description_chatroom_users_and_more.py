# Generated by Django 4.0.2 on 2024-07-25 14:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0003_remove_chatroom_users_remove_message_content_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatroom',
            name='description',
        ),
        migrations.AddField(
            model_name='chatroom',
            name='users',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='chatroom',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
