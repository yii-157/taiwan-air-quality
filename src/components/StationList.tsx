import type { AirQualityData } from '../types';
import { getAQIColor } from '../utils/aqi';
import './StationList.css';

interface StationListProps {
  data: AirQualityData[];
  selectedStation: AirQualityData | null;
  onStationSelect: (station: AirQualityData) => void;
}

export default function StationList({ data, selectedStation, onStationSelect }: StationListProps) {
  return (
    <div className="station-list">
      <h2>測站列表 ({data.length})</h2>
      
      {selectedStation && (
        <div className="station-detail">
          <h3>{selectedStation.sitename}</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">縣市</span>
              <span className="value">{selectedStation.county}</span>
            </div>
            <div className="detail-item">
              <span className="label">AQI</span>
              <span className="value" style={{ color: getAQIColor(selectedStation.aqi) }}>
                {selectedStation.aqi}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">等級</span>
              <span className="value">{selectedStation.status}</span>
            </div>
            {selectedStation.pollutant && (
              <div className="detail-item">
                <span className="label">主要污染物</span>
                <span className="value">{selectedStation.pollutant}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="label">PM2.5</span>
              <span className="value">{selectedStation.pm2_5} μg/m³</span>
            </div>
            <div className="detail-item">
              <span className="label">PM10</span>
              <span className="value">{selectedStation.pm10} μg/m³</span>
            </div>
            <div className="detail-item">
              <span className="label">O3</span>
              <span className="value">{selectedStation.o3} ppb</span>
            </div>
            <div className="detail-item">
              <span className="label">NO2</span>
              <span className="value">{selectedStation.no2} ppb</span>
            </div>
            <div className="detail-item">
              <span className="label">SO2</span>
              <span className="value">{selectedStation.so2} ppb</span>
            </div>
            <div className="detail-item">
              <span className="label">CO</span>
              <span className="value">{selectedStation.co} ppm</span>
            </div>
            <div className="detail-item">
              <span className="label">風速</span>
              <span className="value">{selectedStation.wind_speed} m/s</span>
            </div>
            <div className="detail-item">
              <span className="label">更新時間</span>
              <span className="value">{selectedStation.publishtime}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stations">
        {data.map(station => (
          <div
            key={station.siteid}
            className={`station-item ${selectedStation?.siteid === station.siteid ? 'active' : ''}`}
            onClick={() => onStationSelect(station)}
          >
            <div className="station-header">
              <div className="station-name">{station.sitename}</div>
              <div
                className="aqi-badge"
                style={{ backgroundColor: getAQIColor(station.aqi) }}
              >
                {station.aqi}
              </div>
            </div>
            <div className="station-info">
              <span className="county">{station.county}</span>
              <span className="status">{station.status}</span>
            </div>
            <div className="pollutants">
              <span>PM2.5: {station.pm2_5}</span>
              <span>PM10: {station.pm10}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
