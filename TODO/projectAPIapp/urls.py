from django.urls import path

from projectAPIapp.views import ProjectListAPIView

app_name = 'projectAPIapp'

urlpatterns = [
    path('', ProjectListAPIView.as_view()),
]