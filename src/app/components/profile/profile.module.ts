import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ProfileComponent } from './profile.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { profileReducer } from './profile.reducer';
import { ProfileSelectorService } from './profile.selector';

const components = [ProfileComponent];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    NgrxFormsModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    StoreModule.forFeature('profile', profileReducer),
  ],
  providers: [ProfileSelectorService],
  declarations: components,
  exports: components,
})
export class ProfileModule {}
