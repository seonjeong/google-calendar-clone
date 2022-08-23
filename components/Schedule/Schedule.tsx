import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { selectScheduleState, setSchedule } from '../../store/modules/schedule';

export interface IDateTime {
  date: string;
  time: string;
}

export interface ISchedule {
  title: string;
  description: string;
  start: IDateTime;
  end: IDateTime;
}

export type ISchedules = ISchedule[];

export interface ScheduleProps {
  selectedDate: string;
}

const Schedule = ({ selectedDate }: ScheduleProps) => {
  const { schedules } = useSelector(selectScheduleState);
  const dispatch = useDispatch();

  const [title, setTtile] = React.useState('');

  const [start, setStart] = React.useState({
    date: moment(selectedDate).format('YYYY-MM-DD'),
    time: '00:00:00',
  });
  const [end, setEnd] = React.useState({
    date: moment(selectedDate).format('YYYY-MM-DD'),
    time: '01:00:00',
  });

  const [description, setDescription] = React.useState('');

  const addSchedule = () => {
    dispatch(
      setSchedule({
        schedules: [
          ...schedules,
          {
            title,
            description,
            start,
            end,
          },
        ],
      })
    );
  };
  return (
    <>
      <input
        type='text'
        className='ui-input'
        placeholder='title'
        value={title}
        onChange={(e) => {
          setTtile(e.target.value);
        }}
      />
      <input
        type='date'
        className='ui-input'
        value={start.date}
        onChange={(e) => {
          setStart((start) => ({ ...start, date: e.target.value }));
        }}
      />
      <input
        type='time'
        className='ui-input'
        value={start.time}
        onChange={(e) => {
          setStart((start) => ({ ...start, time: e.target.value }));
        }}
      />
      <input
        type='date'
        className='ui-input'
        value={end.date}
        onChange={(e) => {
          setEnd((end) => ({ ...end, date: e.target.value }));
        }}
      />
      <input
        type='time'
        className='ui-input'
        value={end.time}
        onChange={(e) => {
          setEnd((end) => ({ ...end, time: e.target.value }));
        }}
      />
      <textarea
        className='ui-textarea'
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <button
        className='btn default-style btn-primary'
        onClick={() => {
          addSchedule();
        }}
      >
        추가
      </button>
    </>
  );
};

export default Schedule;
