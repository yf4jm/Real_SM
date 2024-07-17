from rest_framework.decorators import api_view
from rest_framework.response import Response
@api_view(['GET'])
def getRoutes(request):

    routes = [

        {'GET/POST': '/api/posts/'},
        {'PUT/DELETE': '/api/posts/'},
        {'GET/POST': '/api/hashtags/'},
        {'PUT/DELETE': '/api/hashtags/'},
        {'GET/POST': '/api/comments/'},
        {'PUT/DELETE': '/api/comments/'},
        {'GET/POST': '/api/communities/'},
        {'PUT/DELETE': '/api/communities/'},
        {'GET/POST': '/api/badges/'},
        {'PUT/DELETE': '/api/badges/'},
        {'GET/POST': '/api/profiles/'},
        {'PUT/DELETE': '/api/profiles/'},

    ]
    return Response(routes)