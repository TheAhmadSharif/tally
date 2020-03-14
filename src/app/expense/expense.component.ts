import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenses:any;
  expenseArray = [];
  expenseInput:any;
  today = new FormControl(new Date());
  total:any = 0;

  @Output() getExpenseEvent = new EventEmitter();


  constructor(private firestore: AngularFirestore) {

  firestore.collection('Tally', ref => ref.orderBy('expense.datetime').limitToLast(5)).valueChanges().subscribe(object=> {



        this.expenses = object;

        for(var i = 0; i < this.expenses.length; i++) {
            this.total = parseFloat(this.expenses[i].expense.amount) + this.total;
        }




     });

  }

  ngOnInit(): void {
  }
  getExpense(expense:number, expenseDate:any) {
    var d = new Date().getTime().toString(); 



    this.firestore.collection('Tally').doc(d).set({
        expense: {
          amount: expense,
          deposit_type: "savings",
          datetime: d,
          userdate: expenseDate
        }

    });

    this.expenseInput = null;

  }

  getTotalExpense() {
    this.getExpenseEvent.emit('event');
  }

}
