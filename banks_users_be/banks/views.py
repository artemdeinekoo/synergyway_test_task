from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Bank
from .serializers import BankSerializer
from users.models import User
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
import requests


class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all().order_by('id')
    serializer_class = BankSerializer

    def perform_destroy(self, instance):
        if instance.users.exists():
            raise ValidationError("Cannot delete. Users are associated with this bank.")
        instance.delete()

class GenerateRandomBanksView(APIView):
    def post(self, request):
        data = request.data
        num_of_banks = data.get('num_of_banks')

        if not num_of_banks or num_of_banks < 0 or num_of_banks > 100:
            return Response({"error": "Number of banks should be specified and should not exceed 100."}, status=400)

        try:
            response = requests.get(f"https://random-data-api.com/api/v2/banks/?size={num_of_banks}&response_type=json")

            if response.status_code == 200:
                banks_data = response.json()
                if num_of_banks == 1:
                    banks_data = [banks_data]

                for bank_data in banks_data:
                    bank_serializer = BankSerializer(data=bank_data)
                    if bank_serializer.is_valid():
                        bank_serializer.save()

                return Response({"message": f"{num_of_banks} banks have been successfully added."}, status=201)
            else:
                return Response({"error": "Failed to fetch bank data."}, status=500)
        
        except requests.RequestException as e:
            return Response({"error": f"Request failed: {str(e)}"}, status=500)
        
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
        
class RemoveUserFromBankView(APIView):
    def delete(self, request, user_id, bank_id):
        user = get_object_or_404(User, pk=user_id)
        bank = get_object_or_404(Bank, pk=bank_id)

        if user.banks.filter(pk=bank_id).exists():
            user.banks.remove(bank)
            return Response({'message': 'User removed from bank successfully'}, status=200)
        
        return Response({'error': 'User is not associated with this bank'}, status=400)
