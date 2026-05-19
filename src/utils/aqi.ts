export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#7A9B7A'; // 柿光灰 - 良好
  if (aqi <= 100) return '#D4B896'; // 亮曦黃金 - 普通
  if (aqi <= 150) return '#C89B7B'; // 古德溫紅(淺) - 對敏感族群不健康
  if (aqi <= 200) return '#A85C5C'; // 古德溫紅 - 不健康
  if (aqi <= 300) return '#8B6B7D'; // 銀夜紫 - 非常不健康
  return '#6B4C5C'; // 太平洋紫 - 危害
}

export function getAQILevel(aqi: number): string {
  if (aqi <= 50) return '良好';
  if (aqi <= 100) return '普通';
  if (aqi <= 150) return '對敏感族群不健康';
  if (aqi <= 200) return '不健康';
  if (aqi <= 300) return '非常不健康';
  return '危害';
}
