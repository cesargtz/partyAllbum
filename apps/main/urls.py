from django.conf.urls import url
from . import views
from .views import  HomeView, UploadView

urlpatterns = [
    url(r'^home$', HomeView.as_view(), name="home"),
    # url(r'^form$', views.FormView, name="form"),
    url(r'^upload$', UploadView.as_view(), name="upload"),
    # url(r'^upload$', views.UploadView, name="upload"),
]
