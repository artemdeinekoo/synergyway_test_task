# Generated by Django 5.0 on 2023-12-25 01:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banks', '0002_bank_users'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bank',
            name='users',
            field=models.ManyToManyField(related_name='banks', to='users.user'),
        ),
    ]
