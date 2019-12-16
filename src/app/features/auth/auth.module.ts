import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { featureName, reducers } from './reducers';
import { LoginEffects } from './effects/login.effect';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([LoginEffects])
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
