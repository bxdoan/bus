import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import './BusMap.css';

// Kiểu dữ liệu cho tọa độ
interface Location {
  lat: number;
  lng: number;
}

// Kiểu dữ liệu cho bus stop
interface BusStop {
  id: string;
  name: string;
  location: Location;
}

// Kiểu dữ liệu cho tuyến bus
interface BusRoute {
  id: string;
  name: string;
  color: string;
  stops: BusStop[];
  path: Location[];
}

// Thông số cấu hình Map
const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

// Tọa độ trung tâm Nha Trang
const nhaTrangCenter = {
  lat: 12.2388, 
  lng: 109.1967,
};

// API key cho Google Maps (thay thế bằng API key thực tế của bạn)
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";

const BusMap: React.FC = () => {
  // Khởi tạo Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
  });

  // State cho dữ liệu tuyến bus
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  // State cho thông tin điểm dừng xe bus đang được chọn
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  // State cho tuyến đang được chọn
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // Tải dữ liệu tuyến bus
  useEffect(() => {
    const fetchBusRoutes = async () => {
      try {
        const response = await fetch('/data/busRoutes.json');
        const data = await response.json();
        setBusRoutes(data);
      } catch (error) {
        console.error("Error loading bus routes data:", error);
      }
    };

    fetchBusRoutes();
  }, []);

  // Xử lý khi click vào điểm dừng
  const handleStopClick = (stop: BusStop) => {
    setSelectedStop(stop);
  };

  // Xử lý khi click vào tuyến
  const handleRouteClick = (routeId: string) => {
    setSelectedRoute(selectedRoute === routeId ? null : routeId);
  };

  // Hiển thị lỗi nếu không thể tải Google Maps
  if (loadError) {
    return <div>Có lỗi khi tải Google Maps</div>;
  }

  // Hiển thị loading nếu đang tải Google Maps
  if (!isLoaded) {
    return <div>Đang tải bản đồ...</div>;
  }

  return (
    <div className="bus-map-container">
      <div className="route-selector">
        <h2>Các tuyến xe buýt Nha Trang</h2>
        <div className="route-list">
          {busRoutes.map((route) => (
            <div 
              key={route.id} 
              className={`route-item ${selectedRoute === route.id ? 'selected' : ''}`}
              onClick={() => handleRouteClick(route.id)}
            >
              <div className="route-color" style={{ backgroundColor: route.color }}></div>
              <div className="route-name">{route.name}</div>
            </div>
          ))}
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={nhaTrangCenter}
        zoom={13}
      >
        {/* Hiển thị các đường đi */}
        {busRoutes.map((route) => (
          <Polyline
            key={route.id}
            path={route.path}
            options={{
              strokeColor: route.color,
              strokeOpacity: selectedRoute ? (selectedRoute === route.id ? 1 : 0.3) : 1,
              strokeWeight: 3,
            }}
            onClick={() => handleRouteClick(route.id)}
          />
        ))}

        {/* Hiển thị các điểm dừng */}
        {busRoutes.map((route) => (
          route.stops.map((stop) => (
            <Marker
              key={stop.id}
              position={stop.location}
              onClick={() => handleStopClick(stop)}
              opacity={selectedRoute ? (selectedRoute === route.id ? 1 : 0.5) : 1}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${route.id === 'route1' ? 'red' : route.id === 'route2' ? 'blue' : 'green'}-dot.png`,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))
        ))}

        {/* Hiển thị thông tin điểm dừng khi click */}
        {selectedStop && (
          <InfoWindow
            position={selectedStop.location}
            onCloseClick={() => setSelectedStop(null)}
          >
            <div className="info-window">
              <h3>{selectedStop.name}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default BusMap; 