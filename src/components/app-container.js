import React from 'react';
import TodoForm from './/todo-form';
import Todos from './todos-container';
import styled from 'styled-components';
import ListPicker from './list-picker';


const WrapperDiv = styled.div`
  // max-width:50em;
  margin:44px;
  background:white;
  border-radius:3px;
  border:1px solid #d9d9d9;
`;

const AppContainer = ({list})=>(
  <WrapperDiv>
    <ListPicker list={list}/>
    <TodoForm list={list}/>
    <Todos list={list}/>
  </WrapperDiv>
);


export default AppContainer;