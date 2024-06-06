from rest_framework import serializers
from .models import *

class QRcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRcode
        fields = ["count"]