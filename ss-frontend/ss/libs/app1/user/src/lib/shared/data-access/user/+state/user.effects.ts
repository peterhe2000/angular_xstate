import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  map,
  catchError,
  switchMap,
  concatMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import * as UserApiActions from './user-api.actions';
import { UserService } from '../../../services/userService.service';
import { User } from '../../../interfaces';
import { Update } from '@ngrx/entity';

@Injectable()
export class UserEffects {
  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActions.loadUsers),
    exhaustMap(() =>
      this.userService.getUsers().pipe(
        map((response) =>
          UserApiActions.usersLoaded({
            users: response,
          })
        ),
        catchError((error) => of(UserApiActions.usersLoadedFail({ error })))
      )
    )
  );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType(UserActions.deleteUser),
    concatMap((action) =>
      this.userService.deleteUser(action.userId).pipe(
        map(() =>
          UserApiActions.userDeleted({
            userId: action.userId,
          })
        ),
        catchError((error) => of(UserApiActions.userDeletedFail({ error })))
      )
    )
  );

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType(UserActions.createUser),
    switchMap((action) =>
      this.userService.createUser(action.name).pipe(
        map((response) =>
          UserApiActions.userCreated({
            user: response,
          })
        ),
        catchError((error) => of(UserApiActions.userCreatedFail({ error })))
      )
    )
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(UserActions.updateUser),
    switchMap((action) =>
      this.userService.updateUser(action.user, action.userId).pipe(
        map((user: User) =>
          UserApiActions.userUpdated({
            payload: <Update<User>>{
              id: user.id,
              changes: {
                name: user.name,
              },
            },
          })
        ),
        catchError((error) => of(UserApiActions.userUpdatedFail({ error })))
      )
    )
  );

  @Effect()
  loadUsersOddOrEven$ = this.actions$.pipe(
    ofType(UserActions.loadUsersOddOrEven),
    exhaustMap((action) =>
      this.userService.getUsers(action.isOdd).pipe(
        concatMap((response) => [
          UserActions.removeAllUsers(),
          UserApiActions.usersOddOrEvenLoaded({
            users: response,
          }),
        ]),
        catchError((error) =>
          of(UserApiActions.usersOddOrEvenLoadedFail({ error }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
