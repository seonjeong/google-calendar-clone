import React from 'react';
import moment from 'moment';

export interface CalendarProps {
  selectedDate: string;
  setPrevMonth: VoidFunction;
  setNextMonth: VoidFunction;
}

const Calendar = ({
  selectedDate,
  setPrevMonth,
  setNextMonth,
}: CalendarProps) => {
  const selected = {
    year: moment(selectedDate).year(),
    month: moment(selectedDate).month(),
    date: moment(selectedDate).date(),
    day: moment(selectedDate).day(),
  };

  const totalCount = new Date(selected.year, selected.month, 0).getDate();

  const firstDateDay = new Date(selected.year, selected.month, 1).getDay();

  const getHeader = () => {
    return (
      <div className='header'>
        <span
          onClick={() => {
            setPrevMonth();
          }}
        >
          prev
        </span>
        {`${selected.year}년 ${selected.month + 1}월`}
        <span
          onClick={() => {
            setNextMonth();
          }}
        >
          next
        </span>
      </div>
    );
  };

  const getWeeks = () => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    return week.map((item) => {
      return <div className='week'>{item}</div>;
    });
  };

  const getDays = () => {
    let days: (number | null)[] = [];

    Array.from({ length: 7 }, (_, i) => i).forEach((item) => {
      if (firstDateDay === item) {
        Array.from({ length: totalCount }, (_, i) => i).forEach((i) => {
          days.push(i + 1);
        });
      }
      days.push(null);
    });

    return days.map((item: number | null) => {
      return <div className={'box'}>{item}</div>;
    });
  };

  return (
    <>
      {getHeader()}
      <div className='weeks'>{getWeeks()}</div>
      <div className='dates'>{getDays()}</div>
    </>
  );
};

export default Calendar;
