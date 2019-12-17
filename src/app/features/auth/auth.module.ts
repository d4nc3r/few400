import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { featureName, reducers } from './reducers';
import { LoginEffects } from './effects/login.effect';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([LoginEffects])
  ],
  exports: [LoginComponent]
})
export class AuthModule {
  // IMPORTANT (this is really poorly documented)
  static forRoot() {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
}
