from django.contrib import admin
from .models import Materials, CartItem, Order, Note  # import your models

# Register your models to make them appear in admin
admin.site.register(Materials)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(Note)
