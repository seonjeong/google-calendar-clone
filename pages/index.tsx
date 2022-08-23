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

  const getId = (start: IDateTime, end: IDateTime) => {
    return `${start.date}=${start.time}+${end.date}=${end.time}`;
  };

  const editSchedule = (id: string, editSchedule: ISchedule): void => {
    const _schedules: ISchedules = schedules.map((schedule: ISchedule) => {
      if (getId(schedule.start, schedule.end) !== id) {
        return schedule;
      } else {
        return editSchedule;
      }
    });
    setSchedules(_schedules);
    setIsShowEdit(false);
  };

  const openEditShechedule = (id: string) => {
    setIsShowEdit(true);
    setSelectedSchedule(id);
  };

  const deleteSchedule = (id: string) => {
    const _schedules: ISchedules = schedules.filter((schedule: ISchedule) => {
      if (getId(schedule.start, schedule.end) !== id) {
        return true;
      } else {
        return false;
      }
    });
    dispatch(
      setSchedule({
        schedules: _schedules,
      })
    );
    setIsShowEdit(false);
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
        id={selectedSchedule}
        schedules={schedules}
        getId={getId}
        editSchedule={editSchedule}
        deleteSchedule={deleteSchedule}
      />
    </>
  );
};

export default ScheduleCalendar;
