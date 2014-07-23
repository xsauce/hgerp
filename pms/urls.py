from django.conf.urls import patterns,url

urlpatterns=patterns('',
	url(r'^plan_source/$','pms.views.plan_source'),
	)