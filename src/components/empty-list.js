import React from 'react';
import styled from 'styled-components';
import isToday from '../utils/is-today.js';

const Empty = styled.div`
  margin:22px;
  padding:22px;
  border:2px dashed #eee;
  color:#999;
  text-align:center;
`;


const EmptyList = ({list})=>(
  <Empty>
    [ No items logged for {isToday(list) ? `today… yet` : list} ]
  </Empty>
);

export default EmptyList;