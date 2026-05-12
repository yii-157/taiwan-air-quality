import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { AirQualityData } from '../types';
import { getAQIColor } from '../utils/aqi';

interface MapComponentProps {
  data: AirQualityData[];
  selectedStation: AirQualityData | null;
  onStationSelect: (station: AirQualityData) => void;
  selectedMapLayer?: any;
}

export default function MapComponent({ data, selectedStation, onStationSelect, selectedMapLayer }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<{ base: L.TileLayer | null; label: L.TileLayer | null }>({ base: null, label: null });

  // 初始化地圖
  useEffect(() => {
    if (!containerRef.current) return;

    if (!mapRef.current) {
      // 初始化地圖
      mapRef.current = L.map(containerRef.current, {
        preferCanvas: false,
        zoomControl: true,
        attributionControl: false,
      }).setView([23.5, 120.5], 8);

      // 添加默認圖層（OpenStreetMap）
      const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 19,
        minZoom: 7,
        crossOrigin: 'anonymous',
      }).addTo(mapRef.current);

      const labelLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 19,
        minZoom: 7,
        crossOrigin: 'anonymous',
      }).addTo(mapRef.current);

      layersRef.current.base = baseLayer;
      layersRef.current.label = labelLayer;
    }
  }, []);

  // 處理地圖圖層選擇
  useEffect(() => {
    if (!selectedMapLayer || !mapRef.current) return;

    // 移除舊圖層
    if (layersRef.current.base && mapRef.current) {
      mapRef.current.removeLayer(layersRef.current.base);
    }
    if (layersRef.current.label && mapRef.current) {
      mapRef.current.removeLayer(layersRef.current.label);
    }

    // 添加新圖層
    const baseLayer = L.tileLayer(selectedMapLayer.url, {
      attribution: '',
      maxZoom: 19,
      minZoom: 7,
      crossOrigin: 'anonymous',
    }).addTo(mapRef.current);

    layersRef.current.base = baseLayer;

    // 如果有標籤圖層，添加標籤圖層
    if (selectedMapLayer.labelUrl) {
      const labelLayer = L.tileLayer(selectedMapLayer.labelUrl, {
        attribution: '',
        maxZoom: 19,
        minZoom: 7,
        crossOrigin: 'anonymous',
      }).addTo(mapRef.current);

      layersRef.current.label = labelLayer;
    } else {
      layersRef.current.label = null;
    }
  }, [selectedMapLayer]);

  // 監聽搜尋事件並縮放地圖
  useEffect(() => {
    const handleFitBounds = (event: any) => {
      if (!mapRef.current) return;
      const { bounds } = event.detail;
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    };

    window.addEventListener('fitBounds', handleFitBounds);
    return () => window.removeEventListener('fitBounds', handleFitBounds);
  }, []);

  // 更新標記
  useEffect(() => {
    if (!mapRef.current) return;

    // 清除舊標記
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // 添加新標記
    data.forEach(station => {
      const color = getAQIColor(station.aqi);
      
      // 使用 SVG 圖標，添加黑邊效果到數字
      const svgIcon = `
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <!-- 外圓背景 -->
          <circle cx="24" cy="24" r="20" fill="${color}" stroke="white" stroke-width="3"/>
          <!-- 黑邊文字效果 -->
          <text x="24" y="32" font-size="18" font-weight="bold" fill="black" text-anchor="middle" font-family="Arial, sans-serif" stroke="black" stroke-width="2" stroke-linejoin="round">
            ${station.aqi}
          </text>
          <!-- 白色文字 -->
          <text x="24" y="32" font-size="18" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial, sans-serif">
            ${station.aqi}
          </text>
        </svg>
      `;

      const icon = L.divIcon({
        html: svgIcon,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
        className: 'custom-marker',
      });

      const marker = L.marker([station.latitude, station.longitude], { 
        icon,
      });

      marker.on('click', () => {
        onStationSelect(station);
        if (mapRef.current) {
          mapRef.current.setView([station.latitude, station.longitude], 10);
        }
      });

      if (mapRef.current) {
        marker.addTo(mapRef.current);
        markersRef.current.push(marker);
      }
    });

    // 如果有選中的測站，縮放到該位置
    if (selectedStation && mapRef.current) {
      mapRef.current.setView([selectedStation.latitude, selectedStation.longitude], 10);
    }
  }, [data, selectedStation, onStationSelect]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );
}
