from calculate_distances import calculate_distance
from provider_names import parse_provider


def build_response_data(api_data, user_location):
    response = []
    api_results = api_data.get("clouds")
    for result in api_results:
        cloud_location = (result.get("geo_latitude"), result.get("geo_longitude"))
        distance = calculate_distance(cloud_location, user_location)
        provider = parse_provider(result.get("cloud_description"))
        response.append(
            {
                "id": result.get("cloud_name"),
                "description": result.get("cloud_description"),
                "region": result.get("geo_region").title(),
                "distance": distance,
                "provider": provider,
            }
        )
    return {"clouds": response}
