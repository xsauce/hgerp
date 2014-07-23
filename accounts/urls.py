from django.conf.urls import patterns, include, url
from accounts import views 
urlpatterns=patterns('',
	url(r'^login/$',views.login_view,name='login'),
    url(r'^profile/$',views.profile_view,name='profile'),
    url(r'^logout/$',views.logout_view,name='logout'),
)