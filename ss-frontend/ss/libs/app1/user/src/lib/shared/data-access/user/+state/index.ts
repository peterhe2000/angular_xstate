import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user.reducer';
import * as fromUserReducer from './user.reducer';
import { User } from '../../../interfaces';

export const getUserState = createFeatureSelector<State>(
  fromUserReducer.userFeatureKey
);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = fromUserReducer.adapter.getSelectors(getUserState);

export const getUsersLoading = createSelector(
  getUserState,
  (state) => state.loading
);

export const getError = createSelector(getUserState, (state) => state.error);

export const getUsers = createSelector(getAllUsers, (users: User[]) =>
  !users ? [] : users
);
