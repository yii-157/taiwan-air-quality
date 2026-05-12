import { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import SearchFilter from './components/SearchFilter';
import StationList from './components/StationList';
import type { AirQualityData } from './types';

function App() {
  const [data, setData] = useState<AirQualityData[]>([]);
  const [filteredData, setFilteredData] = useState<AirQualityData[]>([]);
  const [selectedStation, setSelectedStation] = useState<AirQualityData | null>(null);
  const [filters, setFilters] = useState({
    county: '',
    town: '',
    status: '',
  });
  const [counties, setCounties] = useState<string[]>([]);
  const [towns, setTowns] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  // 載入 CSV 資料
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/air_quality_data.csv');
        const text = await response.text();
        const lines = text.trim().split('\n');
        
        const parsedData: AirQualityData[] = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            sitename: values[0]?.trim() || '',
            county: values[1]?.trim() || '',
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
        setFilteredData(parsedData);

        // 提取唯一的縣市、鄉鎮、空氣品質等級
        const uniqueCounties = [...new Set(parsedData.map(d => d.county))].sort();
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
      const uniqueTowns = [
        ...new Set(
          data
            .filter(d => d.county === filters.county)
            .map(d => d.sitename)
        ),
      ].sort();
      setTowns(uniqueTowns);
    } else {
      setTowns([]);
    }
  }, [filters.county, data]);

  // 應用過濾條件
  useEffect(() => {
    let result = data;

    if (filters.county) {
      result = result.filter(d => d.county === filters.county);
    }

    if (filters.town) {
      result = result.filter(d => d.sitename === filters.town);
    }

    if (filters.status) {
      result = result.filter(d => d.status === filters.status);
    }

    setFilteredData(result);
  }, [filters, data]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>台灣空氣品質互動地圖</h1>
        <p>即時空氣品質監測資訊</p>
      </header>

      <div className="container">
        <div className="map-section">
          <MapComponent 
            data={filteredData} 
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
          />
        </div>

        <div className="control-section">
          <SearchFilter
            counties={counties}
            towns={towns}
            statuses={statuses}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <StationList
            data={filteredData}
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
