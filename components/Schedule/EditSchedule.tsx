import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { IDateTime, ISchedule, ISchedules } from '.';

import {
  selectScheduleState,
  updateSchedule,
  deleteSchedule,
} from '../../store/modules/schedule';

export interface EditScheduleProps {
  isShow: boolean;
  id: string;
  getId: VoidFunction;
  setIsShowEdit: VoidFunction;
}

const EditSchedule = ({
  isShow,
  id,
  getId,
  setIsShowEdit,
}: EditScheduleProps) => {
  if (!isShow) return null;

  if (!id) return null;

  const dispatch = useDispatch();
  const { schedules } = useSelector(selectScheduleState);

  const [title, setTitle] = React.useState('');

  const [start, setStart] = React.useState({
    date: '',
    time: '',
  });
  const [end, setEnd] = React.useState({
    date: '',
    time: '',
  });

  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    const schedule: ISchedule = schedules.find(
      (schedule: ISchedule, i: number) => {
        return getId(schedule.start, schedule.end, i) === id;
      }
    ) || {
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

    console.log(schedule);

    setTitle(schedule.title);
    setStart({
      date: moment(schedule.start.date).format('YYYY-MM-DD'),
      time: schedule.start.time,
    });
    setEnd({
      date: moment(schedule.end.date).format('YYYY-MM-DD'),
      time: schedule.end.time,
    });
    setDescription(schedule.description);
  }, [id]);

  const editScheduleEvent = (id: string, schedule: ISchedule): void => {
    dispatch(
      updateSchedule({
        id,
        schedule,
      })
    );
    setIsShowEdit(false);
  };

  const deleteScheduleEvent = (id: string) => {
    dispatch(
      deleteSchedule({
        id,
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
          setTitle(e.target.value);
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
          editScheduleEvent(id, {
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
          deleteScheduleEvent(id);
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
