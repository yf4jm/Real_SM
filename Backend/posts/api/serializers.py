from rest_framework import serializers
from posts.models import (
    Hashtag,Novel,NovelChapter,
    Comic,ComicChapter,ComicImage,
    Poll,PollChoice,Quiz,QuizChoice,Blog
)
from django_quill.fields import FieldQuill
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



class QuillFieldSerializer(serializers.Field):
    def to_representation(self, value):
        # Use the html attribute to get the HTML content
        return value.html if value else ''
    
    def to_internal_value(self, data):
        return FieldQuill(data)

class BlogSerializer(serializers.ModelSerializer):
    description = QuillFieldSerializer()
    class Meta:
        model = Blog
        fields = '__all__'
    

