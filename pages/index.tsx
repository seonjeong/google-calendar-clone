import type { NextPage } from 'next';
import React from 'react';
import moment from 'moment';

import { Calendar } from '../components/Calendar';
import { Schedule } from '../components/Schedule';

import type { ISchedule, ISchedules } from '../components/Schedule';

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

  return (
    <>
      <Schedule selectedDate={selectedDate} addSchedule={addSchedule} />
      <Calendar
        selectedDate={selectedDate}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
        schedules={schedules}
      />
    </>
  );
};

export default ScheduleCalendar;
