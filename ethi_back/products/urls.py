from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import ProductViewSet, CartViewSet, MaterialViewSet
from products.views import CreateUserView 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register(r'cart', CartViewSet, basename='cart')
router.register(r'', ProductViewSet, basename='products')
# router.register(r'material', MaterialViewSet, basename='material')

urlpatterns = [

    path('products/user/register/', CreateUserView.as_view(), name='register'),
    
    path('notes/', views.NoteListCreate.as_view(), name="note-list"),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name="delete-note"),
    path('', include(router.urls)),  # Include the router URLs here
    path('cart/', CartViewSet.as_view({"get": "list"}), name="cart-list"),
    path('cart/add/', CartViewSet.as_view({"post": "add"}), name="cart-add"),
    path('cart/checkout/', CartViewSet.as_view({"post": "checkout"}), name="cart-checkout"),
    path('cart/<int:pk>/', CartViewSet.as_view({"delete": "destroy"}), name="cart-item-delete"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
