import moment from 'moment';
const isToday = (list)=>(
  list === moment().format('YYYY-MM-DD')
);

export default isToday;