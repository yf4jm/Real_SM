# Generated by Django 4.0.2 on 2024-08-13 16:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0011_alter_blog_media'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quizchoice',
            name='image',
        ),
    ]
