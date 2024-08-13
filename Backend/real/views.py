from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
import logging
logger = logging.getLogger(__name__)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """
        Handle logout by blacklisting the provided refresh token.
        """
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except KeyError:
            logger.error("Refresh token not provided in the request data.")
            return Response({"error": "Refresh token not provided."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error blacklisting refresh token: {str(e)}")
            return Response({"error": "Something went wrong while logging out."}, status=status.HTTP_400_BAD_REQUEST)
        
