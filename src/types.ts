export interface AirQualityData {
  sitename: string;
  county: string;
  aqi: number;
  pollutant: string;
  status: string;
  so2: number;
  co: number;
  o3: number;
  o3_8hr: number;
  pm10: number;
  pm2_5: number;
  no2: number;
  nox: number;
  no: number;
  wind_speed: number;
  wind_direc: number;
  publishtime: string;
  co_8hr: number;
  pm2_5_avg: number;
  pm10_avg: number;
  so2_avg: number;
  longitude: number;
  latitude: number;
  siteid: number;
}
