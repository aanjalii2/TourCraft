from .models import CustomUser
# from django.contrib.auth import authenticate
# from django.contrib.auth.models import update_last_login
from rest_framework import serializers
# from allauth.socialaccount.models import SocialToken
# from allauth.socialaccount.providers.google import GoogleAccount
# from allauth.socialaccount.providers.google.provider import GoogleProvider


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

class LoginSerilizer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only ="True")
    
# class GoogleLoginSerializer(serializers.Serializer):
    