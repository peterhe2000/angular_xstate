import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app1-user-routing.module';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { UserModule } from './shared/data-access/user/user.module';
import { UserService } from './shared/services/userService.service';
import { AddUserComponent } from './user/components/add-user/add-user.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { UserContainerComponent } from './user/container/user-container.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
  ],
  declarations: [
    UserContainerComponent,
    NameFilterPipe,
    UserListComponent,
    AddUserComponent,
  ],
  providers: [UserService],
})
export class App1UserModule {}
