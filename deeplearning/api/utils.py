import tensorflow as tf
from django.conf import settings
import os, cv2, numpy as np
import matplotlib.pyplot as plt
import json

def predict(target_image):

    # print("BASE_DIR:", settings.BASE_DIR)
    # print("data directory:", settings.DATA_ROOT)
    # print(modelFile)
    
    # show target_image
    modelFile = os.path.join("C:\\Users\\alanc\\OneDrive\\codes\\Machine Learning\\NN", 'hwmodel')
    model = tf.keras.models.load_model(modelFile)
    #print(f'model is {model}')
    prediction = model.predict(target_image)
    prediction = np.argmax(prediction)
    print(f'prediction is {prediction}')
    return int(prediction) # change numpy.int64 to int

def get_image_data(file_name):
    file_name=os.path.join(settings.DATA_ROOT, 'images', file_name)
    print(f'image file name is: {file_name}')
    raw = cv2.imread(file_name)
    print(f'raw data shape is: {raw.shape}')
    # only get red plane pixels value of the image data
    img = raw[:,:,0]
    img = np.invert([img])
    print(f'img shape is: {img.shape}')
    return img

def get_image_from_request(request):
    body = request.body
    # print('request:', body)
    data = json.loads(body)
    # print("data:", data)
    image = data.get("image")
    print("image:", image)
    return image

def prepare_input(image):
    # plt.imshow(image, cmap='gray')
    # plt.show()
    # inverted_img = np.invert([image])
    # plt.imshow(inverted_img[0,:,:], cmap='gray')
    # plt.show()
    image_in_shape_12828 = np.array([image])
    # image_norm = tf.keras.utils.normalize(image_in_shape_12828, axis = 1)
    return image_in_shape_12828

