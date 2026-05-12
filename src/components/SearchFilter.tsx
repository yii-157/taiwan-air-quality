import { useState } from 'react';
import './SearchFilter.css';

interface SearchFilterProps {
  counties: string[];
  towns: string[];
  statuses: string[];
  filters: {
    county: string;
    town: string;
    status: string;
  };
  onFilterChange: (filters: { county: string; town: string; status: string }) => void;
  onSearch: (filters: { county: string; town: string; status: string }) => void;
}

export default function SearchFilter({
  counties,
  towns,
  statuses,
  filters,
  onFilterChange,
  onSearch,
}: SearchFilterProps) {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...tempFilters,
      county: e.target.value,
      town: '', // 重置鄉鎮選擇
    };
    setTempFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...tempFilters,
      town: e.target.value,
    };
    setTempFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...tempFilters,
      status: e.target.value,
    };
    setTempFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    onSearch(tempFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      county: '',
      town: '',
      status: '',
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
    onSearch(resetFilters);
  };

  return (
    <div className="search-filter">
      <h2>🔍 搜尋與過濾</h2>

      <div className="filter-group">
        <label htmlFor="county">📍 縣市</label>
        <select
          id="county"
          value={tempFilters.county}
          onChange={handleCountyChange}
        >
          <option value="">全部縣市 ({counties.length})</option>
          {counties.map(county => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="town">🏘️ 鄉鎮市區</label>
        <select
          id="town"
          value={tempFilters.town}
          onChange={handleTownChange}
          disabled={!tempFilters.county}
        >
          <option value="">
            {tempFilters.county ? `全部鄉鎮 (${towns.length})` : '請先選擇縣市'}
          </option>
          {towns.map(town => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">📊 空氣品質等級</label>
        <select
          id="status"
          value={tempFilters.status}
          onChange={handleStatusChange}
        >
          <option value="">全部等級 ({statuses.length})</option>
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="button-group">
        <button className="search-btn" onClick={handleSearch}>
          🔍 確認搜尋
        </button>
        <button className="reset-btn" onClick={handleReset}>
          ↺ 重置
        </button>
      </div>

      <div className="filter-stats">
        {tempFilters.county && (
          <div className="stat-item">
            <span className="stat-label">已選縣市：</span>
            <span className="stat-value">{tempFilters.county}</span>
          </div>
        )}
        {tempFilters.town && (
          <div className="stat-item">
            <span className="stat-label">已選鄉鎮：</span>
            <span className="stat-value">{tempFilters.town}</span>
          </div>
        )}
        {tempFilters.status && (
          <div className="stat-item">
            <span className="stat-label">已選等級：</span>
            <span className="stat-value">{tempFilters.status}</span>
          </div>
        )}
      </div>
    </div>
  );
}
