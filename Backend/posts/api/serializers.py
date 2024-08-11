from rest_framework import serializers
from posts.models import (
    Hashtag,Novel,NovelChapter,
    Comic,ComicChapter,ComicImage,
    Poll,PollChoice,Quiz,QuizChoice,Blog
)
from users.api.serializers import UserProfileSerializer
from django_quill.fields import FieldQuill
import json
class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = '__all__'


class NovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = '__all__'


class NovelChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovelChapter
        fields = '__all__'


class ComicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comic
        fields = '__all__'


class ComicChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComicChapter
        fields = '__all__'


class ComicImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComicImage
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = '__all__'


class PollChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollChoice
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuizChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizChoice
        fields = '__all__'



class QuillFieldDetailsSerializer(serializers.Field):
    def to_representation(self, value):
        return {
            'html': value.html,
            'plain': value.plain,
        }

    def to_internal_value(self, data):
        pass

from rest_framework import serializers

class QuillFieldSerializer(serializers.Field):
    def to_representation(self, value):
        return {
            'plain': value.plain,
        }

    def to_internal_value(self, data):
        pass

class BlogSerializer(serializers.ModelSerializer):
    description = QuillFieldSerializer()
    is_liked = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    author = UserProfileSerializer()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'description', 'status', 'author', 'media','created_on', 'is_liked', 'likes_count']

    def get_is_liked(self, obj):
        profile_id = self.context.get('profile_id')
        print(profile_id)
        if profile_id is not None:
            return obj.likes.filter(id=profile_id).exists()
        return False

    def get_likes_count(self, obj):
        return obj.likes.count()


