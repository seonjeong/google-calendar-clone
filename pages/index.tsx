import type { NextPage } from 'next';
import React from 'react';
import moment from 'moment';

import { Calendar } from '../components/Calendar';
import { Schedule, EditSchedule } from '../components/Schedule';

import type { IDateTime, ISchedule, ISchedules } from '../components/Schedule';

const ScheduleCalendar: NextPage = ({}) => {
  const [selectedDate, setSelectedDate] = React.useState(
    moment(new Date()).format('YYYY-MM-DD')
  );

  const setPrevMonth = () => {
    const prevMonth = moment(selectedDate)
      .add(-1, 'months')
      .set('date', 1)
      .format('YYYY-MM-DD');
    setSelectedDate(prevMonth);
  };
  const setNextMonth = () => {
    const nextMonth = moment(selectedDate)
      .add(1, 'months')
      .set('date', 1)
      .format('YYYY-MM-DD');
    setSelectedDate(nextMonth);
  };

  const [schedules, setSchedules] = React.useState([]);

  const addSchedule = (schedule: ISchedule): void => {
    setSchedules((schedules) => [...schedules, schedule]);
  };

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
    setSchedules(_schedules);
    setIsShowEdit(false);
  };

  return (
    <>
      <Schedule selectedDate={selectedDate} addSchedule={addSchedule} />
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
