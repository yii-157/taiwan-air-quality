import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAP_LAYERS_PREVIEW = [
  {
    id: 'carto_light',
    name: 'Carto Positron（清晰）',
    url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    labelUrl: 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
    description: '淺色背景，清晰易讀，適合白天使用',
  },
  {
    id: 'carto_dark',
    name: 'Carto Voyager（彩色）',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
    labelUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
    description: '彩色地圖，顯示更多地理信息',
  },
  {
    id: 'osm',
    name: 'OpenStreetMap（標準）',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    labelUrl: '',
    description: '開源地圖，社區維護，中文支持',
  },

  {
    id: 'esri_worldimagery',
    name: 'ESRI World Imagery（衛星）',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    labelUrl: '',
    description: '衛星影像，顯示真實地表',
  },
  {
    id: 'carto_positron_dark',
    name: 'Carto Positron Dark（深色）',
    url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    labelUrl: 'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
    description: '深色背景，適合夜間使用',
  },
];

interface MapPreviewProps {
  onSelect: (layer: typeof MAP_LAYERS_PREVIEW[0]) => void;
}

export default function MapLayerPreview({ onSelect }: MapPreviewProps) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        選擇您喜歡的地圖圖層
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {MAP_LAYERS_PREVIEW.map(layer => (
          <MapPreviewCard key={layer.id} layer={layer} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function MapPreviewCard({ layer, onSelect }: { layer: typeof MAP_LAYERS_PREVIEW[0]; onSelect: (layer: typeof MAP_LAYERS_PREVIEW[0]) => void }) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([23.5, 120.5], 7);

    // 添加基礎圖層
    L.tileLayer(layer.url, {
      attribution: '',
      maxZoom: 19,
      minZoom: 7,
      crossOrigin: 'anonymous',
    }).addTo(mapRef.current);

    // 添加標籤圖層（如果有）
    if (layer.labelUrl) {
      L.tileLayer(layer.labelUrl, {
        attribution: '',
        maxZoom: 19,
        minZoom: 7,
        crossOrigin: 'anonymous',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [layer]);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '250px',
          backgroundColor: '#e0e0e0',
        }}
      />
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
          {layer.name}
        </h3>
        <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
          {layer.description}
        </p>
        <button
          onClick={() => onSelect(layer)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#4f46e5';
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#6366f1';
          }}
        >
          選擇此地圖
        </button>
      </div>
    </div>
  );
}
