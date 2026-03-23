from django.urls import path
from . import views
# from .views import register, login

urlpatterns = [
    path('products/', views.get_products),
    path('products/<int:pk>/', views.get_product),
    path('orders/', views.create_order),
    path('register/', views.register_user),
    path('my-orders/', views.my_orders),
    path('profile/', views.profile),
    
]



