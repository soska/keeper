import moment from 'moment';

const createDefaultListName = () => moment().format('YYYY-MM-DD'); //LocalDate.now().toString();

export default createDefaultListName;