from django import forms
from multiupload.fields import MultiFileField
from .models import ComicChapter,ComicImage
class ComicImageForm(forms.ModelForm):
    images = MultiFileField(min_num=1, max_num=10, max_file_size=1024*1024*5)  # Adjust max_num and max_file_size as needed

    class Meta:
        model = ComicChapter
        fields = ['name', 'images']

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.save()
            for each in self.cleaned_data['images']:
                ComicImage.objects.create(comic_chapter=instance, image=each)
        return instance
