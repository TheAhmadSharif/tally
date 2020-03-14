import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseArray = [];
  today = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {
  }

  getExpense(expense:number) {
    this.expenseArray.push(expense);
    console.log(this.expenseArray);

  }

}
