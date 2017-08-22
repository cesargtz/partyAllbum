# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.core.urlresolvers import reverse, reverse_lazy
from .models import Photography
from django.http import HttpResponse
from PIL import Image
from .forms import UploadForm
import re
from django.views.generic.edit import CreateView, FormView



class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kargs):
        context = super(HomeView, self).get_context_data(**kargs)
        context['photographys'] = Photography.objects.all()
        return context

class UploadView(FormView):
    form_class = UploadForm
    template_name = 'upload.html'  # Replace with your template.
    success_url = reverse_lazy('main:home')

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('image')
        if form.is_valid():
            for f in files:
                name = re.sub(r'[?|$||!()"]',r'',f.name)
                name = name.replace(' ','_')
                path_img_full = ('Gallery/' + name)
                obj = Photography(image= f, image_full = path_img_full)
                obj.save()
            return self.form_valid(form)
        else:
            return self.form_invalid(form)


def Download(self,url):
    path = Photography.objects.filter(id = url)
    path_full = path[0].image_full
    img = Image.open(path_full)
    response = HttpResponse(content_type='image/jpg')
    img.save(response, "JPEG")
    name = path_full.split('/')
    response['Content-Disposition'] = 'attachment; filename=%s' % (name[1])
    return response

def Like(self,id):
    obj = Photography.objects.filter(id = id)
    if obj[0].likes:
        like = obj[0].likes + 1
    else:
        like = 1
    obj.update(likes = like)
    return HttpResponse(status=204)
