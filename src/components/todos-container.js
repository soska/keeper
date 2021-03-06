import React from 'react';
import {STATUS_DONE} from '../utils/constants';
import getStatusGlyph from '../utils/status-glyph';
import EmptyList from './empty-list';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {toggleItemDoneStatus, deleteItem, getItems, moveItem} from '../data/modules/items';
import isToday from '../utils/is-today.js';
import {getToday, getTomorrow} from '../utils/get-list-name.js';

const TodosWrapper = styled.div`
  display:flex;
  flex-direction:column;
`;

const ItemWrapper = styled.div`
  padding:22px;
  display:flex;
  flex-direction:row;
  border-bottom:1px solid #e3e3e0;
  cursor:pointer;
`;

const BulletWrapper = styled.div`
  margin-left:11px;
  color:${({status})=>{
    if (status===STATUS_DONE) {
      return '#590';
    }
    return '#999';
  }}
`;

const TitleWrapper = styled.div`
  flex:1;
  margin-left:11px;
  color:${({status})=>{
    if (status===STATUS_DONE) {
      return '#999';
    }
    return '#888';
  }}
`;

const ItemButton = styled.div`
  margin-left:11px;
  color:#999;
  :hover{
    color:red;
  }
`;

const TodoBullet = ({status})=>(
  <BulletWrapper status={status}>{`[${getStatusGlyph(status)}]`}</BulletWrapper>
);

const TodoTitle = ({title, status})=>(
  <TitleWrapper status={status}>{title}</TitleWrapper>
);


const TodoItem = ({item, onToggle, onDelete, onMove})=>(
  <ItemWrapper onClick={onToggle}>
    <TodoBullet status={item.status}/>
    <TodoTitle title={item.title} status={item.status}/>
    <ItemButton onClick={onMove}>→</ItemButton>
    <ItemButton onClick={onDelete}>×</ItemButton>
  </ItemWrapper>
);

class TodosContainer extends React.Component{

  static defaultProps = {
    list:null
  };

  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(nextProps){
    if (nextProps.list !== this.props.list) {
      this.getData();
    }
  }

  getData = ()=>{
    this.props.getItems(this.props.list);
  }

  handleDelete = item => {
    this.props.deleteItem(item).then(()=>{
      this.getData();
    })
  }

  handleToggle = item => {
    this.props.toggle(item).then(()=>{
      this.getData();
    })
  }

  handleMove = item => {
    const {list, moveItem} = this.props;
    const moveTo = isToday(list) ? getTomorrow() : getToday();
    moveItem(item, moveTo).then(()=>{
      this.getData();
    })
  }

  render(){

    const {items, list} = this.props;

    if (!items.length) {
      return (
        <EmptyList list={list}/>
      );
    }

    return (
      <TodosWrapper>
        {items.map((item,i)=>(
          <TodoItem
            key={i}
            item={item}
            onToggle={e=>{
              e.preventDefault();
              this.handleToggle(item)
            }}
            onDelete={e=>{
              e.preventDefault();
              this.handleDelete(item)
            }}
            onMove={e=>{
              e.preventDefault();
              this.handleMove(item)
            }}
            />
        ))}
      </TodosWrapper>
    );
  }
}

export default connect(
  state=>({items:state.items}),
  {
    toggle:toggleItemDoneStatus,
    deleteItem,
    getItems,
    moveItem
  }
)(TodosContainer);
