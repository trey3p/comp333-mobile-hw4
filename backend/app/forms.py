from django import forms
from django.forms import ModelForm
from app.models import User, Album



class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']


class RatingForm(forms.Form):
    user = forms.CharField(label = 'User', max_length=255)


class AlbumForm(forms.Form):
    albumName = forms.CharField(label = 'Album Name', max_length = 255)

