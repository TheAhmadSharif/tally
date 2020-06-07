import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ExpenseComponent } from './expense/expense.component';
import { FinanceSummaryComponent } from './finance-summary/finance-summary.component';
import { DetailsComponent } from './details/details.component';
import { DepositComponent } from './deposit/deposit.component';
import { ReportComponent } from './report/report.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NopageComponent } from './nopage/nopage.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, 
      children: [
        { path: 'home', component: FinanceSummaryComponent, pathMatch: 'full'},
        { path: 'expense', component: ExpenseComponent, pathMatch: 'full'},
        { path: 'deposit', component: DepositComponent, pathMatch: 'full'},        
        { path: 'report', component: ReportComponent, pathMatch: 'full'},        
        { path: 'dashboard/:category/:categoryname', component: CategoryComponent, pathMatch: 'full'},        
        { path: 'dashboard/:category/:categoryname/:objectId', component: DetailsComponent, pathMatch: 'full'},        
      ]
  },
  { path: '**', component: NopageComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
