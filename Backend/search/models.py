from django.db import models

class Keyword(models.Model):
    keyword_name = models.CharField(max_length=255, null=True, blank=False, db_index=True)
    stemmed_keyword_name = models.CharField(max_length=255, null=True, blank=False, db_index=True)
    keyword_search_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.keyword_name)



class SearchHistory(models.Model):
    search_query = models.CharField(max_length=255, null=False, blank=False, db_index=True)
    search_query_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.search_query