import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillCategoryComponent } from './billcategory/billcategory.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { DepositComponent } from './deposit/deposit.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'expense', component: ExpenseComponent},
  { path: 'deposit', component: DepositComponent},
  { path: 'category/:type', component: BillCategoryComponent},
  { path: ':type/:object', component: ExpenseDetailsComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
