import React from 'react';
import moment from 'moment';

import { ISchedule, ISchedules } from '../Schedule';

export interface CalendarProps {
  selectedDate: string;
  setPrevMonth: VoidFunction;
  setNextMonth: VoidFunction;
  getId: VoidFunction;
  schedules: ISchedules;
  openEditShechedule: VoidFunction;
}

const Calendar = ({
  selectedDate,
  setPrevMonth,
  setNextMonth,
  getId,
  schedules,
  openEditShechedule,
}: CalendarProps) => {
  const selected = {
    year: moment(selectedDate).year(),
    month: moment(selectedDate).month(),
    date: moment(selectedDate).date(),
    day: moment(selectedDate).day(),
  };

  const totalCount = new Date(selected.year, selected.month, 0).getDate();

  const maxMonthDate = new Date(selected.year, selected.month + 1, 0).getDate();
  const firstDateDay = new Date(selected.year, selected.month, 1).getDay();
  const lastDateDay = new Date(
    selected.year,
    selected.month,
    maxMonthDate
  ).getDay();

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

  const getScheduleRangeFromConvert = (date: string, schedules: ISchedules) => {
    interface dateTime {
      date: string;
      time: string;
    }

    const convertSchedule = (schedules: ISchedules) => {
      return schedules.reduce(
        (acc: { [id: string]: ISchedule }, schedule: ISchedule, i: number) => {
          const id = getId(schedule.start, schedule.end, i);
          acc[id] = schedule;
          return acc;
        },
        {}
      );
    };

    const convertRange = () => {
      return Array.from(
        {
          length: maxMonthDate,
        },
        (_, i) =>
          moment(`${selected.year}-${selected.month + 1}-${i + 1}`).format(
            'YYYY-MM-DD'
          )
      ).reduce((acc: { [id: string]: string[] }, date: string) => {
        acc[date] = Object.entries(convertSchedule(schedules))
          .filter(([idDate, schedule]) => {
            return getIsInclude(schedule.start.date, schedule.end.date, date);
          })
          .map(([idDate]) => idDate);
        return acc;
      }, {});
    };

    const covertedSchedule = convertSchedule(schedules) || {};
    const covertedRange = convertRange() || {};

    const daySchedules = covertedRange[date]?.map((date) => {
      return { [date]: covertedSchedule[date] };
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

    const startIndex = firstDateDay + maxMonthDate;

    days.splice(startIndex, 7 - (lastDateDay + 1));

    return days.map((item: number | null) => {
      const daySchedules: { [date: string]: ISchedule }[] =
        item !== null
          ? getScheduleRangeFromConvert(
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
              const [[id, schedule]] = Object.entries(daySchedule);

              return (
                <div
                  className='dayschedule'
                  onClick={() => {
                    openEditShechedule(id);
                  }}
                >
                  {schedule?.title}
                </div>
              );
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
