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
  totalExpense:any;
  notification:any;
  subcategory:string;
  sub_others:boolean = false;

  expense = {
    amount: '',
    note: '',
    subcategory: 'Select a Sub category',
    others: '',
    utility_options: ['Electric Bill', 'Internet Bill', 'Market Maintainance Bill', 'Others']
  }
  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.getTotalExpense();
    this.firestore.collection('Tally', ref => ref.orderBy('expense.datetime').limitToLast(20)).valueChanges().subscribe(object=> {
      this.expenses = object;
   });
  
}
getCategory(category:string) {
    console.log(category, 'category');
    if(category === 'Utility Bill') {
        this.subcategory = 'Utility Bill';
    }
}
getSubCategory(subcategory:string) {
  console.log(subcategory, 'subcategory');
  if(subcategory=== 'Others'){
      this.sub_others = true;
  }
  else {
    this.sub_others = false;
  }
}

getTotalExpense() {

    this.firestore.collection('TallyExpense').doc('TotalExpense').get().subscribe(object => {
      this.totalExpense = object.data().totalExpense.amount;
     //  console.log(this.totalExpense, object.data(), object.data().amount, 'Object Data');
  
    }, (error)=> {
      this.totalExpense = 0;
      console.log(error, 'error44');
    });

}

  postExpense(expenseDate:any, expenseCategory:any, expense:any) {
    this.notification = null;

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
      this.getTotalExpense()

      var expenseAmount = parseInt(expense.amount) + parseInt(this.totalExpense); 
      this.firestore.collection('TallyExpense').doc('TotalExpense').set({
        totalExpense: {
            amount: expenseAmount,
            datetime: d,
          }
      });

      this.expense.amount = null;
      this.expense.note = null;
      this.getTotalExpense();

    }
    else {
        this.notification = 'Please put the financial information correctly.'
    }
  }
  

}
