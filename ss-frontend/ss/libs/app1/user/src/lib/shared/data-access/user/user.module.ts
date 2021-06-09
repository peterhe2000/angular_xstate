import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUserReducer from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromUserReducer.userFeatureKey,
      fromUserReducer.reducer,
      {}
    ),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [],
  providers: [UserEffects],
})
export class UserModule {}
