from flask import Flask, request
from flask_cors import CORS
from flask_caching import Cache
from aiven_api import get_cloud_list
from formatters import build_response_data

import sys

cache = Cache(config={"CACHE_TYPE": "simple"})
app = Flask(__name__)
run_mode = app.config.get("ENV")
CORS(app)
cache.init_app(app)


@app.route("/status")
def status_page():
    return """
    <h1>Aiven Clouds back-end</h1>
    <p>Running in <strong>{mode}</strong> mode<p>
    """.format(
        mode=run_mode
    )


@app.route("/cloudlist")
@cache.cached(timeout=60)
def serve_cloud_list():
    clouds_api_data = get_cloud_list(run_mode)
    user_geolocation = (request.args.get("lat"), request.args.get("lon"))
    return_json_data = build_response_data(clouds_api_data, user_geolocation)
    return return_json_data
