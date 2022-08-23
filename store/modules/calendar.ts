import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { HYDRATE } from 'next-redux-wrapper';

export interface CalenarState {
  selectedDate: string;
}

const initialState: CalenarState = {
  selectedDate: moment(new Date()).format('YYYY-MM-DD'),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload.selectedDate;
    },
    setPrevMonthDate: (state) => {
      const { selectedDate } = state;
      state.selectedDate = moment(selectedDate)
        .add(-1, 'months')
        .set('date', 1)
        .format('YYYY-MM-DD');
    },
    setNextMonthDate: (state) => {
      const { selectedDate } = state;
      state.selectedDate = moment(selectedDate)
        .add(1, 'months')
        .set('date', 1)
        .format('YYYY-MM-DD');
    },
  },
});

export const selectCalendarState = (state: CalenarState) => {
  return state.calendar;
};

const { actions, reducer } = calendarSlice;
export const { setDate, setPrevMonthDate, setNextMonthDate } = actions;

export default reducer;
