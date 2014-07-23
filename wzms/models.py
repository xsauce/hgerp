# -*- coding:utf-8 -*-
from django.db import models

# Create wzms models here.

#物资基本信息
class Goods(models.Model):
	goods_code=models.CharField(max_length=50)
	goods_name=models.CharField(max_length=100)
	goods_type=models.CharField(max_length=50,null=True)
	goods_unit=models.CharField(max_length=10,null=True)
	goods_price=models.DecimalField(max_digits=14,decimal_places=4,null=True)
	goods_sort=models.CharField(max_length=20)
	remark=models.CharField(max_length=500,null=True)
	is_relate_product=models.BooleanField(default=False)

#物资仓库信息
class StoreBase(models.Model):
	goods=models.ForeignKey(Goods)
	store_count=models.IntegerField(default=0)
	last_modified_date=models.DateTimeField(auto_now=True)

class AbstractStoreOperateRecord(models.Model):
	goods=models.ForeignKey(Goods)
	

#物资仓库操作记录，操作包括：入库，出库，领料，退料
class StoreInRecord(models.Model):
	SHOULIAO='SHOULIAO'
	JIAGONGSHOU='JIAGONGSHOU'
	ZIZHISHOU='ZIZHISHOU'
	FEIPINSHOU='FEIPINSHOU'
	IN_STORE_SORT=(
		(SHOULIAO,'收料单'),
		(JIAGONGSHOU,'委托加工验收单'),
		(ZIZHISHOU,'自制材料交库单'),
		(FEIPINSHOU,'废品交库单'),
	)
	in_sort=models.CharField(max_length=15,choices=IN_STORE_SORT)
	goods=models.ForeignKey(Goods)
	in_date=models.DateTimeField()
	

class StoreOutRecord(models.Model):
	pass
class StoreGetRecord(models.Model):
	pass
class StoreBackRecord(models.Model):
	pass
class StoreCheckRecord(models.Model):
	pass

	

