from django.shortcuts import render,redirect
# Viewsets provide methods for CRUD operations
from rest_framework import viewsets,status,generics
from .models import CustomUser,Booking,Destination
from .serializer import CustomUserSerilizer,LoginSerializer,DestinationSerializer,BookingSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed 
from django.contrib.auth import authenticate
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.conf import settings
import os
from rest_framework.decorators import api_view, permission_classes
import requests
from .models import Trip
from .serializer import TripSerializer
from .models import Payment
from .serializer import PaymentSerializer
import stripe
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

stripe.api_key = 'pk_test_51PBGjISISl0vzfh8QGBNNtreHTULMsu0L0vJzvQD3UfYD92fs3FeOqchN3anlkTI7EIA7lsi2lsJcI1R1eZ7iVNU00pckPGdc1'

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
    serializer_class = BookingSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        trip = serializer.validated_data.get('trip')
        trip_obj = Trip.objects.get(id=trip.id)
        serializer.save(cost=trip_obj.cost, user=self.request.user)

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
<<<<<<< HEAD
        if response.status_code >= 200 or response.status_code < 300:
            Payment.objects.create(amount=booking.cost, booking=booking, pidx=response_data.get('pidx'), paymentURL=response_data.get('payment_url'))
            return Response({'payment_url': response_data.get('payment_url')}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Payment Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com'
        )
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)
=======
        Payment.objects.create(amount=booking.cost, booking=booking, pidx=response_data.get('pidx'), paymentURL=response_data.get('payment_url'))
        return Response({'payment_url': response_data.get('payment_url')}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
>>>>>>> 7d02c7ee286b90be4499e566511b03739c05ac83
