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
    addSchedule: (state, action) => {
      state.schedules = [...state.schedules, action.payload.schedule];
    },
    updateSchedule: (state, action) => {
      const i = action.payload.id.split('_')[1] * 1,
        { schedule } = action.payload;
      state.schedules[i] = action.payload.schedule;
    },
    deleteSchedule: (state, action) => {
      const i = action.payload.id.split('_')[1] * 1;
      state.schedules.splice(i, 1);
      console.log(state.schedules);
    },
  },
});

export const selectScheduleState = (state: ScheduleState) => {
  return state.schedule;
};

const { actions, reducer } = scheduleSlice;
export const { setSchedule, addSchedule, updateSchedule, deleteSchedule } =
  actions;

export default reducer;
