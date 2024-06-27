// src/hooks/useChartData.js
import { useState, useEffect } from 'react';
import { chartData } from '../data'; // Ensure correct path

const useChartData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const parsedData = chartData.map(item => ({
      timestamp: new Date(item.timestamp).getTime(),
      value: item.value,
    }));
    setData(parsedData);
  }, []);

  return data;
};

export default useChartData;
