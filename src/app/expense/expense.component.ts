import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseArray = [];

  constructor() { }

  ngOnInit(): void {
  }

  getExpense(expense:number) {
    this.expenseArray.push(expense);
    console.log(this.expenseArray);

  }

}
