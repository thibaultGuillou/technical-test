import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

interface SensorChartProps {
  siteId: number;
}

const SensorChart = ({ siteId }: SensorChartProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/sites/sensor-data/${siteId}/`);
        if (response.data.success) {
          setData(response.data.data);
          console.log('Chatrgement des données réussi : ');
        } else {
          console.error('Erreur lors du chargement des données : ', response.data);
        }
      } catch (error) {
        console.error('Erreur réseau : ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [siteId]);

  if (loading) {
    return <p>Chargement des données...</p>;
    console.log(data)
  }

  const time = data.map((d) => d.time);
  const airTemperature = data.map((d) => d.air_temperature);
  const soilTemperature = data.map((d) => d.soil_temperature);
console.log(data)
  return (
    <Plot
      data={[
        {
          x: time,
          y: airTemperature,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'blue' },
          name: 'Température de l’air',
        },
        {
          x: time,
          y: soilTemperature,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'green' },
          name: 'Température du sol',
        },
      ]}
      layout={{
        title: `Données des capteurs pour le site ${siteId}`,
        xaxis: { title: 'Temps', type: 'date' },
        yaxis: { title: 'Température (°C)' },
      }}
    />
  );
};

export default SensorChart;
