# Generated by Django 4.0.2 on 2024-07-14 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_bookmark'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blog',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='blog',
            old_name='updated_at',
            new_name='updated_on',
        ),
        migrations.RenameField(
            model_name='comic',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='comic',
            old_name='updated_at',
            new_name='updated_on',
        ),
        migrations.RenameField(
            model_name='comicchapter',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='comicchapter',
            old_name='updated_at',
            new_name='updated_on',
        ),
        migrations.RenameField(
            model_name='novel',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='novel',
            old_name='updated_at',
            new_name='updated_on',
        ),
        migrations.RenameField(
            model_name='novelchapter',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='novelchapter',
            old_name='updated_at',
            new_name='updated_on',
        ),
        migrations.RenameField(
            model_name='poll',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='poll',
            old_name='updated_at',
            new_name='updated_on',
        ),
        migrations.RenameField(
            model_name='quiz',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='quiz',
            old_name='updated_at',
            new_name='updated_on',
        ),
    ]
