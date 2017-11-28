import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import styled from 'styled-components';
import isToday from '../utils/is-today.js';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../utils/datepicker-overrides.css';

const PickerBar = styled.div`
  display:flex;
  justify-content:flex-end;
  padding:11px;
  border-bottom:1px solid #e0e0e0;
  &>*{
    margin-right:11px;
  }
`;

const ListTitle = styled.div`
  font-size:16px;
  text-transform:uppercase;
  letter-spacing:.0125em;
  padding:11px;
  margin-right:auto;
  color:#555;
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

const TodayGlyph = styled.span`
  font-size:14px;
  font-weight:bold;
  display:inline-block;
  color:#999;
  margin-left:6px;
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
    const {list} = this.props;
    const date = moment(list);
    const today = isToday(list);
    return (
      <PickerBar>
        <ListTitle>
          {today ? '★ Today\'s stuff' : moment(list).format('LL')}
        </ListTitle>
        {today && (
          <TodayLink to={`/${moment().subtract(1,'day').format('YYYY-MM-DD')}`}>
            <TodayGlyph>&larr;</TodayGlyph>
            Yesterday
          </TodayLink>
        )}
        {!today && (
          <TodayLink to='/'>
            Today
            <TodayGlyph>&rarr;</TodayGlyph>
          </TodayLink>
        )}
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