from django.test import TestCase, Client
from django.urls import reverse
from .models import Item

class ItemModelTest(TestCase):
    def test_create_item(self):
        it = Item.objects.create(name='Test Item', description='A test')
        self.assertEqual(str(it), 'Test Item')
        self.assertIsNotNone(it.created_at)

class ViewsTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_index_view(self):
        url = reverse('index')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn('Hello from sample Django project', resp.json().get('message'))

    def test_item_list_empty(self):
        url = reverse('item_list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json(), {'items': []})

    def test_item_list_with_items(self):
        Item.objects.create(name='One', description='First')
        Item.objects.create(name='Two', description='Second')
        url = reverse('item_list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(len(data['items']), 2)
        names = {i['name'] for i in data['items']}
        self.assertSetEqual(names, {'One', 'Two'})
