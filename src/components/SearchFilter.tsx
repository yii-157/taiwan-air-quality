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
}

export default function SearchFilter({
  counties,
  towns,
  statuses,
  filters,
  onFilterChange,
}: SearchFilterProps) {
  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      county: e.target.value,
      town: '', // 重置鄉鎮
    });
  };

  const handleTownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      town: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      status: e.target.value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      county: '',
      town: '',
      status: '',
    });
  };

  return (
    <div className="search-filter">
      <h2>搜尋與過濾</h2>
      
      <div className="filter-group">
        <label htmlFor="county">縣市</label>
        <select
          id="county"
          value={filters.county}
          onChange={handleCountyChange}
        >
          <option value="">全部縣市</option>
          {counties.map(county => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="town">鄉鎮市區</label>
        <select
          id="town"
          value={filters.town}
          onChange={handleTownChange}
          disabled={!filters.county}
        >
          <option value="">全部鄉鎮</option>
          {towns.map(town => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">空氣品質等級</label>
        <select
          id="status"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="">全部等級</option>
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button className="reset-btn" onClick={handleReset}>
        重置過濾
      </button>
    </div>
  );
}
