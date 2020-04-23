import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DepositComponent } from './deposit/deposit.component';
import { GraphExpenseComponent } from './graph/graph-expense/graph-expense.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NopageComponent } from './nopage/nopage.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, 
      children: [
        { path: 'home', component: HomeComponent, pathMatch: 'full'},
        { path: 'expense', component: ExpenseComponent, pathMatch: 'full'},
        { path: 'deposit', component: DepositComponent, pathMatch: 'full'},        
        { path: 'graph/expense', component: GraphExpenseComponent, pathMatch: 'full'},        
        { path: ':category/:categoryname', component: CategoryComponent, pathMatch: 'full'},        
        { path: ':category/:categoryname/:objectId', component: DetailsComponent, pathMatch: 'full'},        
      ]
  },
  { path: '**', component: NopageComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
