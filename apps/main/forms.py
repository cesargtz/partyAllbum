from django import forms
from .models import Photography

class UploadForm(forms.Form):

    model = Photography
    image = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
