import unittest
from calculate_distances import calculate_distance

class TestDistanceCalculations(unittest.TestCase):
    def test_calculates_distance_from_one_cloud(self):
        user_location = (52.52, 13.40)
        cloud_location = (-33.92, 18.42)
        distance = calculate_distance(user_location, cloud_location)
        self.assertEqual(distance, 9588)

    def test_returns_null_when_user_location_unknown(self):
        user_location = None
        cloud_location = (34.05, 118.24)
        distance = calculate_distance(user_location, cloud_location)
        self.assertEqual(distance, None)


if __name__ == "__main__":
    unittest.main()