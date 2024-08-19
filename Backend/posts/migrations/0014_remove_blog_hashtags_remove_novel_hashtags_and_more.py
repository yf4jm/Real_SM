# Generated by Django 4.0.2 on 2024-08-17 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0002_searchkeyword_alter_keyword_name_and_more'),
        ('posts', '0013_quizchoice_votes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='hashtags',
        ),
        migrations.RemoveField(
            model_name='novel',
            name='hashtags',
        ),
        migrations.AddField(
            model_name='blog',
            name='keywords',
            field=models.ManyToManyField(blank=True, related_name='keywords_blogs', to='search.Keyword'),
        ),
        migrations.AddField(
            model_name='novel',
            name='keywords',
            field=models.ManyToManyField(blank=True, related_name='novel_keywords', to='search.Keyword'),
        ),
        migrations.DeleteModel(
            name='Hashtag',
        ),
    ]
