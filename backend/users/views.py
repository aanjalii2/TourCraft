from django.shortcuts import render
# Viewsets provide methods for CRUD operations
from rest_framework import viewsets,status
from .models import CustomUser
from .serializer import CustomUserSerilizer,LoginSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed 
from django.contrib.auth import authenticate
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Destination
from .serializer import DestinationSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated
from .models import Booking, Payment
from .serializer import BookingSerializer
from rest_framework import generics
from rest_framework.permissions import BasePermission
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.views.generic import View
import uuid
from django.http import Http404, HttpResponse, HttpResponseRedirect,HttpResponseForbidden,HttpResponseNotFound
from django.urls import reverse, reverse_lazy
import requests as req # type: ignore
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.http import HttpResponse
from django.conf import settings
import os


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
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')

            user = authenticate(request, email=email, password=password)
            if user is not None:
                # Generate token if user is authenticated
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"token": token.key, "message": "Login successful"}, status=status.HTTP_200_OK)
            else:
                raise AuthenticationFailed("Invalid Email or Password")
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
class DestinationListAPIView(ListCreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    # permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Destination.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Destination created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# def display_images(request):
 
#     if request.method == 'GET':
 
#         # getting all the objects of hotel.
#         destinations = Destination.objects.all()
#         return render((request,
#                        {'hotel_images': Destination}))



def display_images(request):
    image_path = 'C:\\Users\\Acer\\Downloads\\Tour\\backend\\media\\media\\image1.png'
    
  
    # Construct the absolute file path to the image
    image_absolute_path = os.path.join(settings.BASE_DIR, image_path)

    # Check if the image file exists
    if os.path.exists(image_absolute_path):
        with open(image_absolute_path, 'rb') as f:
            # Read the image file content
            image_data = f.read()

        # Create an HTTP response with the image content
        return HttpResponse(image_data, content_type='image/jpeg')  # Adjust content type as per your image format
    else:
        # Return a 404 Not Found response if the image file does not exist
        return HttpResponse(status=404)

class DestinationDeleteAPIView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, destination_id):
        try:
            destination = Destination.objects.get(id=destination_id)
            destination.delete()
            return Response({"message": "Destination deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Destination.DoesNotExist:
            return Response({"message": "Destination not found."}, status=status.HTTP_404_NOT_FOUND)


class BookingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    
    # def perform_create(self, serializer):
    #     # Ensure that user is a CustomUser instance
    #     if isinstance(self.request.user, CustomUser):
    #         serializer.save(user=self.request.user)
    #         return Response({"message": "Booking successful"}, status=status.HTTP_201_CREATED)
    #     else:
    #         # Handle error case where request user is not a CustomUser instance
    #         return Response({"message": "Invalid user type."}, status=status.HTTP_400_BAD_REQUEST)

class BookingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUser]


# class VerifyEsewa(View):
#      def get(self,request):
#         url ="https://uat.esewa.com.np/epay/transrec"
#         q = request.GET.get('q')
#         print(request.GET)
        

#         d = {
#             'amt':request.GET.get('amt'),
#             'scd': 'EPAYTEST',
#             'rid':  request.GET.get('refId'),
#             'pid':request.GET.get('oid'),
#         }
#         resp = req.post(url, d)
#         print("status code=====",resp.status_code)
#         if resp.status_code == 200:
#             user = self.request.user
#             user.save()
#         # print(resp.text)
#             return HttpResponseRedirect("login succesful")
#         else:
#             raise Http404()
        