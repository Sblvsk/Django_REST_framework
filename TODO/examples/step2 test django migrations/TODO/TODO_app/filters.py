from django_filters import rest_framework as filters
from .models import Project, Todo


class ProjectFilterSet(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']

#
# class TodoFilterSet(filters.FilterSet):
#     name = filters.DateFromToRangeFilter()
#
#     class Meta:
#         model = Todo
#         fields = ['create']
