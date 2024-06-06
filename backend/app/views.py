from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from . serializer import *
import qrcode
import base64
from io import BytesIO
from PIL import Image,ImageDraw
from rest_framework.response import Response
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from  qrcode.image.styles.colormasks import SolidFillColorMask
from qrcode.image.styledpil import *
from qrcode.image.styles.moduledrawers import *
from qrcode.image.styles.colormasks import  *

def style_inner_eyes(img):
        img_size = img.size[0]
        eye_size = 70 #default
        quiet_zone = 40 #default
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.rectangle((60, 60, 90, 90), fill=255) #top left eye
        draw.rectangle((img_size-90, 60, img_size-60, 90), fill=255) #top right eye
        draw.rectangle((60, img_size-90, 90, img_size-60), fill=255) #bottom left eye
        return mask

def style_outer_eyes(img):
        img_size = img.size[0]
        eye_size = 70 #default
        quiet_zone = 40 #default
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.rectangle((40, 40, 110, 110), fill=255) #top left eye
        draw.rectangle((img_size-110, 40, img_size-40, 110), fill=255) #top right eye
        draw.rectangle((40, img_size-110, 110, img_size-40), fill=255) #bottom left eye
        draw.rectangle((60, 60, 90, 90), fill=0) #top left eye
        draw.rectangle((img_size-90, 60, img_size-60, 90), fill=0) #top right eye
        draw.rectangle((60, img_size-90, 90, img_size-60), fill=0) #bottom left eye  
        return mask


# Create your views here.
class QRView(APIView) :
    def get(self, request):
        shelters = QRcode.objects.all()
        return Response({"count": shelters.count()})
    
    def post(self, request):
        context = {}
        print(request.data)
        url = request.data.get('url')
        img_url = request.data.get('img_url')
        if not url:
            return Response({'error': 'URL not found'})
        qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
        qr.add_data(url)
        qr_inner_eyes_img = qr.make_image(image_factory=StyledPilImage,
                                        eye_drawer=RoundedModuleDrawer(1),
                                        color_mask=SolidFillColorMask(front_color=(128, 0, 128)))
        qr_outer_eyes_img = qr.make_image(image_factory=StyledPilImage,
                                        eye_drawer=RoundedModuleDrawer(1),
                                        color_mask=SolidFillColorMask(front_color=(128, 0, 128)))
        qr_img = qr.make_image(image_factory=StyledPilImage,
                            module_drawer=RoundedModuleDrawer(),
                            color_mask=SolidFillColorMask(front_color=(0, 0, 255)),
                            embeded_image_path=img_url)
        inner_eye_mask = style_inner_eyes(qr_img)
        outer_eye_mask = style_outer_eyes(qr_img)
        intermediate_img = Image.composite(qr_inner_eyes_img, qr_img, inner_eye_mask)
        final_image = Image.composite(qr_outer_eyes_img, intermediate_img, outer_eye_mask)
        stream = BytesIO()
        final_image.save(stream, format='PNG')
        qr_image_data = stream.getvalue()
        qr_image_base64 = base64.b64encode(qr_image_data).decode('utf-8')
        context['qr_image_base64'] = qr_image_base64
        context['variable'] = url
        return Response(context)
    
