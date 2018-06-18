import { NgModule } from '@angular/core';

// Common Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { UiModule } from './ui/ui.module';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeStore } from './app.reducer';
import { routes } from './app.router';

// Services
import { BaseHttpService } from './api/base-http/base-http.service';
import { ProfileSelectorService } from './store/selectors/profile.selector';
import { AssetSelectorService } from './store/selectors/asset.selector';
import { CashFlowSelectorService } from './store/selectors/cash-flow.selector';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    initializeStore(),
    UiModule,
  ],
  providers: [
    BaseHttpService,
    AssetSelectorService,
    ProfileSelectorService,
    CashFlowSelectorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
