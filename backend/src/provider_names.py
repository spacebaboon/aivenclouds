__providerNames = [
    "Amazon Web Services",
    "Azure",
    "Google Cloud",
    "DigitalOcean",
    "UpCloud",
]


def parse_provider(description):
    for provider in __providerNames:
        if description.find(provider) != -1:
            return provider

    return "Unknown"
