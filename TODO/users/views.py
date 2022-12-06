from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.views import APIView

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets

from .models import User
from .serializers import UserModelSerializer


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

class UserCustomViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

class UserParamFilterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_queryset(self):
        name = self.request.query_params.get
