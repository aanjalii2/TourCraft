# # app/serializers.py

# from rest_framework import serializers
# from .models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'confrim_password', 'contact_number', 'nationality']

# #         extra_kwargs = {
# #             'password': {'write_only':True}
# #         }
# #     def create(self, validated_data):
# #         if (validated_data):
# #             user=User.objects.create_user(**validated_data)
# #         return user 

# # class LoginSerilizer(serializers.Serializer):
# #     email = serializers.EmailField()
# #     password = serializers.CharField(write_only ="True")
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'confirm_password', 'contact_number', 'nationality']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'email': {'validators': []}  # Remove default email validation
        }

    def validate(self, attrs):
        # Custom validation logic
        # Check if passwords match
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Passwords do not match")
        return attrs
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                return user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password' fields.")

