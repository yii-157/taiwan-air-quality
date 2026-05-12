import { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import SearchFilter from './components/SearchFilter';
import StationList from './components/StationList';
import PollutantInfo from './components/PollutantInfo';
import MapLayerPreview from './components/MapLayerPreview';
import type { AirQualityData } from './types';
import './App.css';

export default function App() {
  const [data, setData] = useState<AirQualityData[]>([]);
  const [filteredData, setFilteredData] = useState<AirQualityData[]>([]);
  const [counties, setCounties] = useState<string[]>([]);
  const [towns, setTowns] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [selectedStation, setSelectedStation] = useState<AirQualityData | null>(null);
  const [filters, setFilters] = useState({ county: '', town: '', status: '' });
  const [showLayerPreview, setShowLayerPreview] = useState(false);
  const [selectedMapLayer, setSelectedMapLayer] = useState<any>(null);
  const [showPollutantDetail, setShowPollutantDetail] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/air_quality_data.csv');
        const text = await response.text();
        const lines = text.trim().split('\n');
        
        // 跳過標題行，從第二行開始解析
        const parsedData: AirQualityData[] = lines.slice(1).map(line => {
          const values = line.split(',');
          // 統一縣市名稱：將「台」改為「臺」
          let county = values[1]?.trim() || '';
          county = county.replace(/台/g, '臺');
          
          return {
            sitename: values[0]?.trim() || '',
            county: county,
            aqi: parseInt(values[2]) || 0,
            pollutant: values[3]?.trim() || '',
            status: values[4]?.trim() || '',
            so2: parseFloat(values[5]) || 0,
            co: parseFloat(values[6]) || 0,
            o3: parseFloat(values[7]) || 0,
            o3_8hr: parseFloat(values[8]) || 0,
            pm10: parseFloat(values[9]) || 0,
            pm2_5: parseFloat(values[10]) || 0,
            no2: parseFloat(values[11]) || 0,
            nox: parseFloat(values[12]) || 0,
            no: parseFloat(values[13]) || 0,
            wind_speed: parseFloat(values[14]) || 0,
            wind_direc: parseFloat(values[15]) || 0,
            publishtime: values[16]?.trim() || '',
            co_8hr: parseFloat(values[17]) || 0,
            pm2_5_avg: parseFloat(values[18]) || 0,
            pm10_avg: parseFloat(values[19]) || 0,
            so2_avg: parseFloat(values[20]) || 0,
            longitude: parseFloat(values[21]) || 0,
            latitude: parseFloat(values[22]) || 0,
            siteid: parseInt(values[23]) || 0,
          };
        });

        setData(parsedData);

        // 提取唯一的縣市、鄉鎮、空氣品質等級
        // 縣市排序：北到南（按緯度排序），先本島後外島
        const countyOrder = [
          // 本島（北到南）
          '基隆市',
          '臺北市',
          '新北市',
          '宜蘭縣',
          '桃園市',
          '新竹市',
          '新竹縣',
          '苗栗縣',
          '臺中市',
          '彰化縣',
          '南投縣',
          '雲林縣',
          '嘉義市',
          '嘉義縣',
          '臺南市',
          '高雄市',
          '屏東縣',
          '花蓮縣',
          '臺東縣',
          // 外島
          '澎湖縣',
          '金門縣',
          '連江縣',
        ];
        
        const uniqueCounties = [...new Set(parsedData.map(d => d.county))]
          .filter(c => c && c !== 'country')
          .sort((a, b) => {
            const aIndex = countyOrder.indexOf(a);
            const bIndex = countyOrder.indexOf(b);
            if (aIndex === -1 && bIndex === -1) return a.localeCompare(b, 'zh');
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
          });
        
        const uniqueStatuses = [...new Set(parsedData.map(d => d.status))].filter(s => s).sort();
        setCounties(uniqueCounties);
        setStatuses(uniqueStatuses);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // 更新鄉鎮列表（基於選定的縣市）
  useEffect(() => {
    if (filters.county) {
      const uniqueTowns = [...new Set(
        data
          .filter(d => d.county === filters.county)
          .map(d => d.sitename)
      )].sort();
      setTowns(uniqueTowns);
    } else {
      setTowns([]);
    }
  }, [filters.county, data]);

  // 過濾資料
  useEffect(() => {
    let filtered = data;

    if (filters.county) {
      filtered = filtered.filter(d => d.county === filters.county);
    }

    if (filters.town) {
      filtered = filtered.filter(d => d.sitename === filters.town);
    }

    if (filters.status) {
      filtered = filtered.filter(d => d.status === filters.status);
    }

    setFilteredData(filtered);
  }, [data, filters]);

  // 如果顯示污染物詳細頁面
  if (showPollutantDetail && selectedStation) {
    return (
      <div className="app">
        <header className="header">
          <button
            onClick={() => setShowPollutantDetail(false)}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '8px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#667eea',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            ← 返回
          </button>
          <h1>台灣空氣品質互動地圖</h1>
          <p>即時空氣品質監測資訊</p>
        </header>
        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          <PollutantInfo selectedStation={selectedStation} />
        </div>
      </div>
    );
  }

  // 如果顯示地圖圖層預覽
  if (showLayerPreview) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowLayerPreview(false)}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 1000,
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          ← 返回應用
        </button>
        <MapLayerPreview
          onSelect={(layer) => {
            setSelectedMapLayer(layer);
            setShowLayerPreview(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>台灣空氣品質互動地圖</h1>
        <p>即時空氣品質監測資訊</p>
        <button
          onClick={() => setShowLayerPreview(true)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#6366f1',
            border: '2px solid #6366f1',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          🗺️ 地圖圖層
        </button>
      </header>

      <div className="container">
        <div className="map-section">
          <MapComponent 
            data={filteredData} 
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
            selectedMapLayer={selectedMapLayer}
          />
        </div>

        <div className="control-section">
          <SearchFilter
            counties={counties}
            towns={towns}
            statuses={statuses}
            filters={filters}
            onFilterChange={setFilters}
            onSearch={() => {
              if (filteredData.length > 0) {
                const lats = filteredData.map(d => d.latitude);
                const lons = filteredData.map(d => d.longitude);
                const minLat = Math.min(...lats);
                const maxLat = Math.max(...lats);
                const minLon = Math.min(...lons);
                const maxLon = Math.max(...lons);
                window.dispatchEvent(new CustomEvent('fitBounds', {
                  detail: { bounds: [[minLat, minLon], [maxLat, maxLon]] }
                }));
              }
            }}
          />

          <StationList
            data={filteredData}
            selectedStation={selectedStation}
            onShowPollutantDetail={(station) => {
              setSelectedStation(station);
              setShowPollutantDetail(true);
            }}
          />


        </div>
      </div>
    </div>
  );
}
