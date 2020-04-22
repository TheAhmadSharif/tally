import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseComponent } from './expense/expense.component';
import { DepositComponent } from './deposit/deposit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { GraphExpenseComponent } from './graph/graph-expense/graph-expense.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NopageComponent } from './nopage/nopage.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    DepositComponent,
    CategoryComponent,
    DetailsComponent,
    HomeComponent,
    GraphExpenseComponent,
    LoginComponent,
    DashboardComponent,
    NopageComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase), 
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
