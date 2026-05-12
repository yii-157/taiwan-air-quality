import { useState } from 'react';
import { pollutantInfo, getPollutantLevel, getPollutantAdvice } from '../utils/pollutantInfo';
import type { AirQualityData } from '../types';
import './PollutantInfo.css';

interface PollutantInfoProps {
  selectedStation: AirQualityData | null;
}

export default function PollutantInfo({ selectedStation }: PollutantInfoProps) {
  const [expandedPollutant, setExpandedPollutant] = useState<string | null>(null);

  if (!selectedStation) {
    return (
      <div className="pollutant-info-container">
        <div className="pollutant-info-placeholder">
          <p>👆 請選擇一個測站以查看詳細的污染物信息</p>
        </div>
      </div>
    );
  }

  const pollutants = [
    { key: 'pm2_5', value: selectedStation.pm2_5 },
    { key: 'pm10', value: selectedStation.pm10 },
    { key: 'o3', value: selectedStation.o3 },
    { key: 'no2', value: selectedStation.no2 },
    { key: 'so2', value: selectedStation.so2 },
    { key: 'co', value: selectedStation.co },
  ];

  return (
    <div className="pollutant-info-container">
      <div className="pollutant-info-header">
        <h3>📊 污染物詳細信息</h3>
        <p className="pollutant-info-station">{selectedStation.sitename} - {selectedStation.county}</p>
      </div>

      <div className="pollutant-list">
        {pollutants.map(({ key, value }) => {
          const info = pollutantInfo[key as keyof typeof pollutantInfo];
          if (!info) return null;

          const level = getPollutantLevel(key, value);
          const advice = getPollutantAdvice(key, value);
          const levelInfo = info.levels.find(l => l.level === level);
          const isExpanded = expandedPollutant === key;

          return (
            <div key={key} className="pollutant-card">
              <div
                className="pollutant-card-header"
                onClick={() => setExpandedPollutant(isExpanded ? null : key)}
              >
                <div className="pollutant-card-title">
                  <span className="pollutant-name">{info.name}</span>
                  <span className="pollutant-value">
                    {value} {info.unit}
                  </span>
                </div>
                <div className="pollutant-card-level">
                  <span
                    className="pollutant-level-badge"
                    style={{ backgroundColor: levelInfo?.color }}
                  >
                    {level}
                  </span>
                  <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="pollutant-card-details">
                  <div className="detail-section">
                    <h5>📝 污染物說明</h5>
                    <p>{info.description}</p>
                  </div>

                  <div className="detail-section">
                    <h5>⚠️ 健康影響</h5>
                    <p>{info.healthEffects}</p>
                  </div>

                  <div className="detail-section">
                    <h5>🏥 當前狀況</h5>
                    <div className="current-status">
                      <p>
                        <strong>當前數值：</strong> {value} {info.unit}
                      </p>
                      <p>
                        <strong>等級範圍：</strong> {levelInfo?.range} {info.unit}
                      </p>
                      <p style={{ color: levelInfo?.color, fontWeight: 'bold' }}>
                        ● {level}
                      </p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h5>💡 出門建議</h5>
                    <div className="advice-box" style={{ borderLeftColor: levelInfo?.color }}>
                      <p>{advice}</p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h5>📈 污染程度參考</h5>
                    <div className="levels-reference">
                      {info.levels.map((l, idx) => (
                        <div key={idx} className="level-item">
                          <span
                            className="level-color"
                            style={{ backgroundColor: l.color }}
                          />
                          <div className="level-text">
                            <strong>{l.level}</strong>
                            <span>{l.range} {info.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pollutant-info-footer">
        <p>💬 提示：點擊污染物卡片可查看詳細信息</p>
      </div>
    </div>
  );
}
