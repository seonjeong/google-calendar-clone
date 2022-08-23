import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { HYDRATE } from 'next-redux-wrapper';

import { ISchedule, ISchedules } from '../../components/Schedule';

export interface ScheduleState {
  schedules: ISchedules;
}

const initialState: ScheduleState = {
  schedules: [],
};

const scheduleSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSchedule: (state, action) => {
      state.schedules = action.payload.schedules;
    },
  },
});

export const selectScheduleState = (state: ScheduleState) => {
  return state.schedule;
};

const { actions, reducer } = scheduleSlice;
export const { setSchedule } = actions;

export default reducer;
