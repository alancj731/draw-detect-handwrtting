from django.urls import path
from .views import index, HandelDataPost

urlpatterns = [
    path('image/', HandelDataPost),
    path('', index),
]