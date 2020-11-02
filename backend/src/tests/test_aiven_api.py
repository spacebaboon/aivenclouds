import unittest
import responses
from dummy_data import api_data
from aiven_api import get_cloud_list


class TestJsonFormatting(unittest.TestCase):
    @responses.activate
    def test_fetches_api_data(self):
        responses.add(
            responses.GET,
            "https://api.aiven.io/v1/clouds",
            json=api_data.get("clouds"),
            status=200,
        )

        get_cloud_list("production")

        self.assertEqual(len(responses.calls), 1)

    @responses.activate
    def test_returns_dummy_data_in_development_mode(self):
        responses.add(
            responses.GET,
            "https://api.aiven.io/v1/clouds",
            json=api_data.get("clouds"),
            status=200,
        )

        get_cloud_list("development")

        self.assertEqual(len(responses.calls), 0)


if __name__ == "__main__":
    unittest.main()
