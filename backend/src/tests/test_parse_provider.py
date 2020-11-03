import unittest
from provider_names import parse_provider


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

        self.assertEqual(
            parse_provider("Asia, India - DigitalOcean: Bangalore"),
            "DigitalOcean",
        )

        self.assertEqual(
            parse_provider("Europe, Finland - UpCloud: Helsinki"),
            "UpCloud",
        )

    def test_returns_unknown_when_provider_not_recognised(self):
        self.assertEqual(
            parse_provider("Peru - Inka Cloud: Lima"),
            "Unknown",
        )


if __name__ == "__main__":
    unittest.main()
