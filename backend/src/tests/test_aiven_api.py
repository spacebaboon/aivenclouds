import responses
import test_data
from aiven_api import get_cloud_list


@responses.activate
def test_fetches_api_data():
    responses.add(
        responses.GET,
        "https://api.aiven.io/v1/clouds",
        json=test_data.clouds,
        status=200,
    )

    get_cloud_list()

    assert len(responses.calls) == 1


if __name__ == "__main__":
    test_fetches_api_data()