from django.shortcuts import render
# Viewsets provide methods for CRUD operations
from rest_framework import viewsets,status
from .models import CustomUser
from .serializer import CustomUserSerilizer,LoginSerilizer
from rest_framework.response import Response
from .serializer import LoginSerilizer
from rest_framework.exceptions import AuthenticationFailed 
from django.contrib.auth import authenticate


#Create your views here.
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset= CustomUser.objects.all()
    serializer_class= CustomUserSerilizer

    def create (self,request):
        serailizer= self.serializer_class(data=request.data)
        if serailizer.is_valid():
            serailizer.save() 
            return Response(serailizer.data,status=status.HTTP_201_CREATED)
        return Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LoginViewSet(viewsets.ViewSet):
    serializer_class= LoginSerilizer
    def create (self,request):
        serailizer= self.serializer_class(data=request.data)

        if serailizer.is_valid():
            email=serailizer.validated_data['email']
            password=serailizer.validated_data['password']

            user=authenticate(request,email=email,password=password)
            if user is None:
                raise AuthenticationFailed("Invalid Email or Password")
            return Response(serailizer.data,status=status.HTTP_201_CREATED)
        return Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    

           
    
    
