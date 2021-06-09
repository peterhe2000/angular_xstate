import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../../interfaces';
import * as UserApiActions from './user-api.actions';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State extends EntityState<User> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(UserActions.removeAllUsers, (state) => {
    return adapter.removeAll(state);
  }),
  on(
    UserApiActions.usersLoaded,
    UserApiActions.usersOddOrEvenLoaded,
    (state, action) => {
      return adapter.upsertMany(action.users, {
        ...state,
        loading: false,
        loaded: true,
        error: null,
      });
    }
  ),
  on(UserApiActions.userDeleted, (state, action) => {
    return adapter.removeOne(action.userId, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    });
  }),
  on(UserApiActions.userCreated, (state, action) => {
    return adapter.addOne(action.user, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),
  on(UserApiActions.userUpdated, (state, action) => {
    return adapter.updateOne(action.payload, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),
  on(
    UserApiActions.usersLoadedFail,
    UserApiActions.userDeletedFail,
    UserApiActions.userCreatedFail,
    UserApiActions.userUpdatedFail,
    UserApiActions.usersOddOrEvenLoadedFail,
    (state, action) => {
      return { ...state, error: action.error.stack };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
