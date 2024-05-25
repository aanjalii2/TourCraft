import os

import requests
import stripe
from django.conf import settings
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
# Viewsets provide methods for CRUD operations
from rest_framework import generics, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Booking, CustomUser, Destination, Payment, Trip
from .serializer import (BookingDetailSerializer, BookingSerializer, CustomUserSerilizer,
                         DestinationSerializer, LoginSerializer,
                         PaymentSerializer, TripSerializer)

stripe.api_key = 'sk_test_51PKB69P1JONaS2WcZJneQTkc5ayWdzy7P4Vm3HfhzBzBVPCkm2z44KlWYCtIifq4p1NJE4eore889obR5Nt2ZXiZ00zdJ15hc1'

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

@api_view(['GET'])
def get_specific_user(request, user_id):
    if request.method == 'GET':
        user = CustomUser.objects.filter(id=user_id)
        if user:
            serializer = CustomUserSerilizer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'User not found or unauthorized access'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Get the token associated with the current user
        token = Token.objects.get(user=request.user)

        # Delete the token
        token.delete()

        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({'message': 'No token found for the user'}, status=status.HTTP_400_BAD_REQUEST)

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

class TripListView(ListCreateAPIView):
  queryset = Trip.objects.all()
  serializer_class = TripSerializer
  
  def get_queryset(self):
        return Trip.objects.all()
  def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Trip created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return BookingDetailSerializer
        return BookingSerializer

    def perform_create(self, serializer):
        trip = serializer.validated_data.get('trip')
        trip_obj = Trip.objects.get(id=trip.id)
        serializer.save(cost=trip_obj.cost, user=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_bookings(request, email):
    if request.user.is_authenticated:
        user = CustomUser.objects.get(email=email)
        # Query the bookings for the authenticated user with the provided email
        bookings = Booking.objects.filter(user=user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
    else:
        return Response(status=401)  # Unauthorized


class BookingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUser]

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        authorization_header = request.headers.get('Authorization')
        if not authorization_header:
            raise AuthenticationFailed('Authorization header missing!')

        try:
            access_token = authorization_header.split()[1]
        except IndexError:
            raise AuthenticationFailed('Invalid Authorization header format!')

        try:
            user = request.user
            serializer = CustomUserSerilizer(user)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': f'Error decoding token: {str(e)}'}, status=status.HTTP_401)

@api_view(['POST'])
def initiate_payment(request, booking_id):
    # user = CustomUser.objects.get(email=email)
    booking = Booking.objects.get(id=booking_id)

    khalti_url = "https://a.khalti.com/api/v2/epayment/initiate/"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Key e1efcb9caf0b48159a0a4bf5da0a3cfc"
    }

    khalti_body = {
        "amount": int(booking.cost * 100),
        "purchase_order_id": booking.id,
        "purchase_order_name": f"Booking for {booking.destination.name} on {booking.date}",
        "website_url": "http://localhost:3000/",
        "return_url": f"http://localhost:3000/confirmation/{booking.id}",
        "customer_info": {
            "name": booking.user.name,
            "email": booking.user.email,
            "phone": booking.phone
        }
    }

    try:
        response = requests.post(khalti_url, json=khalti_body, headers=headers)
        response_data = response.json()
        if response.status_code >= 200 or response.status_code < 300:
            try:
                payment = Payment.objects.get(booking=booking)
                payment.amount = booking.cost
                payment.pidx = response_data.get('pidx')
                payment.paymentURL = response_data.get('payment_url')
                payment.save()
            except Payment.DoesNotExist:
                Payment.objects.create(amount=booking.cost, booking=booking, pidx=response_data.get('pidx'), paymentURL=response_data.get('payment_url'))

            return Response({'payment_url': response_data.get('payment_url')}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Payment Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def verify_payment(request, booking_id):
    booking = Booking.objects.get(id=booking_id)
    payment = Payment.objects.get(booking=booking)

    khalti_verify_url = "https://a.khalti.com/api/v2/epayment/lookup/"
    headers = {
        "Authorization": "Key e1efcb9caf0b48159a0a4bf5da0a3cfc"
    }

    khalti_verify_body = {
        "pidx": payment.pidx
    }

    try:
        response = requests.post(khalti_verify_url, json=khalti_verify_body, headers=headers)
        response_data = response.json()
        print(response_data)
        if response.status_code >= 200 or response.status_code < 300:
            payment.status = "SUCCESS"
            payment.save()
            booking.status = "SUCCESS"
            booking.save()
            return Response({'message': 'Payment successful'}, status=status.HTTP_200_OK)
        else:
            payment.status = "FAILED"
            payment.save()
            booking.status = "FAILED"
            booking.save()
            return Response({'error': 'Payment verification failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateCheckoutSession(APIView):
    authentication_classes = []

    def post(self, request, booking_id):
        booking = Booking.objects.get(id=booking_id)
        price = int(booking.cost * 100)
        product_name = f"Booking for {booking.destination.name} on {booking.date}"

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        "price_data": {
                            "currency": "npr",
                            "product_data": {
                                "name": product_name,
                            },
                            "unit_amount": price,
                        },
                        "quantity": 1,
                    }
                ],
                mode="payment",
                success_url=f"http://localhost:3000/confirmation/{booking.id}",
                cancel_url="http://localhost:3000/destinationselect",
            )
            
            return redirect(checkout_session.url)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
