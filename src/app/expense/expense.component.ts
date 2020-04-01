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
  expenseInput:any;
  today = new FormControl(new Date());
  total:any = 0;
  totalExpense:number = 0;

  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.getTotalExpense();


    this.firestore.collection('Tally', ref => ref.orderBy('expense.datetime').limitToLast(5)).valueChanges().subscribe(object=> {
      this.expenses = object;
   });
  
}

  getTotalExpense() {
    this.totalExpense = 0;
    this.firestore.collection('Tally', ref => ref.where('expense.amount', '>', '0')).get().subscribe(object => {
      object.forEach(doc => {
        this.totalExpense = parseInt(doc.data().expense.amount) + this.totalExpense;
     
      });
      console.log(this.totalExpense, 'this.totalExpense');

    });
    

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
    this.getTotalExpense();

  }

}
