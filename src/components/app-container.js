import React from 'react';
import TodoForm from './/todo-form';
import Todos from './todos-container';
import styled from 'styled-components';
import ListPicker from './list-picker';


const WrapperDiv = styled.div`
`;

const AppContainer = ({list})=>(
  <WrapperDiv>
    <ListPicker list={list}/>
    <Todos list={list}/>
    <TodoForm list={list}/>
  </WrapperDiv>
);


export default AppContainer;