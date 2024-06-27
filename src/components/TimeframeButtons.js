// src/components/TimeframeButtons.js
import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const TimeframeButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const TimeframeButtons = ({ onChangeTimeframe }) => {
  return (
    <ButtonContainer>
      <TimeframeButton onClick={() => onChangeTimeframe('daily')}>Daily</TimeframeButton>
      <TimeframeButton onClick={() => onChangeTimeframe('weekly')}>Weekly</TimeframeButton>
      <TimeframeButton onClick={() => onChangeTimeframe('monthly')}>Monthly</TimeframeButton>
    </ButtonContainer>
  );
};

export default TimeframeButtons;
