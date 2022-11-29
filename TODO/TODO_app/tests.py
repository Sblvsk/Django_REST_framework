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

    # def test_create_admin(self):
    #     factory = APIRequestFactory()
    #     request = factory.post('/api/projects/', {'name': "Questions", 'href_repository': '-', 'users': 'user1'},
    #                            format='json')
    #     # admin = User.objects.create_superuser('admin', 'admin@admin.com',
    #     #                                       'admin123456')
    #     admin = User.objects.create_user('admin', is_staff=True, is_superuser=True)
    #     force_authenticate(request, admin)
    #     view = ProjectModelViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # APIClient
    def test_get_detail(self):
        project = Project.objects.create(name="Questions", href_repository='-')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(name="Questions", href_repository='-')
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {'name': 'Work', 'href_repository': 'qw'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


# APISimpleTestCase
class TestMath(APISimpleTestCase):
    def test_factorial(self):
        import math
        self.assertEqual(math.factorial(3), 6)


# APITestCase

class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

#  Mixer
    def test_get_detail(self):
        todo = mixer.blend(Todo)
        response = self.client.get(f'/api/todo/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)




