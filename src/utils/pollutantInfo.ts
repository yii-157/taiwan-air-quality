export interface PollutantDetail {
  name: string;
  unit: string;
  description: string;
  healthEffects: string;
  levels: {
    level: string;
    range: string;
    color: string;
    advice: string;
  }[];
}

export const pollutantInfo: Record<string, PollutantDetail> = {
  pm2_5: {
    name: 'PM2.5（細懸浮微粒）',
    unit: 'μg/m³',
    description: '直徑小於 2.5 微米的懸浮微粒，能深入肺部和血管，是空氣污染的主要指標。',
    healthEffects: '長期暴露會導致呼吸系統疾病、心血管疾病和肺癌風險增加。',
    levels: [
      {
        level: '優秀',
        range: '0-12',
        color: '#2ecc71',
        advice: '空氣品質極佳，適合所有人戶外活動。'
      },
      {
        level: '良好',
        range: '12-35',
        color: '#3498db',
        advice: '空氣品質良好，適合戶外活動。'
      },
      {
        level: '中等',
        range: '35-55',
        color: '#f39c12',
        advice: '敏感族群應減少長時間戶外活動，一般民眾可正常活動。'
      },
      {
        level: '不良',
        range: '55-150',
        color: '#e74c3c',
        advice: '敏感族群應避免戶外活動，一般民眾應減少戶外活動。'
      },
      {
        level: '非常不良',
        range: '150+',
        color: '#8b0000',
        advice: '所有人應避免戶外活動，建議待在室內並使用空氣清淨機。'
      }
    ]
  },
  pm10: {
    name: 'PM10（粗懸浮微粒）',
    unit: 'μg/m³',
    description: '直徑小於 10 微米的懸浮微粒，主要來自塵土、花粉和工業排放。',
    healthEffects: '會刺激呼吸道，引起咳嗽、喘息和呼吸困難，特別是對兒童和老年人有害。',
    levels: [
      {
        level: '優秀',
        range: '0-30',
        color: '#2ecc71',
        advice: '空氣品質極佳，適合所有人戶外活動。'
      },
      {
        level: '良好',
        range: '30-75',
        color: '#3498db',
        advice: '空氣品質良好，適合戶外活動。'
      },
      {
        level: '中等',
        range: '75-115',
        color: '#f39c12',
        advice: '敏感族群應減少長時間戶外活動。'
      },
      {
        level: '不良',
        range: '115-250',
        color: '#e74c3c',
        advice: '敏感族群應避免戶外活動，一般民眾應減少戶外活動。'
      },
      {
        level: '非常不良',
        range: '250+',
        color: '#8b0000',
        advice: '所有人應避免戶外活動，建議待在室內。'
      }
    ]
  },
  o3: {
    name: 'O3（臭氧）',
    unit: 'ppb',
    description: '地面臭氧是由汽車尾氣和工業排放的氮氧化物在陽光下反應形成的二次污染物。',
    healthEffects: '會刺激呼吸道，引起咳嗽、喘息和肺功能下降，特別是在運動時症狀更明顯。',
    levels: [
      {
        level: '優秀',
        range: '0-40',
        color: '#2ecc71',
        advice: '臭氧濃度低，適合戶外活動。'
      },
      {
        level: '良好',
        range: '40-70',
        color: '#3498db',
        advice: '臭氧濃度適中，一般民眾可正常活動。'
      },
      {
        level: '中等',
        range: '70-100',
        color: '#f39c12',
        advice: '敏感族群應減少劇烈運動，避免長時間戶外活動。'
      },
      {
        level: '不良',
        range: '100-150',
        color: '#e74c3c',
        advice: '敏感族群應避免戶外活動，一般民眾應減少戶外活動。'
      },
      {
        level: '非常不良',
        range: '150+',
        color: '#8b0000',
        advice: '所有人應避免戶外活動，建議待在室內。'
      }
    ]
  },
  no2: {
    name: 'NO2（二氧化氮）',
    unit: 'ppb',
    description: '主要來自汽車尾氣和工業燃燒，是空氣污染的重要指標。',
    healthEffects: '會刺激呼吸道，引起咳嗽和呼吸困難，長期暴露會增加呼吸系統疾病風險。',
    levels: [
      {
        level: '優秀',
        range: '0-20',
        color: '#2ecc71',
        advice: '二氧化氮濃度低，空氣品質良好。'
      },
      {
        level: '良好',
        range: '20-50',
        color: '#3498db',
        advice: '二氧化氮濃度適中，一般民眾可正常活動。'
      },
      {
        level: '中等',
        range: '50-100',
        color: '#f39c12',
        advice: '敏感族群應減少長時間戶外活動。'
      },
      {
        level: '不良',
        range: '100-200',
        color: '#e74c3c',
        advice: '敏感族群應避免戶外活動，一般民眾應減少戶外活動。'
      },
      {
        level: '非常不良',
        range: '200+',
        color: '#8b0000',
        advice: '所有人應避免戶外活動，建議待在室內。'
      }
    ]
  },
  so2: {
    name: 'SO2（二氧化硫）',
    unit: 'ppb',
    description: '主要來自燃煤電廠和工業排放，是酸雨的主要成分。',
    healthEffects: '會刺激呼吸道和眼睛，引起咳嗽和流淚，特別是對氣喘患者有害。',
    levels: [
      {
        level: '優秀',
        range: '0-20',
        color: '#2ecc71',
        advice: '二氧化硫濃度低，空氣品質良好。'
      },
      {
        level: '良好',
        range: '20-50',
        color: '#3498db',
        advice: '二氧化硫濃度適中，一般民眾可正常活動。'
      },
      {
        level: '中等',
        range: '50-100',
        color: '#f39c12',
        advice: '敏感族群應減少長時間戶外活動。'
      },
      {
        level: '不良',
        range: '100-200',
        color: '#e74c3c',
        advice: '敏感族群應避免戶外活動，一般民眾應減少戶外活動。'
      },
      {
        level: '非常不良',
        range: '200+',
        color: '#8b0000',
        advice: '所有人應避免戶外活動，建議待在室內。'
      }
    ]
  },
  co: {
    name: 'CO（一氧化碳）',
    unit: 'ppm',
    description: '主要來自汽車尾氣和燃燒過程，是無色無味的有毒氣體。',
    healthEffects: '會與血紅蛋白結合，減少血液中的氧氣含量，導致頭暈、疲勞和心臟負擔增加。',
    levels: [
      {
        level: '優秀',
        range: '0-2',
        color: '#2ecc71',
        advice: '一氧化碳濃度低，空氣品質良好。'
      },
      {
        level: '良好',
        range: '2-5',
        color: '#3498db',
        advice: '一氧化碳濃度適中，一般民眾可正常活動。'
      },
      {
        level: '中等',
        range: '5-10',
        color: '#f39c12',
        advice: '敏感族群應減少長時間戶外活動。'
      },
      {
        level: '不良',
        range: '10-20',
        color: '#e74c3c',
        advice: '敏感族群應避免戶外活動，一般民眾應減少戶外活動。'
      },
      {
        level: '非常不良',
        range: '20+',
        color: '#8b0000',
        advice: '所有人應避免戶外活動，建議待在室內。'
      }
    ]
  }
};

export function getPollutantLevel(pollutant: string, value: number): string {
  const info = pollutantInfo[pollutant as keyof typeof pollutantInfo];
  if (!info) return '未知';

  const level = info.levels.find(l => {
    const [min, max] = l.range.split('-').map(v => parseInt(v));
    if (max === undefined) return value >= min;
    return value >= min && value <= max;
  });

  return level?.level || '非常不良';
}

export function getPollutantAdvice(pollutant: string, value: number): string {
  const info = pollutantInfo[pollutant as keyof typeof pollutantInfo];
  if (!info) return '';

  const level = info.levels.find(l => {
    const [min, max] = l.range.split('-').map(v => parseInt(v));
    if (max === undefined) return value >= min;
    return value >= min && value <= max;
  });

  return level?.advice || '所有人應避免戶外活動。';
}
