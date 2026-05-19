export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#B8C4B0'; // 淡綠 - 良好
  if (aqi <= 100) return '#E8D9B9'; // 淡黃 - 普通
  if (aqi <= 150) return '#A29988'; // 淡棒色 - 對敏感族群不健康
  if (aqi <= 200) return '#D4B9B9'; // 淡紅 - 不健康
  if (aqi <= 300) return '#C2B2C2'; // 淡紫 - 非常不健康
  return '#7a7281'; // 深淡紫 - 危害
}

export function getAQILevel(aqi: number): string {
  if (aqi <= 50) return '良好';
  if (aqi <= 100) return '普通';
  if (aqi <= 150) return '對敏感族群不健康';
  if (aqi <= 200) return '不健康';
  if (aqi <= 300) return '非常不健康';
  return '危害';
}
