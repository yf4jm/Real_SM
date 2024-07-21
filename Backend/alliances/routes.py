from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'GET, POST': '/api/alliances/'},
        {'GET, PUT, DELETE': '/api/alliances/<uuid:pk>'},

        {'GET, POST': '/api/alliance-stats/'},
        {'GET, PUT, DELETE': '/api/alliance-stats/<uuid:pk>'},

        {'GET, POST': '/api/alliance-badges/'},
        {'GET, PUT, DELETE': '/api/alliance-badges/<uuid:pk>'},

        {'GET, POST': '/api/alliance-events/'},
        {'GET, PUT, DELETE': '/api/alliance-events/<uuid:pk>'},

        {'GET, POST': '/api/alliance-event-medias/'},
        {'GET, PUT, DELETE': '/api/alliance-event-medias/<uuid:pk>'}
        ,
        {'GET, POST': '/api/alliance-levels/'},
        {'GET, PUT, DELETE': '/api/alliance-levels/<uuid:pk>'},
        
        {'GET, POST': '/api/alliance-missions/'},
        {'GET, PUT, DELETE': '/api/alliance-missions/<uuid:pk>'},

    ]
    return Response(routes)
