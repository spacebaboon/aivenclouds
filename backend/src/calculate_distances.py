from geopy import distance


def calculate_distance(user_location, cloud_location):

    if user_location is None:
        return None

    return int(distance.distance(user_location, cloud_location).km)