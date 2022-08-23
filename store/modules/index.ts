import { combineReducers } from '@reduxjs/toolkit';

import calendar from './calendar';
import schedule from './schedule';

const reducer = combineReducers({
  calendar,
  schedule,
});

export default reducer;
