import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExpenseComponent } from './expense/expense.component';
import { DepositComponent } from './deposit/deposit.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { ReportComponent } from './report/report.component';

import { FinanceSummaryComponent } from './finance-summary/finance-summary.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NopageComponent } from './nopage/nopage.component';
import { ContactComponent } from './contact/contact.component';


/* State Manegement */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FinanceEffects } from './_state/finance.effects';
import { DepsoitReducer, ExpenseReducer } from './_state/finance.reducers';
import { DueComponent } from './due/due.component';


@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    DepositComponent,
    CategoryComponent,
    DetailsComponent,
    FinanceSummaryComponent,
    ReportComponent,
    LoginComponent,
    DashboardComponent,
    NopageComponent,
    ContactComponent,
    DueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxChartsModule,
    EffectsModule.forRoot([FinanceEffects]),
    StoreModule.forRoot({
      deposits: DepsoitReducer,
      expenses: ExpenseReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, // Restrict extension to log-only mode

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }