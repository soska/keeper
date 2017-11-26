import generateID from './id';
import createDefaultListName from './default-list-name';
import {STATUS_PENDING} from './constants';

const itemFactory = (title, list) => ({
  _id:generateID('todo'),
  title:title,
  status:STATUS_PENDING,
  list:list || createDefaultListName(),
});

export default itemFactory;