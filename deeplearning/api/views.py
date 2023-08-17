from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# import tensorflow as tf
# from django.conf import settings
from .utils import predict, get_image_data, prepare_input, get_image_from_request
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

def index(request):
    # image_data = get_image_data("1.png")
    # prediction = predict(image_data)
    return HttpResponse(f'<h1>Welcome</h1>')

@csrf_exempt
def HandelDataPost(request):
    print('visited here')
    if request.method == 'POST':
        image = get_image_from_request(request)
        input_image = prepare_input(image)
        prediction = predict(input_image)
        print("to return:", prediction, type(prediction))
        return JsonResponse({'result': prediction})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})

