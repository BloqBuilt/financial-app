import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { ProfileSelectorService } from './profile.selector';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffect } from './profile.effect';
import { BaseHttpService } from '../../api/base-http/base-http.service';

const components = [ProfileComponent];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    NgrxFormsModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    EffectsModule.forFeature([ProfileEffect]),
  ],
  providers: [BaseHttpService, ProfileSelectorService],
  declarations: components,
  exports: components,
})
export class ProfileModule {}
