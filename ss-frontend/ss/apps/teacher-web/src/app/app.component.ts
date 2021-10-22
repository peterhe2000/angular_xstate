import { Component } from '@angular/core';
import { TeacherTypeEnum } from '@ss/mpcommon-library';

@Component({
  selector: 'ss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'teacher-web';
  public readonly teacherType: TeacherTypeEnum = TeacherTypeEnum.TEACHER;
}
