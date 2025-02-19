from rest_framework import serializers
from posts.models import (
    Keyword,Novel,NovelChapter,
    Comic,ComicChapter,ComicImage,
    Poll,PollChoice,Quiz,QuizChoice,Blog
)
from users.api.serializers import UserProfileSerializer
import json
from users.models import Profile
class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'


class NovelSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()
    is_liked = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    class Meta:
        model = Novel
        fields = ['id','author','created_on','updated_on','title','slug','status','likes_count','media','is_liked','type','clicks_count']
    def get_is_liked(self, obj):
        profile_id = self.context.get('request').query_params.get('profile_id')
        if profile_id is not None:
            return obj.likes.filter(id=profile_id).exists()
        return False
    def get_type(self,obj):
        return "novel"
class NovelChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovelChapter
        fields = '__all__'


class ComicSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()
    is_liked = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    class Meta:
        model = Comic
        fields = ['id', 'title', 'slug', 'status', 'author', 'media', 'likes_count','is_liked','type','clicks_count','created_on','updated_on']
    def get_is_liked(self, obj):
        profile_id = self.context.get('request').query_params.get('profile_id')
        if profile_id is not None:
            return obj.likes.filter(id=profile_id).exists()
        return False
    def get_type(self,obj):
        return "comic"

class ComicChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComicChapter
        fields = '__all__'


class ComicImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComicImage
        fields = '__all__'

class PollChoiceSerializer(serializers.ModelSerializer):
    votes = UserProfileSerializer(many=True)
    class Meta:
        model = PollChoice
        fields = ['id','votes','text','image']
class PollSerializer(serializers.ModelSerializer):
    choices = PollChoiceSerializer(many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()
    author = UserProfileSerializer()
    type = serializers.SerializerMethodField()
    
    class Meta:
        model = Poll
        fields = ['id','choices','created_on','updated_on','title','slug','status','likes_count','author','is_liked','type','clicks_count']
    def get_is_liked(self, obj):
        profile_id = self.context.get('request').query_params.get('profile_id')
        if profile_id is not None:
            return obj.likes.filter(id=profile_id).exists()
        return False
    def get_type(self,obj):
        return "poll"



class QuizChoiceSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = QuizChoice
        fields = '__all__'
class QuizSerializer(serializers.ModelSerializer):
    choices = QuizChoiceSerializer(many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()
    author = UserProfileSerializer()
    type = serializers.SerializerMethodField()
    class Meta:
        model = Quiz
        fields = ['id','choices','author','created_on','updated_on','title','slug','status','likes_count','is_liked','type','clicks_count']
    def get_is_liked(self, obj):
        profile_id = self.context.get('request').query_params.get('profile_id')
        if profile_id is not None:
            return obj.likes.filter(id=profile_id).exists()
        return False
    def get_type(self,obj):
        return "quiz"





class QuillFieldDetailsSerializer(serializers.Field):
    def to_representation(self, value):
        return {
            'raw':value.delta,
            'html': value.html,
        }

    def to_internal_value(self, data):
        if not isinstance(data, dict) or 'html' not in data or 'delta' not in data:
            raise serializers.ValidationError('wrong format')
        
        return { 
            'html': data['html'],
            'delta':data['delta'],     # The rich HTML content
        }


# class QuillFieldSerializer(serializers.Field):
#     def to_representation(self, value):
#         return {
#             'plain': value.plain if hasattr(value, 'plain') else '',
#             'html': value.html if hasattr(value, 'html') else '',
#         }

#     def to_internal_value(self, data):
#        pass

class BlogSerializer(serializers.ModelSerializer):
    description = serializers.JSONField()
    is_liked = serializers.SerializerMethodField()
    author = UserProfileSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Profile.objects.all(), write_only=True, source='author'
    )
    type = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'description', 'status', 'author','author_id', 'media','created_on', 'is_liked', 'likes_count','type','clicks_count']

    def get_is_liked(self, obj):
        profile_id = self.context.get('request').query_params.get('profile_id')
        if profile_id is not None:
            return obj.likes.filter(id=profile_id).exists()
        return False
    def get_type(self,obj):
        return "blog"
    