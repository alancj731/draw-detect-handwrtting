from django.shortcuts import render
from django.http import HttpResponse
import tensorflow as tf
from django.conf import settings
from .utils import predict, get_image_data


# Create your views here.

def index(request):
    image_data = get_image_data("1.png")
    prediction = predict(image_data)
    return HttpResponse(f'<h1>{prediction}</h1>')
