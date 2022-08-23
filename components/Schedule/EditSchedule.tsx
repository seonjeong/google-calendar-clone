import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { IDateTime, ISchedule, ISchedules } from '.';

import { selectScheduleState, setSchedule } from '../../store/modules/schedule';

export interface EditScheduleProps {
  isShow: boolean;
  id: string;
  getId: VoidFunction;
  deleteSchedule: VoidFunction;
  setIsShowEdit: VoidFunction;
}

const EditSchedule = ({
  isShow,
  id,
  getId,
  deleteSchedule,
  setIsShowEdit,
}: EditScheduleProps) => {
  if (!isShow) return null;

  if (!id) return null;

  const dispatch = useDispatch();
  const { schedules } = useSelector(selectScheduleState);

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

  const editSchedule = (id: string, editedSchedule: ISchedule): void => {
    const _schedules: ISchedules = schedules.map((schedule: ISchedule) => {
      if (getId(schedule.start, schedule.end) !== id) {
        return schedule;
      } else {
        return editedSchedule;
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
      <button
        className='btn default-style btn-primary'
        onClick={() => {
          deleteSchedule(id);
        }}
      >
        삭제
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
