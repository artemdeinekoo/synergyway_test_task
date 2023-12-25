from .models import Bank
from rest_framework import serializers


class BankSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    class Meta:
        model = Bank
        fields = [
            "id",
            "bank_name",
            "routing_number",
            "swift_bic",
            "swift_bic",
            "users",
        ]

    def get_users(self, obj):
        users = obj.users.all()
        user_data = []
        for user in users:
            user_data.append(
                {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                }
            )
        return user_data


class UsersBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ["id", "bank_name"]
