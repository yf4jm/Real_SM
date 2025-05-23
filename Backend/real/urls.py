"""real URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls.static import static
from django.conf import settings
from .routes import getRoutes
from alliances.routes import getRoutes as allianceR
from .views import LogoutView
import debug_toolbar
urlpatterns = [
    path('__debug__/',include(debug_toolbar.urls)),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/',LogoutView.as_view(), name='logout'),

    path('alliances/',allianceR),
    
    path('api/',include('alliances.api.urls')),
    path('api/',include('search.api.urls')),
    path('api/',include('users.api.urls')),
    path('api/',include('posts.api.urls')),
    path('api/',getRoutes,name='api-route'),
    path('api/',include('communities.api.urls')),
    path('api/',include('chat.api.urls')),
    path('api/',include('post_comments.api.urls')),

    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
