import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TeachersActions from './teachers.actions';
import { TeachersEntity } from './teachers.models';

export const TEACHERS_FEATURE_KEY = 'teachers';

export interface State extends EntityState<TeachersEntity> {
  selectedId?: string | number; // which Teachers record has been selected
  loaded: boolean; // has the Teachers list been loaded
  error?: string | null; // last known error (if any)
}

export interface TeachersPartialState {
  readonly [TEACHERS_FEATURE_KEY]: State;
}

export const teachersAdapter: EntityAdapter<TeachersEntity> = createEntityAdapter<
  TeachersEntity
>();

export const initialState: State = teachersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const teachersReducer = createReducer(
  initialState,
  on(TeachersActions.loadTeachers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TeachersActions.loadTeachersSuccess, (state, { teachers }) =>
    teachersAdapter.setAll(teachers, { ...state, loaded: true })
  ),
  on(TeachersActions.loadTeachersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return teachersReducer(state, action);
}
