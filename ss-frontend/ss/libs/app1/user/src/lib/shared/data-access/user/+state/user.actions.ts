import { createAction, props } from '@ngrx/store';
import { User } from '../../../interfaces';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersOddOrEven = createAction(
  '[User] Load Users Odd Or Even',
  props<{ isOdd: boolean }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: number }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{ name: string }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User; userId: number }>()
);

export const removeAllUsers = createAction('[User] Remove All Users');
