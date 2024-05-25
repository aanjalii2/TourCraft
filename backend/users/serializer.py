from rest_framework import serializers

from .models import Booking, CustomUser, Destination, Payment, Trip


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
       fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
  class Meta:
    model = Trip
    fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('phone', 'date', 'destination', 'trip', 'id')

class BookingDetailSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = ('phone', 'date', 'destination', 'trip', 'id', 'payments', 'status')
        depth = 1
