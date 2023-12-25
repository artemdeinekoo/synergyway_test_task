from django.contrib import admin
from django.urls import path
from rest_framework import routers
from users.views import UserViewSet, GenerateRandomUsersView, AddBankToUserView, GetUserUnknownBanksView
from banks.views import BankViewSet, GenerateRandomBanksView, RemoveUserFromBankView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'banks', BankViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('banks/generate/', GenerateRandomBanksView.as_view()),
    path('users/generate/', GenerateRandomUsersView.as_view()),
    path('users/add_bank/', AddBankToUserView.as_view()),
    path('users/<int:user_id>/unknown_banks/', GetUserUnknownBanksView.as_view()),
    path('banks/<int:bank_id>/users/<int:user_id>/remove/', RemoveUserFromBankView.as_view()),
]

urlpatterns += router.urls
