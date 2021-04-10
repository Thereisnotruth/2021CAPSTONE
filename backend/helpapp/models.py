from django.db import models

# Create your models here.


class Member(models.Model):
    username = models.CharField(max_length=20, primary_key=True)
    password = models.CharField(max_length=20)
    gender = models.CharField(max_length=5)
    weight = models.FloatField(max_length=5)
    height = models.FloatField(max_length=5)
    muscle = models.FloatField(max_length=5)
    fat = models.FloatField(max_length=5)

    def __str__(self):
        return self.id

