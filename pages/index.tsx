import type { NextPage } from 'next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Calendar } from '../components/Calendar';
import { Schedule, EditSchedule } from '../components/Schedule';

import type { IDateTime, ISchedule, ISchedules } from '../components/Schedule';

import {
  selectCalendarState,
  setPrevMonthDate,
  setNextMonthDate,
} from '../store/modules/calendar';

import { selectScheduleState, setSchedule } from '../store/modules/schedule';

const ScheduleCalendar: NextPage = ({}) => {
  const dispatch = useDispatch();

  const { selectedDate } = useSelector(selectCalendarState);

  const setPrevMonth = () => {
    dispatch(setPrevMonthDate());
  };
  const setNextMonth = () => {
    dispatch(setNextMonthDate());
  };

  const { schedules } = useSelector(selectScheduleState);

  const [isShowEdit, setIsShowEdit] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState('');

  const getId = (start: IDateTime, end: IDateTime, i: number) => {
    return `${start.date}=${start.time}+${end.date}=${end.time}_${i}`;
  };

  const openEditShechedule = (id: string) => {
    setIsShowEdit(true);
    setSelectedSchedule(id);
  };

  return (
    <>
      <Schedule selectedDate={selectedDate} />
      <Calendar
        selectedDate={selectedDate}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
        schedules={schedules}
        openEditShechedule={openEditShechedule}
      />
      <EditSchedule
        isShow={isShowEdit}
        setIsShowEdit={setIsShowEdit}
        id={selectedSchedule}
        getId={getId}
      />
    </>
  );
};

export default ScheduleCalendar;
