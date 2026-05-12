import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { AirQualityData } from '../types';
import { getAQIColor } from '../utils/aqi';

interface MapComponentProps {
  data: AirQualityData[];
  selectedStation: AirQualityData | null;
  onStationSelect: (station: AirQualityData) => void;
}

export default function MapComponent({ data, selectedStation, onStationSelect }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      // 初始化地圖
      mapRef.current = L.map('map').setView([23.5, 120.5], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // 清除舊標記
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // 添加新標記
    data.forEach(station => {
      const color = getAQIColor(station.aqi);
      const html = `
        <div style="
          width: 30px;
          height: 30px;
          background-color: ${color};
          border: 2px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">
          ${station.aqi}
        </div>
      `;

      const icon = L.divIcon({
        html,
        iconSize: [30, 30],
        className: 'custom-marker',
      });

      const marker = L.marker([station.latitude, station.longitude], { icon })
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3>${station.sitename}</h3>
            <p><strong>縣市:</strong> ${station.county}</p>
            <p><strong>AQI:</strong> ${station.aqi}</p>
            <p><strong>等級:</strong> ${station.status}</p>
            <p><strong>PM2.5:</strong> ${station.pm2_5} μg/m³</p>
            <p><strong>PM10:</strong> ${station.pm10} μg/m³</p>
            <button onclick="window.selectStation && window.selectStation(${JSON.stringify(station).replace(/"/g, '&quot;')})">
              查看詳情
            </button>
          </div>
        `)
        .on('click', () => onStationSelect(station))
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });

    // 如果選中了某個測站，打開其 popup
    if (selectedStation) {
      const marker = markersRef.current.find(
        m => m.getLatLng().lat === selectedStation.latitude &&
             m.getLatLng().lng === selectedStation.longitude
      );
      if (marker) {
        marker.openPopup();
      }
    }
  }, [data, selectedStation, onStationSelect]);

  return (
    <div id="map" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
  );
}
