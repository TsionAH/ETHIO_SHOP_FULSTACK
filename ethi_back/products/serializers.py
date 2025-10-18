from django.contrib.auth.models import User
from rest_framework import serializers
from django.conf import settings
from .models import Note , Materials,CartItem, Order
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id' , 'username' , 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self , validate_data):
        user = User.objects.create_user(**validate_data)
        return user
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title','content' ,'create_at','author']
        extra_kwargs = {'author': {'read_only': True}}
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materials
        fields = ['id' , 'name' , 'description' , 'price' , 'image' ,'created_at']
class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Materials.objects.all())
    product_detail = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "user", "product", "product_detail", "quantity", "added_at"]
        read_only_fields = ["user", "added_at"]

    def get_product_detail(self, obj):
        image_url = obj.product.image.url if obj.product.image else None
        if image_url:
            request = self.context.get("request")
            image_url = request.build_absolute_uri(image_url) if request else settings.MEDIA_URL + str(obj.product.image)
        return {
            "id": obj.product.id,
            "name": obj.product.name,
            "price": str(obj.product.price),
            "image": obj.product.image.url if obj.product.image else None,
        }

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1)

    def validate_product_id(self, value):
        if not Materials.objects.filter(id=value).exists():
            raise serializers.ValidationError("Product does not exist.")
        return value

class OrderSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ["id", "user", "items", "total_amount", "paid", "created_at", "payment_reference"]
        read_only_fields = ["user", "total_amount", "paid", "created_at", "payment_reference"]