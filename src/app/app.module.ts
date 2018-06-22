import { NgModule } from '@angular/core';

// Common Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeStore } from './app.reducer';
import { routes } from './app.router';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    initializeStore(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
