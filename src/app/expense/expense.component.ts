import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { TransactionService } from '../services/transaction.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';

interface Expense {
  amount: string,
  date: object,
  category: string,
  subcategory: string,
  subcategory_others: string,
  note: string
}
interface TallySummary {
  expense_aggregate: object,
  expense_byCategory: object,
}
interface SortedIcon {
    amount: {
      icon: string,
      order: boolean
    },
    category: {
      icon: string,
      order: boolean
    },
    userdate_ms: {
      icon: string,
      order: boolean
    }
}
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {

  tallySummary: TallySummary = {
    expense_aggregate: {},
    expense_byCategory: {}
  }
  sortedIcon: SortedIcon = {
    amount: {
      icon: 'chevron down icon',
      order: true,
    },
    category: {
      icon: 'chevron down icon',
      order: true,
    },
    userdate_ms: {
      icon: 'chevron down icon',
      order: true,
    }
  };

  expenses:any;
  totalExpense:any = 0;
  notification:any;
  subcategory:string;
  sub_others:boolean = false;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  p: number = 1;
  objectPerPage:number = 10;
  placement = 'bottom';
  range:any = {
    prevdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate()
    },
    nextdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate() + 7
    }
  }
  isCollapsed:boolean = true;
  deleteNotification = null;

  expense:Expense = {
    amount: '',
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    category: '',
    subcategory: null,
    subcategory_others: null,
    note: null,
  }
  
  constructor(
    private firestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    private router: Router,
    private transactionService: TransactionService
    ) {}
  
  ngOnInit(): void {

    this.totalExpense = 0;
    this.firestore.collection('expense').valueChanges().subscribe(object=> {

      this.expenses = object;


    }, error => {

    });
     
  this.getTotalExpense();
   
} 
 
getDataSort(sorting_type:any) {
    var sortingType = sorting_type;
    this.sortedIcon[sortingType].order =! this.sortedIcon[sortingType].order;
    if(this.sortedIcon[sortingType].order) {
      var sortedDataDesc = _.sortBy(this.expenses, [function(o) { return o.expense[sortingType]}]);
      this.expenses = sortedDataDesc;
      this.sortedIcon[sorting_type].icon = 'chevron down icon';
    }
    else {
        var sortedDataAsc = _.sortBy(this.expenses, [function(o) { return o.expense[sortingType];}]).reverse();
        this.expenses = sortedDataAsc;
        this.sortedIcon[sorting_type].icon = 'chevron up icon';
    }
 }             
     
getTotalExpense() {
  this.transactionService.getTransactionSummary().subscribe(object => {
    object.forEach((item:any) => {
              if(item.expense_aggregate) {
                this.totalExpense = this.tallySummary.expense_aggregate = item.expense_aggregate.amount;
              }
              if(item.expense_byCategory) {
                  this.tallySummary.expense_byCategory = item.expense_byCategory;
              }
    })
        
  }, (error)=> {
    this.totalExpense = 0;
  });
  
}

addExpense(expense:any) {
    var expense_category = expense.category;
    this.notification = null;
    var datetime = new Date().getTime();
    var d = datetime.toString(); 
    var userdate = expense.date.year + '-' + expense.date.month + '-' + expense.date.day;
    var userdate_ms = new Date(userdate).getTime();
    var expenseAmount = parseInt(expense.amount) + parseInt(this.totalExpense); 
    var expense_byCategoryObject = this.tallySummary.expense_byCategory;
    if(expense_byCategoryObject[expense_category] && expense_byCategoryObject[expense_category].amount) {
        var last_category_amount = parseInt(expense_byCategoryObject[expense_category].amount);
        var new_category_amount = last_category_amount + parseInt(expense.amount);
    }
    else {
      var new_category_amount = parseInt(expense.amount);
      var last_category_amount = 0;
    }


    expense_byCategoryObject[expense_category] = {
        amount: new_category_amount,
        category: expense.category,
        id: datetime,
        last_amount: parseInt(expense.amount),
        last_total: last_category_amount
    } 

    if(expense.amount > 0 && expense.category.length > 1) {
      this.firestore.collection('expense').doc(d).set({
            
            id: datetime,
            amount: expense.amount,
            category: expense.category,
            subcategory: expense.subcategory,
            subcategory_others: expense.subcategory_others,
            userdate: userdate,
            userdate_ms: userdate_ms,
            note: expense.note,
         

      });
      
      this.firestore.collection('tally_summary').doc('total_expense').set({
              expense_aggregate: {
                  amount: expenseAmount,
                  datetime_ms: d,
                  last_amount: parseInt(expense.amount),
                  last_total: parseInt(this.totalExpense),
                  last_expense_type: expense_category
              },
             expense_byCategory: expense_byCategoryObject
      }).then(result => {
        this.getTotalExpense();

        this.notification = 'Document has been added successfully';

         setTimeout(result =>  {
              this.notification = null;                      
          }, 2000);


      }).then((response) => {
      });
      this.expense.amount = null;
      this.expense.note = null;
    }
    else {
        this.notification = 'Please fill up the form correctly.';

        setTimeout(() =>  {
              this.notification = null;                      
          }, 2000);
    }
  }
