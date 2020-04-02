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
  expenseNote:any;
  expenseInput:any;
  today = new FormControl(new Date());
  total:any = 0;
  totalExpense:number = 0;
  notification:any;

  expense = {
    amount: '',
    note: ''
  }
  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.getTotalExpense();


    this.firestore.collection('Tally', ref => ref.orderBy('expense.datetime').limitToLast(20)).valueChanges().subscribe(object=> {
      this.expenses = object;
   });
  
}

  getTotalExpense() {
    this.totalExpense = 0;
    this.firestore.collection('Tally', ref => ref.where('expense.amount', '>', '0')).get().subscribe(object => {
      object.forEach(doc => {
        this.totalExpense = parseInt(doc.data().expense.amount) + this.totalExpense;
      });
    });
}

  postExpense(expenseDate:any, expenseCategory:any, expense:any) {
    this.notification = null;

    console.log(expense, expenseCategory, expenseCategory.length > 1);
    // throw new Error("My error message");
    var d = new Date().getTime().toString(); 



    if(expense.amount > 0 && expenseCategory.length > 1) {
      this.firestore.collection('Tally').doc(d).set({
          expense: {
            amount: expense.amount,
            note: expense.note,
            category: expenseCategory,
            deposit_type: "savings",
            datetime: d,
            userdate: expenseDate
          }

      });

      this.expense.amount = null;
      this.getTotalExpense();

    }
    else {
        this.notification = 'Please put the financial information correctly.'
    }
  }
  remove() {
    this.firestore.collection('Tally').doc().delete();
  }

}
