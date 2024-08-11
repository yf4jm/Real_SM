from rest_framework.decorators import api_view
from rest_framework.response import Response
@api_view(['GET'])
def getRoutes(request):

    routes = [

        {'GET':'/users/'},
        {'GET':'/posts/'},
        {'GET':'/alliances/'},
        {'GET':'/comments/'},
        {'GET':'/communities/'},
        {'GET':'/cosmetics/'},



    ]
    return Response(routes)