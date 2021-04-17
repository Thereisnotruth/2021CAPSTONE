# Generated by Django 3.0.3 on 2021-04-15 13:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('helpapp', '0004_auto_20210411_1001'),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('board_id', models.IntegerField(primary_key=True, serialize=False)),
                ('board_name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=200)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('buy_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('item_id', models.IntegerField(primary_key=True, serialize=False)),
                ('item_name', models.CharField(max_length=20)),
                ('item_price', models.IntegerField()),
                ('item_type', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('post_id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=20)),
                ('content', models.CharField(max_length=500)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='study',
            name='study_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AddConstraint(
            model_name='user_study',
            constraint=models.UniqueConstraint(fields=('user_id', 'study_id'), name='user_in_study'),
        ),
        migrations.AddField(
            model_name='post',
            name='board_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpapp.Board'),
        ),
        migrations.AddField(
            model_name='post',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpapp.User'),
        ),
        migrations.AddField(
            model_name='inventory',
            name='item_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpapp.Item'),
        ),
        migrations.AddField(
            model_name='inventory',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpapp.User'),
        ),
        migrations.AddField(
            model_name='comment',
            name='post_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpapp.Post'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpapp.User'),
        ),
        migrations.AddConstraint(
            model_name='inventory',
            constraint=models.UniqueConstraint(fields=('user_id', 'item_id'), name='item_in_inventory'),
        ),
        migrations.AddConstraint(
            model_name='comment',
            constraint=models.UniqueConstraint(fields=('user_id', 'post_id'), name='user_post'),
        ),
    ]
