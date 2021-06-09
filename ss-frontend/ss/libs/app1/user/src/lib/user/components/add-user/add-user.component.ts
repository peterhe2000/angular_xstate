import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ss-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnInit {
  @Output() addUser = new EventEmitter<{ name: string }>();

  name: string;

  constructor() {}

  ngOnInit(): void {}

  onAddUser(name: string) {
    this.addUser.emit({ name });
    this.name = null;
  }
}
