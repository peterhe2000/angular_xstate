import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  Action,
  StoreModule
} from '@ngrx/store';
import {
  MockStore,
  provideMockStore
} from '@ngrx/store/testing';
import {
  API_BASE_URL as USER_API_BASE_URL,
  User
} from '@ss/app1/user';
import {
  render,
  screen,
  within,
} from '@testing-library/angular';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { Subject } from 'rxjs';
import { AppRoutingModule } from '../../../app1-user-routing.module';
import { NameFilterPipe } from '../../../pipes/name-filter.pipe';
import * as fromUserStore from '../../../shared/data-access/user/+state';
import * as UserActions from '../../../shared/data-access/user/+state/user.actions';
import { userReducer } from '../../../shared/data-access/user/+state/user.reducer';
import { UserModule } from '../../../shared/data-access/user/user.module';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserContainerComponent } from '../user-container.component';

async function testRenderSetUp(mockUsers: User[], actions$: Subject<Action>) {
  await render(UserContainerComponent, {
    imports: [
      CommonModule,
      AppRoutingModule,
      HttpClientModule,
      UserModule,
      FormsModule,
      ReactiveFormsModule,
      MatRadioModule,
      MatInputModule,
      StoreModule.forRoot(
        {
          value: userReducer,
        },
        {
          runtimeChecks: {},
        },
      ),
      EffectsModule.forRoot([]),
    ],
    declarations: [
      NameFilterPipe,
      UserListComponent,
      AddUserComponent,
    ],
    providers: [
      {
        provide: USER_API_BASE_URL,
        useValue: 'mock_api_base_url',
      },
      provideMockStore({
        initialState: {
          user: {
            loading: false,
            loaded: false,
            error: null,
          }
        },
        selectors: [
          { selector: fromUserStore.getUsersLoading, value: false },
          {
            selector: fromUserStore.getUsers, value: mockUsers,
          },
        ]
      }),
      provideMockActions(() => actions$),
    ],
  });
}

it('should render the userList and filter userList by userName', async () => {
  const actions$: Subject<Action> = new Subject();
  const mockUsers: User[] = [
    { id: 1, name: 'Peter' },
    { id: 2, name: 'Sam' },
    { id: 3, name: 'Jo' },
    { id: 4, name: 'Marie' },
  ];
  await testRenderSetUp(mockUsers, actions$);
  const store = TestBed.inject(MockStore);
  store.dispatch = jest.fn();

  mockUsers.forEach(({id, name}) => {
    const row = screen.getByText(id).closest("tr");
    const utils = within(row);
    expect(utils.getByText(id)).toBeInTheDocument();
    expect(utils.getByTestId('userNameInput')).toHaveValue(name);
  });

  const filterName = 'Peter';
  const filterNameControl = screen.getByRole('textbox', {
    name: /please add a string to filter/i
  })
  userEvent.type(filterNameControl, filterName);

  const tableCell = screen.getByRole('cell', { name: /peter/i });
  expect(within(tableCell).getByTestId('userNameInput')).toHaveValue(filterName);
  const userNameInputs = screen.getAllByTestId('userNameInput');
  expect(userNameInputs).toHaveLength(1);

  // screen.debug(undefined, 300000)
});

it('should invoke valid actions when add, delete', async () => {
  const actions$: Subject<Action> = new Subject();
  const mockUsers: User[] = [
    { id: 1, name: 'Peter' },
    { id: 2, name: 'Sam' },
    { id: 3, name: 'Jo' },
    { id: 4, name: 'Marie' },
  ];
  await testRenderSetUp(mockUsers, actions$);
  const store = TestBed.inject(MockStore);
  store.dispatch = jest.fn();

  const addNameControl = screen.getByRole('textbox', { name: /please add a name/i });
  const addControl = screen.getByRole('button', { name: /add/i });

  const addUserName = 'Test User';
  userEvent.clear(addNameControl);
  userEvent.type(addNameControl, addUserName);
  userEvent.click(addControl);
  expect(store.dispatch).toHaveBeenCalledWith(UserActions.createUser( {name: addUserName}))

  const row = screen.getByRole('row', { name: /1 peter delete/i });
  userEvent.click(within(row).getByRole('button', { name: /delete/i }));
  expect(store.dispatch).toHaveBeenCalledWith(UserActions.deleteUser( {userId: 1}))
});
