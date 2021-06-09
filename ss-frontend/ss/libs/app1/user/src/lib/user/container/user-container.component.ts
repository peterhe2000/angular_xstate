import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  Observable,
  of,
  Subject
} from 'rxjs';
import * as UserActions from '../../shared/data-access/user/+state/user.actions';
import * as fromUser from '../../shared/data-access/user/+state/user.reducer';
import * as fromUserStore from '../../shared/data-access/user/+state/index';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../shared/interfaces';

@Component({
  selector: 'ss-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserContainerComponent implements OnInit, OnDestroy {
  usersLoading$: Observable<boolean>;
  users$: Observable<User[]>;
  error$: Observable<string>;

  private _destroyed$ = new Subject<void>();

  constructor(private store: Store<fromUser.State>) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.users$ = of([
      { id: 1, name: 'Peter' },
      { id: 2, name: 'Sam' },
      { id: 3, name: 'Jo' },
      { id: 4, name: 'Marie' },
    ]);
    // this.usersLoading$ = this.store.pipe(
    //   select(fromUserStore.getUsersLoading),
    //   takeUntil(this._destroyed$)
    // );
    // this.users$ = this.store.pipe(
    //   select(fromUserStore.getUsers),
    //   takeUntil(this._destroyed$)
    // );
    this.error$ = this.store.pipe(
      select(fromUserStore.getError),
      takeUntil(this._destroyed$)
    );
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onDeleteUser({ userId }) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  onAddUser({ name }) {
    this.store.dispatch(UserActions.createUser({ name }));
  }

  onNameChange({ user, userId }) {
    this.store.dispatch(UserActions.updateUser({ user: user, userId: userId }));
  }

  onOptionChange({ isOdd }) {
    this.store.dispatch(UserActions.loadUsersOddOrEven({ isOdd }));
  }
}
