# from rest_framework.generics import CreateAPIView
# from .models import User
# from .serializer import UserSerializer

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# # from .serializer import LoginSerializer

# class UserCreateAPIView(CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     # serializer_class = LoginSerializer
# # views.py


# @csrf_exempt
# def check_username(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         if User.objects.filter(username=username).exists():
#             return JsonResponse({'exists': True})
#         else:
#             return JsonResponse({'exists': False})
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)


# # from rest_framework.generics import CreateAPIView
# # from .models import User
# # from .serializer import UserSerializer, LoginSerilizer
# # from rest_framework.response import Response
# # from rest_framework import viewsets,status

# # from django.contrib.auth import authenticate
# # from django.http import JsonResponse
# # from django.views.decorators.csrf import csrf_exempt
# # # from .serializer import LoginSerializer

# # class UserCreateAPIView(CreateAPIView):
# #     queryset = User.objects.all()
# #     serializer_class = UserSerializer
# #     # serializer_class = LoginSerializer
# # # views.py


# # @csrf_exempt
# # def check_username(request):
# #     if request.method == 'POST':
# #         username = request.POST.get('username')
# #         if User.objects.filter(username=username).exists():
# #             return JsonResponse({'exists': True})
# #         else:
# #             return JsonResponse({'exists': False})
# #     else:
# #         return JsonResponse({'error': 'Invalid request method'}, status=405)

# # def create (self,request):
# #         serailizer= self.serializer_class(data=request.data)
# #         if serailizer.is_valid():
# #             serailizer.save() 
# #             return Response(serailizer.data,status=status.HTTP_201_CREATED)
# #         return Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
# # class LoginViewSet(viewsets.ViewSet):
# #     serializer_class= LoginSerilizer
# #     def create (self,request):
# #         serailizer= self.serializer_class(data=request.data)

# #         if serailizer.is_valid():
# #             email=serailizer.validated_data['email']
# #             password=serailizer.validated_data['password']

# #             user=authenticate(request,email=email,password=password)
# #             if user is None:
# #                 raise AuthenticationFailed("Invalid Email or Password")
# #             return Response(serailizer.data,status=status.HTTP_201_CREATED)
# #         return Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)

from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import UserSerializer
from .serializer import LoginSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def check_username(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        if User.objects.filter(username=username).exists():
            return JsonResponse({'exists': True})
        else:
            return JsonResponse({'exists': False})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


def user_login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Authentication successful
            # You can perform additional actions here if needed
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        # Serializer validation failed
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


