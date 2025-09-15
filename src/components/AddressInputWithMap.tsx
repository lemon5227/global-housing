'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// 动态导入 Leaflet 组件以避免 SSR 问题
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// 动态导入 Leaflet CSS
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
  document.head.appendChild(link);
}

// 修复 Leaflet 默认图标问题
if (typeof window !== 'undefined') {
  import('leaflet').then((L) => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  });
}

interface AddressInputWithMapProps {
  value: string;
  onChange: (address: string, location?: { lat: number; lng: number }) => void;
  placeholder?: string;
  required?: boolean;
}

// 地图容器组件，包含事件处理
function MapWithEvents({ onLocationSelect, markerPosition, zoomToPosition }: {
  onLocationSelect: (lat: number, lng: number) => void;
  markerPosition: [number, number] | null;
  zoomToPosition: [number, number] | null;
}) {
  const mapRef = useRef<any>(null);
  const onLocationSelectRef = useRef(onLocationSelect);

  // 更新引用
  onLocationSelectRef.current = onLocationSelect;

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // 添加点击事件监听器
      const handleClick = (e: any) => {
        onLocationSelectRef.current(e.latlng.lat, e.latlng.lng);
      };

      map.on('click', handleClick);

      // 清理函数
      return () => {
        map.off('click', handleClick);
      };
    }
  }, []);

  // 当 zoomToPosition 改变时，缩放地图到该位置
  useEffect(() => {
    if (mapRef.current && zoomToPosition) {
      const map = mapRef.current;
      console.log('缩放地图到位置:', zoomToPosition); // 调试日志
      
      // 使用 flyTo 方法实现平滑缩放动画
      map.flyTo(zoomToPosition, 16, {
        duration: 1.5, // 动画持续时间
        easeLinearity: 0.25
      });
    }
  }, [zoomToPosition]);

  return (
    <MapContainer
      ref={mapRef}
      center={[43.7102, 7.2620]} // 默认位置：法国南部
      zoom={10}
      style={{ height: '300px', width: '100%' }}
      className="rounded-xl border border-gray-300 dark:border-gray-600"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            <div className="text-center">
              <div className="font-medium">选择的位置</div>
              <div className="text-sm text-gray-600">
                {markerPosition[0].toFixed(6)}, {markerPosition[1].toFixed(6)}
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

// 动态导入地图组件
const DynamicMapWithEvents = dynamic(() => Promise.resolve(MapWithEvents), { ssr: false });

export default function AddressInputWithMap({
  value,
  onChange,
  placeholder = "输入地址或在地图上点击选择",
  required = false
}: AddressInputWithMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [zoomToPosition, setZoomToPosition] = useState<[number, number] | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 地址搜索功能（使用 Nominatim API）
  const searchAddress = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    console.log('搜索地址:', query); // 调试日志

    try {
      // 优化的搜索策略 - 减少搜索次数，提高速度
      let searchQuery = query;
      
      // 如果查询不包含France且看起来像法国地址，添加France
      if (!query.toLowerCase().includes('france') && 
          (query.toLowerCase().includes('rue') || 
           query.toLowerCase().includes('avenue') || 
           query.toLowerCase().includes('boulevard'))) {
        searchQuery = `${query}, France`;
      }

      const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=10&countrycodes=fr&addressdetails=1&extratags=1&namedetails=1`;
      console.log('搜索URL:', searchUrl);

      const response = await fetch(searchUrl);
      const results = await response.json();
      
      console.log('搜索结果:', results);

      if (!results || results.length === 0) {
        setSearchResults([]);
        setShowSuggestions(false);
        return;
      }

      // 更智能的过滤和排序
      const filteredResults = results
        .filter((result: any) => {
          if (!result.display_name) return false;
          
          const displayName = result.display_name.toLowerCase();
          const queryLower = query.toLowerCase();
          
          // 检查是否包含查询关键词
          const containsQuery = displayName.includes(queryLower) ||
                               queryLower.split(' ').some(word => 
                                 word.length > 2 && displayName.includes(word)
                               );
          
          // 包含查询关键词，或者是重要的地址类型
          return containsQuery || 
                 result.type === 'house' ||
                 result.type === 'building' ||
                 result.type === 'residential' ||
                 result.class === 'highway' ||
                 result.class === 'place' ||
                 (result.importance && result.importance > 0.3);
        })
        .sort((a: any, b: any) => {
          const aName = a.display_name.toLowerCase();
          const bName = b.display_name.toLowerCase();
          const queryLower = query.toLowerCase();
          
          // 优先级排序
          const aStartsWith = aName.startsWith(queryLower);
          const bStartsWith = bName.startsWith(queryLower);
          const aContains = aName.includes(queryLower);
          const bContains = bName.includes(queryLower);
          
          // 1. 以查询词开头的优先
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // 2. 包含查询词的优先
          if (aContains && !bContains) return -1;
          if (!aContains && bContains) return 1;
          
          // 3. 按重要性排序
          return (b.importance || 0) - (a.importance || 0);
        })
        .slice(0, 8); // 限制显示8个结果

      console.log('过滤后结果:', filteredResults);

      setSearchResults(filteredResults);
      setShowSuggestions(filteredResults.length > 0);
    } catch (error) {
      console.error('地址搜索失败:', error);
      setSearchResults([]);
    }
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    setMarkerPosition([lat, lng]);

    // 反向地理编码
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const result = await response.json();
      if (result && result.display_name) {
        onChange(result.display_name, { lat, lng });
      }
    } catch (error) {
      console.error('反向地理编码失败:', error);
    }
  };

  const handleAddressSelect = (result: any) => {
    console.log('选择地址:', result); // 调试日志
    
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const position: [number, number] = [lat, lng];
    
    console.log('设置位置:', position); // 调试日志
    
    // 智能合并用户输入和选中地址，保留房屋号码
    let finalAddress = result.display_name;
    
    // 检查用户输入是否包含数字（房屋号码）
    const userInput = value.trim();
    const houseNumberMatch = userInput.match(/^\d+/);
    
    if (houseNumberMatch) {
      const houseNumber = houseNumberMatch[0];
      const addressParts = result.display_name.split(', ');
      
      // 检查选中的地址是否已经包含房屋号码
      const firstPart = addressParts[0];
      const hasNumber = /^\d+/.test(firstPart);
      
      if (!hasNumber) {
        // 如果选中的地址没有房屋号码，添加用户输入的号码
        addressParts[0] = `${houseNumber} ${firstPart}`;
        finalAddress = addressParts.join(', ');
      }
    }
    
    setMarkerPosition(position);
    setZoomToPosition(position); // 设置缩放位置
    onChange(finalAddress, { lat, lng });
    setShowSuggestions(false);
    
    // 清空输入框的焦点以便用户看到地图变化
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // 清除之前的定时器
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // 立即显示建议，如果输入长度足够
    if (newValue.length >= 2) {
      // 设置新的防抖定时器
      const timeout = setTimeout(() => {
        searchAddress(newValue);
      }, 200); // 减少到200ms防抖，提高响应速度

      setSearchTimeout(timeout);
    } else {
      // 输入太短时隐藏建议
      setShowSuggestions(false);
      setSearchResults([]);
    }
  };

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <div className="text-gray-500 text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          正在加载地图...
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-amber-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-white transition-all"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 地址输入框 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          autoComplete="off"
        />

        {/* 搜索状态指示器 */}
        {value.length >= 3 && searchResults.length === 0 && showSuggestions === false && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* 搜索建议 */}
        {showSuggestions && searchResults.length > 0 && (
          <div className="absolute z-[9999] w-full mt-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => {
              // 构建更清晰的地址显示
              const addressParts = result.display_name.split(', ');
              const mainAddress = addressParts[0];
              const secondaryAddress = addressParts[1] || '';
              const locationInfo = addressParts.slice(2, 4).join(', ');
              
              // 高亮显示匹配的关键词
              const highlightText = (text: string, query: string) => {
                if (!query || query.length < 2) return text;
                
                const queryLower = query.toLowerCase();
                const textLower = text.toLowerCase();
                const index = textLower.indexOf(queryLower);
                
                if (index >= 0) {
                  const before = text.slice(0, index);
                  const match = text.slice(index, index + query.length);
                  const after = text.slice(index + query.length);
                  
                  return (
                    <>
                      {before}
                      <span className="bg-yellow-200 dark:bg-yellow-600 font-medium">{match}</span>
                      {after}
                    </>
                  );
                }
                return text;
              };

              return (
                <button
                  key={result.place_id || index}
                  onClick={() => handleAddressSelect(result)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50/80 dark:hover:bg-blue-900/30 border-b border-gray-100/50 dark:border-gray-700/50 last:border-b-0 transition-colors backdrop-blur-sm"
                >
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {highlightText(mainAddress, value)}
                  </div>
                  {secondaryAddress && (
                    <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">
                      {highlightText(secondaryAddress, value)}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {locationInfo}
                  </div>
                  {result.type && (
                    <div className="inline-flex items-center mt-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full capitalize">
                        {result.type.replace('_', ' ')}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
            
            {/* 显示搜索结果数量 */}
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50/80 dark:bg-gray-700/80 border-t border-gray-100/50 dark:border-gray-600/50 backdrop-blur-sm">
              找到 {searchResults.length} 个相关地址
            </div>
          </div>
        )}

        {/* 无搜索结果提示 */}
        {value.length >= 2 && searchResults.length === 0 && showSuggestions && (
          <div className="absolute z-[9999] w-full mt-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-4">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">未找到包含 "{value}" 的地址</p>
              <p className="text-xs mt-1">尝试输入更具体的地址信息</p>
            </div>
          </div>
        )}
      </div>

      {/* 地图容器 */}
      <div className="relative">
        <DynamicMapWithEvents
          onLocationSelect={handleLocationSelect}
          markerPosition={markerPosition}
          zoomToPosition={zoomToPosition}
        />

        <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-300 shadow">
          🖱️ 点击地图选择位置
        </div>
      </div>      <p className="text-xs text-gray-500 dark:text-gray-400">
        💡 输入地址搜索或直接在地图上点击选择位置。数据由 OpenStreetMap 提供，完全免费。
      </p>
    </div>
  );
}
