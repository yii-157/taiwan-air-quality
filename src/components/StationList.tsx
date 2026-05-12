import { useState } from 'react';
import type { AirQualityData } from '../types';
import { getAQIColor } from '../utils/aqi';
import './StationList.css';

interface StationListProps {
  data: AirQualityData[];
  selectedStation: AirQualityData | null;
  onShowPollutantDetail: (station: AirQualityData) => void;
}

export default function StationList({ data, onShowPollutantDetail }: StationListProps) {
  const [expandedStations, setExpandedStations] = useState<Set<string>>(new Set());

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return '✅ 良好';
    if (aqi <= 100) return '⚠️ 普通';
    if (aqi <= 150) return '⚠️ 對敏感族群不健康';
    if (aqi <= 200) return '🔴 不健康';
    if (aqi <= 300) return '🔴 非常不健康';
    return '🔴 危害';
  };

  const getHealthAdvice = (aqi: number) => {
    if (aqi <= 50) return '空氣品質良好，適合戶外活動。';
    if (aqi <= 100) return '空氣品質普通，敏感族群應減少戶外活動。';
    if (aqi <= 150) return '對敏感族群不健康，敏感族群應避免戶外活動。';
    if (aqi <= 200) return '空氣品質不健康，所有人應減少戶外活動。';
    if (aqi <= 300) return '空氣品質非常不健康，所有人應避免戶外活動。';
    return '空氣品質危害，所有人應留在室內。';
  };

  const toggleExpanded = (siteid: number) => {
    const newExpanded = new Set(expandedStations);
    const siteIdStr = String(siteid);
    if (newExpanded.has(siteIdStr)) {
      newExpanded.delete(siteIdStr);
    } else {
      newExpanded.add(siteIdStr);
    }
    setExpandedStations(newExpanded);
  };

  return (
    <div className="station-list">
      <h2>📍 測站列表 ({data.length})</h2>
      
      <div className="stations">
        {data.length === 0 ? (
          <div className="no-data">
            <p>沒有符合條件的測站</p>
          </div>
        ) : (
          <>
            {data.map(station => {
              const isExpanded = expandedStations.has(String(station.siteid));
              return (
                <div
                  key={station.siteid}
                  className={`station-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div 
                    className="station-header"
                    onClick={() => toggleExpanded(Number(station.siteid))}
                  >
                    <div className="station-name">{station.sitename}</div>
                    <div
                      className="aqi-badge"
                      style={{ backgroundColor: getAQIColor(station.aqi) }}
                      title={`AQI: ${station.aqi}`}
                    >
                      {station.aqi}
                    </div>
                    <div className="expand-icon">{isExpanded ? '▼' : '▶'}</div>
                  </div>

                  {isExpanded && (
                    <div className="station-expanded-content">
                      <div className="station-info">
                        <span className="county">{station.county}</span>
                        <span className="status">{getAQIStatus(station.aqi)}</span>
                      </div>
                      <div className="health-advice">{getHealthAdvice(station.aqi)}</div>
                      
                      <button 
                        className="detail-button"
                        onClick={() => onShowPollutantDetail(station)}
                      >
                        📊 查看詳細污染物信息
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
