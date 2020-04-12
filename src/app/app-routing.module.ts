import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DepositComponent } from './deposit/deposit.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'expense', component: ExpenseComponent},
  { path: 'deposit', component: DepositComponent},
  { path: ':category/:categoryname', component: CategoryComponent},
  { path: ':category/:categoryname/:objectId', component: DetailsComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
