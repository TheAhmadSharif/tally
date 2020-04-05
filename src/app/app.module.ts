import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseComponent } from './expense/expense.component';
import { DepositComponent } from './deposit/deposit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    DepositComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase), 
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
