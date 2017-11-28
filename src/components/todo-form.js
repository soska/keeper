import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {createItem, getItems} from '../data/modules/items';
// import createDefaultListName from '../utils/default-list-name';


const FormWrapper = styled.div`
  display:flex;
  font-family:menlo,courier,mono;
  padding:11px;
  background:#ededed;
`;

const Form = styled.form`
  display:flex;
  flex:1;
`;

const Input = styled.input`
  padding:11px;
  flex:1;
  font-size:18px;
  border:none;
  font-family:menlo,courier,mono;
  &::placeholder{
   text-transform:uppercase;
   color:#bbb;
   letter-spacing:0.125em;
  }
`;

class TodoForm extends Component {

  static defaultProps = {
    list:null,
    createItem:()=>{}
  }

  state =  {
    todo:''
  }

  setTodo = todo => this.setState({todo});

  resetTodo = () => this.setState({todo:''});

  handleSave = (e)=>{
    e.preventDefault();
    const {todo} = this.state;
    const {
      createItem,
      list,
      getItems
    } = this.props;

    if (todo.length > 1) {
      createItem(todo, list).then(()=>{
        if (list) {
          getItems(list);
        }
      });
      this.resetTodo();
    }
  }


  render() {
    return (
      <FormWrapper>
        <Form onSubmit={this.handleSave}>
          <Input
            type="text"
            value={this.state.todo}
            autoFocus
            onChange={e=>{this.setTodo(e.target.value)}}
            placeholder={'New entry'}
            />
        </Form>
      </FormWrapper>
    );
  }
}

export default connect(
  state=>({items:state.items}),
  {createItem, getItems}
)(TodoForm);
