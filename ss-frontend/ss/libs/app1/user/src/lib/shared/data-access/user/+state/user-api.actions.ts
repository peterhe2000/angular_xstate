import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { User } from '../../../interfaces';

export const usersLoaded = createAction(
  '[User API] Users Loaded Success',
  props<{ users: User[] }>()
);

export const usersLoadedFail = createAction(
  '[User API] Users Loaded Fail',
  props<{ error: Error }>()
);

export const usersOddOrEvenLoaded = createAction(
  '[User API] Users Odd Or Even Loaded Success',
  props<{ users: User[] }>()
);

export const usersOddOrEvenLoadedFail = createAction(
  '[User API] Users Odd Or Even Loaded Fail',
  props<{ error: Error }>()
);

export const userDeleted = createAction(
  '[User API] User Deleted Success',
  props<{ userId: number }>()
);

export const userDeletedFail = createAction(
  '[User API] User Deleted Fail',
  props<{ error: Error }>()
);

export const userCreated = createAction(
  '[User API] User Created Success',
  props<{ user: User }>()
);

export const userCreatedFail = createAction(
  '[User API] User Created Fail',
  props<{ error: Error }>()
);

export const userUpdated = createAction(
  '[User API] User Updated Success',
  props<{ payload: Update<User> }>()
);

export const userUpdatedFail = createAction(
  '[User API] User Updated Fail',
  props<{ error: Error }>()
);
