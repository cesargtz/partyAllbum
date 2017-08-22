# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from resizeimage import resizeimage
import re

class Photography(models.Model):

    image = models.FileField(upload_to="Gallery")   #upload_to significa que va a esa carpeta
    image_full = models.CharField(max_length=200)
    likes = models.IntegerField()

    create_at = models.DateTimeField(auto_now_add=True) # Fecha de Cuando se creo
    updated_at = models.DateTimeField(auto_now=True) # Fecha de cuando se modifico


    def save(self, *args, **kwargs):
        img_comp = Image.open(self.image)
        name = re.sub(r'[?|$||!()"]',r'',self.image.name)
        name = name.replace(' ','_')
        img = img_comp.save('./Gallery/' + name, quality=80)
        # self.image.save(self.image.name, img, save=False)
        # if self.image.mode != 'RGB':
        #     self.image = self.image.convert('RGB')
        pil_image_obj = Image.open(self.image)
        new_image = resizeimage.resize_width(pil_image_obj, 500)

        new_image_io = BytesIO()
        new_image.save(new_image_io, format='JPEG', quality=80)

        temp_name = './resize_Gallery/' + self.image.name

        self.image.save(
            temp_name,
            content=ContentFile(new_image_io.getvalue()),
            save=False
        )

        super(Photography, self).save(*args, **kwargs)
