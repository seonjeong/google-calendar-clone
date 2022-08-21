import type { NextPage } from 'next';
import React from 'react';
import moment from 'moment';

import { Calendar } from '../components/Calendar';
import { Schedule } from '../components/Schedule';

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

  return (
    <>
      <Schedule selectedDate={selectedDate} />
      <Calendar
        selectedDate={selectedDate}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
      />
    </>
  );
};

export default ScheduleCalendar;
