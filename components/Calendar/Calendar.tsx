import React from 'react';
import moment from 'moment';

import { ISchedule, ISchedules } from '../Schedule';

export interface CalendarProps {
  selectedDate: string;
  setPrevMonth: VoidFunction;
  setNextMonth: VoidFunction;
  schedules: ISchedules;
}

const Calendar = ({
  selectedDate,
  setPrevMonth,
  setNextMonth,
  schedules,
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

  const getScheduleFromArray = (date: string, schedules: ISchedules) => {
    const daySchedules = schedules.filter((schedule: ISchedule) => {
      return schedule.start.date === date;
    });
    return daySchedules;
  };

  const getScheduleFromConvert = (date: string, schedules: ISchedules) => {
    const convertSchedule = (schedules: ISchedules) => {
      return schedules.reduce(
        (acc: { [date: string]: ISchedules }, schedule: ISchedule) => {
          const date: string | null = schedule.start.date;

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date] = [...acc[date], schedule];
          return acc;
        },
        {}
      );
    };

    const [daySchedules] = Object.entries(convertSchedule(schedules))
      .filter(([converDate, schedule]) => {
        return converDate === date;
      })
      .map(([date, schedule]) => schedule);

    return daySchedules;
  };

  const getIsInclude = (start: string, end: string, date: string): boolean => {
    return (
      new Date(start).getTime() <= new Date(date).getTime() &&
      new Date(end).getTime() >= new Date(date).getTime()
    );
  };

  const getScheduleRangeFromArray = (date: string, schedules: ISchedules) => {
    const daySchedules = schedules.filter((schedule: ISchedule) => {
      return getIsInclude(schedule.start.date, schedule.end.date, date);
    });
    return daySchedules;
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
      const daySchedules: ISchedules =
        item !== null
          ? getScheduleRangeFromArray(
              moment(`${selected.year}-${selected.month + 1}-${item}`).format(
                'YYYY-MM-DD'
              ),
              schedules
            )
          : [];

      return (
        <div className={'box'}>
          {item}
          {daySchedules &&
            daySchedules.map((daySchedule) => {
              return <div className='dayschedule'>{daySchedule?.title}</div>;
            })}
        </div>
      );
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
