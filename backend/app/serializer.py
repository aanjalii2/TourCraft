# app/serializers.py

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'confrim_password', 'contact_number', 'nationality']

#         extra_kwargs = {
#             'password': {'write_only':True}
#         }
#     def create(self, validated_data):
#         if (validated_data):
#             user=User.objects.create_user(**validated_data)
#         return user 

# class LoginSerilizer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only ="True")