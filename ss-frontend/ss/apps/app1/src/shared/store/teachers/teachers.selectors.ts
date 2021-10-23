import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TEACHERS_FEATURE_KEY,
  State,
  TeachersPartialState,
  teachersAdapter,
} from './teachers.reducer';

// Lookup the 'Teachers' feature state managed by NgRx
export const getTeachersState = createFeatureSelector<
  TeachersPartialState,
  State
>(TEACHERS_FEATURE_KEY);

const { selectAll, selectEntities } = teachersAdapter.getSelectors();

export const getTeachersLoaded = createSelector(
  getTeachersState,
  (state: State) => state.loaded
);

export const getTeachersError = createSelector(
  getTeachersState,
  (state: State) => state.error
);

export const getAllTeachers = createSelector(getTeachersState, (state: State) =>
  selectAll(state)
);

export const getTeachersEntities = createSelector(
  getTeachersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getTeachersState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getTeachersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
