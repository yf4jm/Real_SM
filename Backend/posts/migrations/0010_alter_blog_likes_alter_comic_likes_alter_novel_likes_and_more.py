# Generated by Django 4.0.2 on 2024-07-20 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_follow_followed_alter_follow_follower'),
        ('posts', '0009_blog_media_quizchoice_media_alter_comic_media_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='likes',
            field=models.ManyToManyField(blank=True, to='users.Profile'),
        ),
        migrations.AlterField(
            model_name='comic',
            name='likes',
            field=models.ManyToManyField(blank=True, to='users.Profile'),
        ),
        migrations.AlterField(
            model_name='novel',
            name='likes',
            field=models.ManyToManyField(blank=True, to='users.Profile'),
        ),
        migrations.AlterField(
            model_name='poll',
            name='likes',
            field=models.ManyToManyField(blank=True, to='users.Profile'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='likes',
            field=models.ManyToManyField(blank=True, to='users.Profile'),
        ),
    ]
