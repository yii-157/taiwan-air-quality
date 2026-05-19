export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#A9B7AA'; // 淡綠 - 良好
  if (aqi <= 100) return '#E8E0C8'; // 淡黃 - 普通
  if (aqi <= 150) return '#E8DCC8'; // 淡米黃 - 對敏感族群不健康
  if (aqi <= 200) return '#976666'; // 淡紅 - 不健康
  if (aqi <= 300) return '#D4C8D4'; // 淡紫 - 非常不健康
  return '#C8B8C8'; // 深淡紫 - 危害
}

export function getAQILevel(aqi: number): string {
  if (aqi <= 50) return '良好';
  if (aqi <= 100) return '普通';
  if (aqi <= 150) return '對敏感族群不健康';
  if (aqi <= 200) return '不健康';
  if (aqi <= 300) return '非常不健康';
  return '危害';
}
