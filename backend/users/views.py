from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import User
from .serializers import UserSerializer
from banks.models import Bank
from banks.serializers import UsersBankSerializer
from django.shortcuts import get_object_or_404
import requests


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer


class GenerateRandomUsersView(APIView):
    def post(self, request):
        data = request.data
        num_of_users = data.get("num_of_users")

        if not num_of_users or num_of_users < 0 or num_of_users > 100:
            return Response(
                {
                    "error": "Number of users should be specified and should not exceed 100."
                },
                status=400,
            )

        try:
            response = requests.get(
                f"https://random-data-api.com/api/v2/users/?size={num_of_users}&response_type=json"
            )

            if response.status_code == 200:
                users_data = response.json()
                if num_of_users == 1:
                    users_data = [users_data]

                for user_data in users_data:
                    user_serializer = UserSerializer(data=user_data)

                    if user_serializer.is_valid():
                        user_serializer.save()

                return Response(
                    {"message": f"{num_of_users} users have been successfully added."},
                    status=201,
                )
            else:
                return Response({"error": "Failed to fetch user data."}, status=500)

        except requests.RequestException as e:
            return Response({"error": f"Request failed: {str(e)}"}, status=500)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)


class AddBankToUserView(APIView):
    def post(self, request):
        user_id = request.data.get("user_id")
        bank_id = request.data.get("bank_id")
        try:
            user = get_object_or_404(User, pk=user_id)
            bank = get_object_or_404(Bank, pk=bank_id)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)

        if user.banks.filter(pk=bank_id).exists():
            return Response(
                {"error": "User is already associated with this bank"}, status=400
            )

        user.banks.add(bank)
        return Response({"message": "Bank added to user successfully"}, status=200)


class GetUserUnknownBanksView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        unknown_banks = Bank.objects.exclude(users=user)
        serializer = UsersBankSerializer(unknown_banks, many=True)
        return Response(serializer.data, status=200)
