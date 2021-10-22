import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CardModule } from '@ss/mp-component-library';

@NgModule({
  imports: [
    /* 3rd party modules */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /* component library modules */
    CardModule,

    /* common library modules */

    /* internal modules */
  ],
  exports: [
    /* 3rd party modules */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /* component library modules */
    CardModule,

    /* common library modules */

    /* internal modules */
  ],
})
export class SharedModule {}
