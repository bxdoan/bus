# Nha Trang Bus Map Application

Ứng dụng này hiển thị bản đồ các tuyến xe buýt tại thành phố Nha Trang, Việt Nam sử dụng React và TypeScript.

## Tính năng

- Hiển thị bản đồ Google Maps với tâm ở thành phố Nha Trang
- Hiển thị các tuyến xe buýt chính tại Nha Trang
- Hiển thị các điểm dừng xe buýt trên bản đồ
- Cho phép người dùng chọn tuyến xe buýt để hiển thị chi tiết
- Hiển thị thông tin về điểm dừng khi click vào marker

## Cài đặt

1. Clone repository về máy:
```
git clone <repository-url>
```

2. Cài đặt các thư viện:
```
npm install
```

3. Tạo file `.env` và thêm API key của Google Maps (yêu cầu Places API, Maps JavaScript API):
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Chạy ứng dụng:
```
npm start
```

## Cấu trúc dự án

- `src/components/BusMap.tsx`: Component hiển thị bản đồ và các tuyến xe buýt
- `src/components/BusMap.css`: Styles cho component BusMap
- `public/data/busRoutes.json`: Dữ liệu về các tuyến xe buýt và điểm dừng

## Công nghệ sử dụng

- React
- TypeScript
- Google Maps API (@react-google-maps/api)

## Lưu ý

Để sử dụng ứng dụng, bạn cần có Google Maps API key. Trong môi trường phát triển, bạn có thể thay đổi trực tiếp biến `googleMapsApiKey` trong file `src/components/BusMap.tsx` hoặc sử dụng file `.env` như hướng dẫn ở trên.
