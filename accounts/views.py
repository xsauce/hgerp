# coding:utf-8
from django.shortcuts import render,render_to_response,RequestContext
from django.contrib import auth
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required

# Create your views here.
def login_view(request):
	template_path='accounts/login.html'
	if request.method=="POST":
		user_name=request.POST.get('user_name','')
		password=request.POST.get('password','')
		user=auth.authenticate(username=user_name,password=password)
		if user is not None and user.is_active:
			auth.login(request,user)
			return HttpResponseRedirect(reverse('accounts:profile'))
		else:
			return render_to_response(template_path,
				{'err_msg':'错误:账号或密码错误'}
			)
	return render_to_response(template_path,{},context_instance=RequestContext(request))

def logout_view(request):
	auth.logout(request)
	return HttpResponseRedirect(reverse('accounts:login'))

@login_required
def profile_view(request):
	template_path='accounts/profile.html'
	return render(request,template_path)

