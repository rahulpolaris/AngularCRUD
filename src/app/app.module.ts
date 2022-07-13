import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { InputnumberDirective } from './shared/Directives/inputnumber.directive';
import { AgeValidationDirective } from './shared/Directives/age-validation.directive';
import { DobFormatterDirective } from './shared/Directives/dob-formatter.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    InputnumberDirective,
    AgeValidationDirective,
    DobFormatterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
