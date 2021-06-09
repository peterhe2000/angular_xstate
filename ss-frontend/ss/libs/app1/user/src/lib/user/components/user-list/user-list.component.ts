import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../../../../../../apps/app1/src/environments/environment';
import { User } from '../../../shared';
import { SstStateMachine } from '../../../shared/services/sstStateMachine';
import { InterpretedService } from '../../../shared/services/sstStateMachineTypes';
import { userListMachine } from './user-list.machine';

@Component({
  selector: 'ss-user-list',
  providers: [SstStateMachine],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @Input() usersLoading: boolean;
  @Input() users: User[];
  @Output() deleteUser = new EventEmitter<{ userId: number }>();
  @Output() nameChange = new EventEmitter<{ user: User; userId: number }>();
  @Output() optionChange = new EventEmitter<{ isOdd: boolean }>();

  // Todo: strong type service
  userListStateService: InterpretedService<any, any, any> = this.sstStateMachine.useMachine(userListMachine, {
    id: 'user-list State',
    devTools: !environment.production,
  });
  currentState: any;
  formGroup: FormGroup;

  filterText: string;
  options: string[] = ['odd', 'even'];

  constructor(
    private formBuilder: FormBuilder,
    private readonly sstStateMachine: SstStateMachine<any, any, any>
  ) {
    this._buildForm();
  }

  ngOnInit(): void {
    this.userListStateService.state$.subscribe((state) => {
      this.currentState = state;
    });

    // TODO:
    this.formGroup.get('selectedOption').valueChanges
      .subscribe((_selectedOption) => {
        console.log({_selectedOption});
      });
  }

  onDeleteButtonClick(userId: number) {
    this.deleteUser.emit({ userId });
  }

  onNameChange(name: string, userId: number) {
    const user: User = { id: userId, name: name };
    this.nameChange.emit({ user: user, userId: userId });
  }

  onOptionChange($event) {
    this.userListStateService.send({ type: 'TOGGLE' });
    const { value } = this.formGroup.get('selectedOption');
    const isOdd = value === 'odd';
    this.optionChange.emit({ isOdd });
  }

  private _buildForm() {
    this.formGroup = this.formBuilder.group({
      selectedOption: null,
    });
  }
}