removeObject(object:any) {
  var id = object.id.toString();
  var category = object.category;
  var expenseAmount = parseInt(this.totalExpense) - parseInt(object.amount);

  var datetime = new Date().getTime();
  var d = datetime.toString(); 


   // throw new Error("Hi");
   var r = confirm("Are you sure you want to delete this Item?");
   /* End Expense Category */
   if (r == true) {

     if(this.tallySummary.expense_byCategory[category] && this.tallySummary.expense_byCategory[category].amount) {
        var last_category_amount = parseInt(this.tallySummary.expense_byCategory[category].amount);
        var new_category_amount = last_category_amount - parseInt(object.amount);
        var expense_byCategory = this.tallySummary.expense_byCategory; 


        //throw new Error("Hi");
         expense_byCategory[category] = {
              amount: new_category_amount,
              category: category,
              datetime_ms: d,
              id: datetime,
              last_amount: parseInt(object.amount),
              last_total: last_category_amount,
              last_action_type: 'Delete'
          } 

         this.firestore.collection("expense").doc(id).delete().then(result => {
           this.deleteNotification = 'Document successfully deleted!'; 

            setTimeout(result =>  {
              this.deleteNotification = null;                      
          }, 1500);


              this.firestore.collection('tally_summary').doc('total_expense').set({
              expense_aggregate: {
                  amount: expenseAmount,
                  datetime_ms: d,
                  last_amount: parseInt(object.amount),
                  last_total: parseInt(this.totalExpense),
                  last_expense_type: category,
                  last_action_type: 'Delete'
              },
             expense_byCategory: expense_byCategory
              }).then(result => {
                this.getTotalExpense();
              });

          }).catch(function(error) {
          });
    }

   /* Expense Category */
   
         
  } else {

  } 
}
/* End Remove */
getCategory(category:string) {
    this.expense.category = category;
}
getSubCategory(subcategory:string) {
  this.expense.subcategory = subcategory;
  if(subcategory=== 'Others'){
      this.sub_others = true;
  }
  else {
    this.sub_others = false;
  }
}
getByDay(date:any) {
  this.totalExpense = 0;
  var givendate = date.year + '-' + date.month + '-' + date.day;  
  this.firestore.collection('expense', ref => ref.where('userdate', '==', givendate)).valueChanges().subscribe(object=> {
        this.expenses = object; 
        this.expenses.forEach((element:any) => {
          this.totalExpense = parseInt(element.amount) + this.totalExpense;
        });
    },
    error => {

    });
}
getPrevDate(date:any) {
  var day = new Date(date.year + '-' + date.month + '-' + date.day);
  var nextDay = new Date(day);
  var nd = nextDay.setDate(day.getDate() - 1); 
  var d1 = new Date(nd);
  this.selected_day = {
    year: d1.getFullYear(),
    month: d1.getMonth() + 1,
    day: d1.getDate()
  };
}
getNextDate(date:any) {
  var day = new Date(date.year + '-' + date.month + '-' + date.day);
  var nextDay = new Date(day);
  var nd = nextDay.setDate(day.getDate() + 1); 

  var d1 = new Date(nd);
 
  this.selected_day = {
    year: d1.getFullYear(),
    month: d1.getMonth() + 1,
    day: d1.getDate()
  };

}
getByRange(range:any) {

  var prevdate = range.prevdate.year + '-' + range.prevdate.month + '-' + range.prevdate.day;
  var prevdate_ms = new Date(prevdate).getTime();

  var nextdate = range.nextdate.year + '-' + range.nextdate.month + '-' + range.nextdate.day;
  var nextdate_ms = new Date(nextdate).getTime();

      if(prevdate_ms < nextdate_ms) {
          this.totalExpense = 0;
          this.firestore.collection('expense', ref => ref.where('userdate_ms', '>=', prevdate_ms).where('userdate_ms', '<=', nextdate_ms)).valueChanges().subscribe(object=> {
            this.expenses = object;
            this.expenses.forEach((element:any) => {
            this.totalExpense = element.amount + this.totalExpense;
            });
        });
      }
}
getPerPage(item) {

}
}