from app.sites.models import Site
from app.sites.serializers import ListSitesSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from influxdb_client import InfluxDBClient

# Create your views here.
class SitesListView(generics.ListAPIView):
    model = Site
    queryset = Site.objects.all()
    serializer_class = ListSitesSerializer

    @extend_schema(
        operation_id="List Species",
        responses={
            200: ListSitesSerializer,
        },
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class SensorDataView(APIView):
    """
    Récupère les données des capteurs pour un site spécifique.
    """

    def get(self, request, site_id):
        bucket = "sensors"
        client = InfluxDBClient(
            url=settings.INFLUXDB_URL,
            token=settings.INFLUXDB_TOKEN,
            org=settings.INFLUXDB_ORG
        )

        query = f'''
            from(bucket: "{bucket}")
              |> range(start: -7d)  // Dernières 7 jours
              |> filter(fn: (r) => r["site_id"] == "{site_id}" and r._measurement == "temperature")
        '''

        try:
            tables = client.query_api().query(query)
            
            data = []
            for table in tables:
                for record in table.records:
                    data.append({
                        "time": record.get_time(),
                        "position": record.values.get("position"),
                        "air_temperature": record.values.get("air_temperature"),
                        "soil_temperature": record.values.get("soil_temperature"),
                    })

            return Response({"success": True, "data": data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
