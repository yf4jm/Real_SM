# Generated by Django 4.0.2 on 2024-07-10 10:54

from django.db import migrations, models
import django.db.models.deletion
import django_quill.fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0002_alter_follow_followed_alter_follow_follower'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comic',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(blank=True, default='', null=True, unique=True)),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('PUBLIC', 'Public'), ('PRIVATE', 'Private')], default='PUBLIC', max_length=7)),
                ('media', models.ImageField(default='no_img.png', upload_to='comic_icons/')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comics', to='users.profile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ComicChapter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50, null=True)),
                ('comic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='posts.comic')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Hashtag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.SlugField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Novel',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(blank=True, default='', null=True, unique=True)),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('PUBLIC', 'Public'), ('PRIVATE', 'Private')], default='PUBLIC', max_length=7)),
                ('media', models.ImageField(default='no_img.png', upload_to='novel_icons/')),
                ('description', models.CharField(blank=True, max_length=750, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='novels', to='users.profile')),
                ('hashtags', models.ManyToManyField(blank=True, related_name='novels', to='posts.Hashtag')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(blank=True, default='', null=True, unique=True)),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('PUBLIC', 'Public'), ('PRIVATE', 'Private')], default='PUBLIC', max_length=7)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='polls', to='users.profile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(blank=True, default='', null=True, unique=True)),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('PUBLIC', 'Public'), ('PRIVATE', 'Private')], default='PUBLIC', max_length=7)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='users.profile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='QuizChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='quiz_images/')),
                ('text', models.CharField(max_length=255)),
                ('answer', models.BooleanField(default=False)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='posts.quiz')),
            ],
        ),
        migrations.CreateModel(
            name='PollChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('votes', models.IntegerField(default=0)),
                ('image', models.ImageField(blank=True, null=True, upload_to='poll_images/')),
                ('text', models.CharField(max_length=100)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='posts.poll')),
            ],
        ),
        migrations.CreateModel(
            name='NovelChapter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100)),
                ('text', models.TextField(max_length=30000)),
                ('novel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='posts.novel')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ComicImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='comic_images/')),
                ('comic_chapter', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='posts.comicchapter')),
            ],
        ),
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(blank=True, default='', null=True, unique=True)),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('PUBLIC', 'Public'), ('PRIVATE', 'Private')], default='PUBLIC', max_length=7)),
                ('description', django_quill.fields.QuillField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blogs', to='users.profile')),
                ('hashtags', models.ManyToManyField(blank=True, related_name='blogs', to='posts.Hashtag')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]