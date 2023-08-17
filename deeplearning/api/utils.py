import tensorflow as tf
from django.conf import settings
import os, cv2, numpy as np

def predict(target_image):

    # print("BASE_DIR:", settings.BASE_DIR)
    # print("data directory:", settings.DATA_ROOT)
    # print(modelFile)

    modelFile = os.path.join(settings.DATA_ROOT, 'handwritting.model')
    model = tf.keras.models.load_model(modelFile)
    #print(f'model is {model}')
    prediction = model.predict(target_image)
    #prediction = np.argmax(prediction)
    print(f'prediction is {prediction}')
    return prediction

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

