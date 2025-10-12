from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()
class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_created=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE , related_name="nots")
    def __str__(self):
        return self.title
class Materials(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10 , decimal_places=2)
    image = models.ImageField(upload_to='prducts/' , blank= True , null = True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=50, default="product")
    def __str__(self):
        return self.name
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey("Materials", on_delete=models.CASCADE, related_name="cart_items")
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product")  # each user has one row per product (optional)

    def __str__(self):
        return f"{self.user.username} - {self.product.name} x {self.quantity}"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    items = models.ManyToManyField(CartItem, blank=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    payment_reference = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"Order {self.id} ({'paid' if self.paid else 'pending'})"