"""
URL configuration for ethi_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
"""
URL configuration for ethi_back project.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from products.views import CartViewSet, ProductViewSet, MaterialViewSet
from django.conf import settings
from django.conf.urls.static import static

# Create a DRF router
router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')           # Cart endpoints
router.register(r'materials', MaterialViewSet, basename='material')  # Material endpoints
router.register(r'products', ProductViewSet, basename='product')     # Product endpoints

cart_list = CartViewSet.as_view({"get": "list"})
cart_add = CartViewSet.as_view({"post": "add"})
cart_delete = CartViewSet.as_view({"delete": "destroy"})
urlpatterns = [
    path('admin/', admin.site.urls),
    # JWT token endpoints
    path('products/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('products/token/refresh/', TokenRefreshView.as_view(), name='refresh'),

    # DRF browsable API login
    path('products-auth/', include('rest_framework.urls')),
    path('cart/pay_and_deliver/', CartViewSet.as_view({"post": "pay_and_deliver"}), name="cart-pay-and-deliver"),

    # Include any app-specific urls
    path('products/', include('products.urls')),

    # Include router urls
    path('', include(router.urls)),
     path("cart/", cart_list, name="cart-list"),
    path("cart/add/", cart_add, name="cart-add"),
    path("cart/<int:pk>/", cart_delete, name="cart-item-delete"),
]

# Serve media files in debug
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
