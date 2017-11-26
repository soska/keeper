import {STATUS_DONE, STATUS_PENDING, STATUS_MOVED} from '../utils/constants';

const getGlyphForStatus = status => {
  switch (status){
    case STATUS_DONE :
      // return '×';
      return '•';
    case STATUS_PENDING :
      return ' ';
    case STATUS_MOVED :
      return '§';
    default:
  }
}

export default getGlyphForStatus;