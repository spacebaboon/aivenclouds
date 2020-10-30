import requests
from tests.dummy_data import full_api_data


def get_cloud_list(run_mode):

    if run_mode == "development":
        print("Development mode. Sending dummy data.")
        return full_api_data

    print("production mode. sending real API data.")
    response = requests.get("https://api.aiven.io/v1/clouds")
    return response.json()
