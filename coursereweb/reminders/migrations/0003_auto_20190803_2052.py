# Generated by Django 2.2.3 on 2019-08-03 20:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0002_grade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grade',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owner_grades', to=settings.AUTH_USER_MODEL),
        ),
    ]
