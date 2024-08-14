from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.apiOverview, name = 'api'),
    path('user-create/', views.UserCreate.as_view(), name = 'user-create'),
    path('ticket-list/', ticketList.as_view(), name = 'ticket-list'),
    path('ticket-details/<str:pk>', views.ticketDetails, name = 'ticket-details'),
    path('ticket-details-edit/<str:pk>', views.ticketDetailsEdit, name = 'ticket-details-edit'),
    path('ticket-create/', views.ticketCreate, name = 'ticket-create'),
    path('devuser-create/', views.devUserCreate, name = 'devuser-create'),
    path('ticket-update/<str:pk>', views.ticketUpdate, name = 'ticket-update'),
    path('ticket-delete/<str:pk>', views.ticketDelete, name = 'ticket-delete'),
    path('project-list/', projectList.as_view(), name = 'project-list'),
    path('project-details/<str:pk>', views.projectDetails, name = 'project-details'),
    path('project-create/', views.projectCreate, name = 'project-create'),
    path('project-update/<str:pk>', views.projectUpdate, name = 'project-update'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('devuser/<str:pk>', views.DevUserDetails, name='devuser'),
    path('devuser-update/<str:pk>', views.devUserUpdate, name='devuser-update'),
    path('user-list/',UserList.as_view(), name='user-list'),
    path('devuser-list/', devUserList.as_view(), name='devuser-list'),
    path('assigned-tickets/<str:pk>/', ticketByUser.as_view(), name = 'assigned-tickets'),
    path('project-tickets/<str:pk>/', ticketByProject.as_view(), name = 'ticket-project'),
    path('project-members/<str:pk>/', views.DevUsersAssignedToProject, name = 'project-members'),
    
]
