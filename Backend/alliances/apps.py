from django.apps import AppConfig


class AlliancesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'alliances'
    def ready(self):
        import alliances.signals
