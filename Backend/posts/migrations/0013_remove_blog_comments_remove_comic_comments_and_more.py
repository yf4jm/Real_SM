# Generated by Django 4.0.2 on 2024-07-09 20:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0012_remove_reply_comment_remove_reply_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='comic',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='novel',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='poll',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='comments',
        ),
    ]
