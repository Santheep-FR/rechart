// src/components/Chart.js
import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useChartData from '../hooks/useChartData';
import TimeframeButtons from './TimeframeButtons';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import styled from 'styled-components';
import { format, subDays, subWeeks, subMonths } from 'date-fns';

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ExportButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const Details = styled.div`
  margin-top: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Chart = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const [selectedData, setSelectedData] = useState(null);
  const data = useChartData();
  const [filteredData, setFilteredData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    let filtered;
    if (timeframe === 'daily') {
      filtered = data.filter(item => item.timestamp >= subDays(now, 1).getTime());
    } else if (timeframe === 'weekly') {
      filtered = data.filter(item => item.timestamp >= subWeeks(now, 1).getTime());
    } else if (timeframe === 'monthly') {
      filtered = data.filter(item => item.timestamp >= subMonths(now, 1).getTime());
    }
    setFilteredData(filtered.map(item => ({
      ...item,
      timestamp: format(new Date(item.timestamp), 'yyyy-MM-dd')
    })));
  }, [timeframe, data]);

  const handleClick = (e) => {
    if (e && e.activePayload && e.activePayload.length > 0) {
      setSelectedData(e.activePayload[0].payload);
    }
  };

  const handleExport = () => {
    if (chartRef.current) {
      htmlToImage.toPng(chartRef.current)
        .then((dataUrl) => {
          download(dataUrl, 'chart.png');
        });
    }
  };

  return (
    <ChartContainer>
      <TimeframeButtons onChangeTimeframe={setTimeframe} />
      <ExportButton onClick={handleExport}>Export as PNG</ExportButton>
      <div ref={chartRef} style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} onClick={handleClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {selectedData && <Details>Details: {JSON.stringify(selectedData)}</Details>}
    </ChartContainer>
  );
};

export default Chart;
