from calculate_distances import calculate_distance


def build_response_data(api_data, user_location):
    response = []
    api_results = api_data.get("clouds")
    for result in api_results:
        cloud_location = (result.get("geo_latitude"), result.get("geo_longitude"))
        distance = calculate_distance(cloud_location, user_location)
        response.append(
            {
                "id": result.get("cloud_name"),
                "description": result.get("cloud_description"),
                "region": result.get("geo_region"),
                "distance": distance,
            }
        )
    return {"clouds": response}
