from calculate_distances import calculate_distance

awsProviderName = "Amazon Web Services"
azureProviderName = "Azure"
googleProviderName = "Google Cloud"
providerNames = [awsProviderName, azureProviderName, googleProviderName]


def parse_provider(description):
    for provider in providerNames:
        if description.find(provider) != -1:
            return provider

    return "Unknown"


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
                "region": result.get("geo_region"),
                "distance": distance,
                "provider": provider,
            }
        )
    return {"clouds": response}
