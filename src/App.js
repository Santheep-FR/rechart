// src/App.js
import React from 'react';
import Chart from './components/Chart';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const App = () => {
  return (
    <AppContainer>
      <Title>Charting Application</Title>
      <Chart />
    </AppContainer>
  );
};

export default App;
