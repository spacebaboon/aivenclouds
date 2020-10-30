import unittest
from dummy_data import api_data
from formatters import build_response_data


class TestJsonFormatting(unittest.TestCase):
    def test_returns_cloud_json_with_distance(self):
        self.maxDiff = None

        user_location = (37.3891, 5.9845)
        processed_data = build_response_data(api_data, user_location)
        expected_data = {
            "clouds": [
                {
                    "description": "Africa, South Africa - Amazon Web Services: Cape Town",
                    "id": "aws-af-south-1",
                    "region": "africa",
                    "distance": 7998,
                },
                {
                    "description": "Africa, South Africa - Azure: South Africa North",
                    "id": "azure-south-africa-north",
                    "region": "africa",
                    "distance": 7406,
                },
                {
                    "description": "Asia, Bahrain - Amazon Web Services: Bahrain",
                    "id": "aws-me-south-1",
                    "region": "south asia",
                    "distance": 4362,
                },
            ]
        }
        self.assertEqual(processed_data, expected_data)


if __name__ == "__main__":
    unittest.main()
