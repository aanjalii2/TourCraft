from rest_framework.generics import CreateAPIView
from .models import User
from .serializer import UserSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from .serializer import LoginSerializer

class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # serializer_class = LoginSerializer
# views.py


@csrf_exempt
def check_username(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        if User.objects.filter(username=username).exists():
            return JsonResponse({'exists': True})
        else:
            return JsonResponse({'exists': False})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


# from rest_framework.generics import CreateAPIView
# from .models import User
# from .serializer import UserSerializer, LoginSerilizer
# from rest_framework.response import Response
# from rest_framework import viewsets,status

# from django.contrib.auth import authenticate
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

# def create (self,request):
#         serailizer= self.serializer_class(data=request.data)
#         if serailizer.is_valid():
#             serailizer.save() 
#             return Response(serailizer.data,status=status.HTTP_201_CREATED)
#         return Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
# class LoginViewSet(viewsets.ViewSet):
#     serializer_class= LoginSerilizer
#     def create (self,request):
#         serailizer= self.serializer_class(data=request.data)

#         if serailizer.is_valid():
#             email=serailizer.validated_data['email']
#             password=serailizer.validated_data['password']

#             user=authenticate(request,email=email,password=password)
#             if user is None:
#                 raise AuthenticationFailed("Invalid Email or Password")
#             return Response(serailizer.data,status=status.HTTP_201_CREATED)
#         return Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)