from rest_framework.metadata import BaseMetadata
from users.models import Profile
class CustomMetadata(BaseMetadata):
    def __init__(self, profile_id=None):
        self.profile_id = profile_id

    def determine_metadata(self, request, view):
    # Check for OPTIONS request and return basic metadata
        if request.method == 'OPTIONS':
            return {
                'name': 'Profile Posts',
                'description': 'Fetch all posts created by a specific user',
                'keywords': [],
            }

        # For other requests (GET), fetch metadata based on profile_id
        try:
            profile = Profile.objects.get(id=self.profile_id)
            name = profile.username
            description = f"Posts created by {profile.username}"
        except Profile.DoesNotExist:
            name = "Unknown User"
            description = "No profile found"
        
        return {
            'name': name,
            'description': description,
            'keywords': [],
        }


