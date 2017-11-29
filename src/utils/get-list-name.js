import moment from 'moment';
const fmt = 'YYYY-MM-DD';

export const getYesterday = () => moment().subtract(1,'day').format(fmt);
export const getTomorrow = () => moment().add(1,'day').format(fmt);
export const getToday = () => moment().format(fmt);

export const getPrev = list => moment(list).subtract(1,'day').format(fmt);
export const getNext = list => moment(list).add(1,'day').format(fmt);