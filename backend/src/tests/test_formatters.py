import unittest
from tests.dummy_data import api_data
from formatters import build_response_data


class TestJsonFormatting(unittest.TestCase):

    def test_capitalises_region_names(self):
        processed_data = build_response_data(api_data, (0, 0))

        self.assertEqual(processed_data.get("clouds")[0].get("region"), "Africa")
        self.assertEqual(processed_data.get("clouds")[1].get("region"), "Africa")
        self.assertEqual(
            processed_data.get("clouds")[2].get("region"), "Southeast Asia"
        )

    def test_returns_cloud_json_with_distance(self):
        self.maxDiff = None

        user_location = (37.3891, 5.9845)
        processed_data = build_response_data(api_data, user_location)
        expected_data = {
            "clouds": [
                {
                    "description": "Africa, South Africa - Amazon Web Services: Cape Town",
                    "id": "aws-af-south-1",
                    "region": "Africa",
                    "distance": 7998,
                    "provider": "Amazon Web Services",
                },
                {
                    "description": "Africa, South Africa - Azure: South Africa North",
                    "id": "azure-south-africa-north",
                    "region": "Africa",
                    "distance": 7406,
                    "provider": "Azure",
                },
                {
                    "description": "Asia, Indonesia - Google Cloud: Jakarta",
                    "id": "google-asia-southeast2",
                    "region": "Southeast Asia",
                    "distance": 4362,
                    "provider": "Google Cloud",
                },
            ]
        }

        self.assertEqual(processed_data, expected_data)


if __name__ == "__main__":
    unittest.main()
