from django.urls import path

from .views import SitesListView, SensorDataView

sites_urls = [
    path("", SitesListView.as_view(), name="sites-list"),
    path("sensor-data/<int:site_id>/", SensorDataView.as_view(), name="sensor_data"),
]


