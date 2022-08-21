import React from 'react';
import moment from 'moment';

import { IDateTime, ISchedule, ISchedules } from '.';

export interface EditScheduleProps {
  isShow: boolean;
  id: string;
  schedules: ISchedules[];
  getId: VoidFunction;
  editSchedule: VoidFunction;
}

const EditSchedule = ({
  isShow,
  id,
  schedules,
  getId,
  editSchedule,
}: EditScheduleProps) => {
  if (!isShow) return null;

  if (!id) return null;

  const schedule: ISchedule = schedules.find((schedule: ISchedule) => {
    return getId(schedule.start, schedule.end) === id;
  }) || {
    start: {
      date: '',
      time: '',
    },
    end: {
      date: '',
      time: '',
    },
    title: '',
    description: '',
  };

  const [title, setTtile] = React.useState(schedule.title);

  const [start, setStart] = React.useState({
    date: moment(schedule.start.date).format('YYYY-MM-DD'),
    time: schedule.start.time,
  });
  const [end, setEnd] = React.useState({
    date: moment(schedule.end.date).format('YYYY-MM-DD'),
    time: schedule.end.time,
  });

  const [description, setDescription] = React.useState(schedule.description);

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
          editSchedule(id, {
            title,
            description,
            start,
            end,
          });
        }}
      >
        수정
      </button>
    </>
  );
};

EditSchedule.defaultProps = {
  schedule: {
    start: {
      date: '',
      time: '',
    },
    end: {
      date: '',
      time: '',
    },
    title: '',
    description: '',
  },
};

export default EditSchedule;
