from .models import CustomUser
from rest_framework import serializers
from .models import Destination
from .models import Booking

from .models import Payment



class CustomUserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'email', 'password', 'phonenumber', 'nationality', 'role']

        extra_kwargs = {
            'password': {'write_only':True},
            
        }
    def create(self, validated_data):
        if (validated_data):
            user=CustomUser.objects.create_user(**validated_data)
        return user 

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only ="True")
    
class DestinationSerializer(serializers.ModelSerializer):
   class Meta:
       model = Destination
       fields = ['name', 'description', 'image']
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['user', 'phone', 'destination', 'date']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


    