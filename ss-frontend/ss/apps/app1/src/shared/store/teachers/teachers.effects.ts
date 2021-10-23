import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromTeachers from './teachers.reducer';
import * as TeachersActions from './teachers.actions';

@Injectable()
export class TeachersEffects {
  loadTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeachersActions.loadTeachers),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return TeachersActions.loadTeachersSuccess({ teachers: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TeachersActions.loadTeachersFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
