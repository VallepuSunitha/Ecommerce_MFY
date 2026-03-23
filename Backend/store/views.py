from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

from rest_framework.decorators import api_view
from .models import Order, OrderItem

from django.contrib.auth.models import User
from django.http import JsonResponse
import json

from django.contrib.auth import authenticate
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user)
    data = []
    for order in orders:
        items = OrderItem.objects.filter(order=order)
        order_data = {
            "id": order.id,
            "created_at": order.created_at,
            "items": [
                {
                   "id": item.product.id,
                   "product": item.product.name,
                   "image": item.product.image,
                   "quantity": item.quantity
                }
                for item in items
            ]
        }
        data.append(order_data)
    return Response(data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    order = Order.objects.create(user=request.user)

    for item in request.data:
        OrderItem.objects.create(
            order=order,
            product_id=item['id'],
            quantity=item['qty']
        )

    return Response({"message": "Order Created"})



@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"})

    return Response(serializer.errors)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
        "id": user.id,
    })