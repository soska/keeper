import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import styled from 'styled-components';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../utils/datepicker-overrides.css';

const PickerBar = styled.div`
  display:flex;
  padding:11px;
  border-bottom:1px solid #e0e0e0;
  &>*{
    margin-right:11px;
  }
`;

const TodayLink = styled(Link)`
  display:block;
  padding:12px;
  border:1px solid #ccc;
  color:#555;
  text-decoration:none;
  &:hover{
    color:#f0f0f0;
    background:#555;
  }
`;

class ListPicker extends React.Component{

  state = {
    focused:false
  }

  handleDateChange = (date) => {
    const list = date.format('YYYY-MM-DD');
    this.props.history.push(`/${list}`);
  }

  render(){
    const date = moment(this.props.list);
    return (
      <PickerBar>
        <TodayLink to='/'>Today</TodayLink>
        <SingleDatePicker
          date={date} // momentPropTypes.momentObj or null
          onDateChange={this.handleDateChange} // PropTypes.func.isRequired
          isOutsideRange={()=>false}
          showDefaultInputIcon={false}
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        />
      </PickerBar>
    );
  }
}

export default withRouter(ListPicker);