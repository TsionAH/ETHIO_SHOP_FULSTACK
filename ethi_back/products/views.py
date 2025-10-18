from django.contrib.auth.models import User
from rest_framework import generics, viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
CHAPA_SECRET_KEY = 'YOUR_CHAPA_SECRET_KEY'
from .serializers import (
    UserSerializer, NoteSerializer, ProductSerializer,
    CartItemSerializer, AddToCartSerializer, OrderSerializer
)
from .models import Note, Materials, CartItem, Order


BASE_URL = settings.REACT_BASE_URL
# -------------------
# Notes
# -------------------
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


# -------------------
# Products
# -------------------
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    /products/        → list all products
    /products/<id>/   → retrieve single product
    """
    queryset = Materials.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    


class MaterialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    /products/material/ → list only materials
    """
    queryset = Materials.objects.filter(category="material")  # adjust field if needed
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


# -------------------
# User registration
# -------------------
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


# -------------------
# Cart
# -------------------
# -------------------
# Cart
# -------------------
class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # List all cart items for the current user
    def list(self, request):
        items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    # Delete a cart item
    def destroy(self, request, pk=None):
        try:
            item = CartItem.objects.get(pk=pk, user=request.user)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    # Add to cart or increment quantity
    @action(detail=False, methods=["post"])
    def add(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data.get("quantity", 1)

        product = Materials.objects.get(pk=product_id)
        cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    # Checkout - return total sum
    @action(detail=False, methods=["post"])
    def checkout(self, request):
        items = CartItem.objects.filter(user=request.user)
        total = sum(item.product.price * item.quantity for item in items)
        # Here you can integrate with a real payment API later
        # For now, just return the total
        return Response({"total": total, "payment_reference": "TEMP12345"})
    @action(detail=False, methods=["post"])
    def pay_and_deliver(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)
        
        if not cart_items.exists():
            return Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        payment_url = "https://checkout.chapa.co/dummy_checkout_link"
        return Response({"payment_url": payment_url}, status=status.HTTP_200_OK)
        total_amount = sum(float(item.product_detail.price) * item.quantity for item in cart_items)

        # Chapa payload
        payload = {
            "amount": total_amount,
            "currency": "ETB",
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "callback_url": "http://127.0.0.1:5173/cart/checkout-success",  # your frontend route
            "tx_ref": f"chapa_{user.id}_{user.pk}"  # unique transaction ref
        }

        headers = {
            "Authorization": f"Bearer {CHAPA_SECRET_KEY}",
            "Content-Type": "application/json",
        }

        try:
            res = request.post("https://api.chapa.co/v1/transaction/initialize", json=payload, headers=headers)
            res_data = res.json()
            if res.status_code == 200 and res_data.get("status") == "success":
                # You can also create an order object in DB here
                return Response({"payment_url": res_data["data"]["checkout_url"]})
            return Response({"detail": "Failed to initialize payment", "response": res_data}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)