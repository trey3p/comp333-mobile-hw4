from django.contrib import admin

# Register your models here.
from .models import User, Artist, Rating, Album

admin.site.register(User)
admin.site.register(Artist)
admin.site.register(Rating)
admin.site.register(Album)