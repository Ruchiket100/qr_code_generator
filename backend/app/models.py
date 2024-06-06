from django.db import models

class QRcode(models.Model):
    count = models.AutoField(primary_key=True)
    # other fields...

    def __str__(self):
        return str(self.count)

    class Meta:
        ordering = [
            "count",
        ]