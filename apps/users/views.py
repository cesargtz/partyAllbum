from django.shortcuts import render, redirect

from django.views.generic import TemplateView, FormView
from .forms import LoginForm
from django.core.urlresolvers import reverse_lazy, reverse
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
class LoginView(FormView):
     template_name = 'login.html'
     form_class = LoginForm
     success_url = reverse_lazy('main:home')

     def form_valid(self, form): #cuanto en el form.py hace todas las validaciones este se vuelve a birnca a la vista. se Guardan los datos hasta cerrar sesion
        user = authenticate(
            username = form.cleaned_data['username'],
            password = form.cleaned_data['password']
        )
        login(self.request, user)
        return super(LoginView, self).form_valid(form)
