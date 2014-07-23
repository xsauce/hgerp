from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hgerp.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^pms/',include('pms.urls',namespace='pms')),
    url(r'^wzms/',include('wzms.urls',namespace='wzms')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/',include('accounts.urls',namespace='accounts')),
)

