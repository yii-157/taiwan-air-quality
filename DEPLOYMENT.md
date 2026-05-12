# 台灣空氣品質互動地圖 - 部署指南

## 專案概述

這是一個互動式網頁應用，展示台灣各地的即時空氣品質監測資訊。使用者可以通過地圖視覺化和多維度搜尋過濾功能探索各測站的 AQI 數據。

## 功能特性

- **互動式地圖**：在台灣地圖上標記所有空氣品質監測站
- **AQI 視覺化**：根據 AQI 等級用不同顏色標示測站
- **多維度搜尋**：按縣市、鄉鎮市區、空氣品質等級篩選
- **詳細資訊展示**：查看各污染物濃度（PM2.5、PM10、O3、NO2 等）
- **響應式設計**：支援桌面和移動設備

## 技術棧

- **前端框架**：React 18 + TypeScript
- **構建工具**：Vite
- **地圖庫**：Leaflet
- **樣式**：CSS3 + 響應式設計
- **資料格式**：CSV

## 本地開發

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```

開發伺服器將在 `http://localhost:5173` 啟動。

### 構建生產版本
```bash
npm run build
```

構建輸出將在 `dist` 目錄中。

## 部署到 Netlify

### 方法 1：使用 Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy
```

### 方法 2：連接 GitHub 倉庫

1. 將專案推送到 GitHub
2. 登入 [Netlify](https://netlify.com)
3. 點擊 "New site from Git"
4. 選擇 GitHub 倉庫
5. 配置構建設定：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 部署

## 部署到 Vercel

### 方法 1：使用 Vercel CLI

```bash
npm install -g vercel
vercel
```

### 方法 2：連接 GitHub 倉庫

1. 將專案推送到 GitHub
2. 登入 [Vercel](https://vercel.com)
3. 點擊 "New Project"
4. 導入 GitHub 倉庫
5. Vercel 將自動偵測 Next.js/Vite 設定
6. 部署

## 部署到其他平台

### GitHub Pages

```bash
npm run build
# 將 dist 目錄的內容推送到 gh-pages 分支
```

### AWS S3 + CloudFront

```bash
npm run build
# 上傳 dist 目錄到 S3
# 配置 CloudFront 分發
```

### 自託管（Docker）

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 環境變數

目前應用不需要環境變數。如果將來需要連接 API，可在 `.env` 檔案中配置：

```
VITE_API_URL=https://your-api-endpoint.com
```

## 資料來源

空氣品質資料來自 `public/air_quality_data.csv`。若要更新資料：

1. 替換 `public/air_quality_data.csv` 檔案
2. 重新構建並部署

## 常見問題

### Q: 地圖不顯示怎麼辦？
A: 確保 Leaflet 資源已正確載入。檢查瀏覽器控制台是否有錯誤訊息。

### Q: CSV 資料無法載入？
A: 確保 `air_quality_data.csv` 檔案在 `public` 目錄中，並且已包含在構建輸出中。

### Q: 如何自訂網站標題和描述？
A: 編輯 `index.html` 檔案中的 `<title>` 和 `<meta>` 標籤。

## 效能優化

- 使用 Vite 的代碼分割功能
- 啟用 gzip 壓縮
- 使用 CDN 加速靜態資源
- 優化圖片和資源大小

## 支援

如有問題，請檢查：
- 瀏覽器控制台的錯誤訊息
- 網路標籤中的資源載入情況
- 部署平台的構建日誌

## 授權

MIT License
