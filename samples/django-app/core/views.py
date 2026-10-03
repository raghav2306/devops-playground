from django.http import JsonResponse
from .models import Item

def index(request):
    return JsonResponse({'message': 'Hello from sample Django project'})

def item_list(request):
    items = Item.objects.all().values('id', 'name', 'description', 'created_at')
    return JsonResponse({'items': list(items)})
