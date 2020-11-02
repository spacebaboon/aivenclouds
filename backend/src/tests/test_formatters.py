import unittest
from dummy_data import api_data
from formatters import build_response_data, parse_provider


class TestJsonFormatting(unittest.TestCase):
    def test_parses_provider_from_description(self):

        self.assertEqual(
            parse_provider("Africa, South Africa - Amazon Web Services: Cape Town"),
            "Amazon Web Services",
        )

        self.assertEqual(
            parse_provider("Africa, South Africa - Azure: South Africa North"),
            "Azure",
        )

        self.assertEqual(
            parse_provider("Asia, Hong Kong - Google Cloud: Hong Kong"),
            "Google Cloud",
        )

    def test_returns_unknown_when_provider_not_recognised(self):
        self.assertEqual(
            parse_provider("Peru - Inka Cloud: Lima"),
            "Unknown",
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
                    "region": "africa",
                    "distance": 7998,
                    "provider": "Amazon Web Services",
                },
                {
                    "description": "Africa, South Africa - Azure: South Africa North",
                    "id": "azure-south-africa-north",
                    "region": "africa",
                    "distance": 7406,
                    "provider": "Azure",
                },
                {
                    "description": "Asia, Indonesia - Google Cloud: Jakarta",
                    "id": "google-asia-southeast2",
                    "region": "southeast asia",
                    "distance": 4362,
                    "provider": "Google Cloud",
                },
            ]
        }

        self.assertEqual(processed_data, expected_data)


if __name__ == "__main__":
    unittest.main()
