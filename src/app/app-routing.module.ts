import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillCategoryComponent } from './billcategory/billcategory.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';


const routes: Routes = [
  { path: '', component: ExpenseComponent},
  { path: 'category/:type', component: BillCategoryComponent},
  { path: ':type/:object', component: ExpenseDetailsComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
