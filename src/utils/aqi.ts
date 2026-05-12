export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#00E400'; // 綠色 - 良好
  if (aqi <= 100) return '#FFFF00'; // 黃色 - 普通
  if (aqi <= 150) return '#FF7E00'; // 橙色 - 對敏感族群不健康
  if (aqi <= 200) return '#FF0000'; // 紅色 - 不健康
  if (aqi <= 300) return '#8F3F97'; // 紫色 - 非常不健康
  return '#7E0023'; // 深紅色 - 危害
}

export function getAQILevel(aqi: number): string {
  if (aqi <= 50) return '良好';
  if (aqi <= 100) return '普通';
  if (aqi <= 150) return '對敏感族群不健康';
  if (aqi <= 200) return '不健康';
  if (aqi <= 300) return '非常不健康';
  return '危害';
}
