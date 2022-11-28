import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet
from .models import Project, Todo


# APIRequestFactory

class TestProjectViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': "Questions", 'href_repository': '-', 'users': 'user1'},
                               format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': "Questions", 'href_repository': '-', 'users': '1'},
                               format='json')
        admin = User.objects.create_superuser('administrator', 'administrator@we.com', 'SDfdfssWDw21')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
