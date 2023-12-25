from .models import User
from rest_framework import serializers
from banks.serializers import UsersBankSerializer

class UserSerializer(serializers.ModelSerializer):
    banks = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'banks']

    def get_banks(self, obj):
        banks = obj.banks.all()
        return UsersBankSerializer(banks, many=True).data
    