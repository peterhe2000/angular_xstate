import { createAction, props } from '@ngrx/store';
import { TeachersEntity } from './teachers.models';

export const loadTeachers = createAction('[Teachers] Load Teachers');

export const loadTeachersSuccess = createAction(
  '[Teachers] Load Teachers Success',
  props<{ teachers: TeachersEntity[] }>()
);

export const loadTeachersFailure = createAction(
  '[Teachers] Load Teachers Failure',
  props<{ error: any }>()
);
