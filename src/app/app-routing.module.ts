import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillcategoryComponent } from './billcategory/billcategory.component';
import { ExpenseComponent } from './expense/expense.component';


const routes: Routes = [
  { path: ' ',  component: ExpenseComponent}, 
  { path: 'category/:billtype', component: BillcategoryComponent},


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
