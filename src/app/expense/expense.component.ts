import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

interface Expense {
  amount: string,
  date: object,
  category: string,
  subcategory: string,
  subcategory_others: string,
  utility_options: string[],
  note: string
}

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {

  single: any[] = [
    {
      "name": "Utility",
      "value": 1400,
    },
    {
      "name": "Foods",
      "value": 3500
    },
    {
      "name": "Salary",
      "value": 15000
    }
  ];

  view: any[] = [350, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Expenditure Category';
  showYAxisLabel = true;
  yAxisLabel = 'Expenditure';

  colorScheme = {
    domain: ['#ffc107', '#28a745', '#28a745', '#AAAAAA']
  };

  chartdata:any;
  expenses:any;
  totalExpense:any;
  notification:any;
  subcategory:string;
  sub_others:boolean = false;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  p: number = 1;
  placement = 'bottom';

  expense:Expense = {
    amount: '',
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    category: '',
    subcategory: '',
    subcategory_others: '',
    utility_options: ['Electric Bill', 'Internet Bill', 'Market Maintainance Bill', 'Others'],
    note: '',
  }
  
  constructor(
    private firestore: AngularFirestore,
    private router: Router
    ) {
      Object.assign(this.single)
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.getTotalExpense();
    this.firestore.collection('Tally', ref => ref.orderBy('expense.datetime')).valueChanges().subscribe(object=> {
      this.expenses = object;
      
   });
}
getCategory(category:string) {
    this.expense.category = category;
}
getSubCategory(subcategory:string) {
  console.log(subcategory, 'subcategory');
  this.expense.subcategory = subcategory;
  if(subcategory=== 'Others'){
      this.sub_others = true;
  }
  else {
    this.sub_others = false;
  }
}

getDayData(date:any) {

  this.totalExpense = 0;

  var givendate = date.month + '/' + date.day + '/' + date.year; 


  this.firestore.collection('Tally', ref => ref.where('expense.userdate', '==', givendate)).valueChanges().subscribe(object=> {
        this.expenses = object; 
        this.expenses.forEach(element => {
      
          this.totalExpense = parseInt(element.expense.amount) + this.totalExpense;
        });
    });
   
    

}

getTotalExpense() {

    this.firestore.collection('TallyExpense').doc('TotalExpense').get().subscribe(object => {
      this.totalExpense = object.data().totalExpense.amount;
  
    }, (error)=> {
      this.totalExpense = 0;
      console.log(error, 'error44');
    });

}

  postExpense(expense:any) {
    this.notification = null;

    var d = new Date().getTime().toString(); 
    var userdate = expense.date.month + '/' + expense.date.day + '/' + expense.date.year;
    console.log(expense);
    if(expense.amount > 0 && expense.category.length > 1) {
      this.firestore.collection('Tally').doc(d).set({
          expense: {
            amount: expense.amount,
            note: expense.note,
            category: expense.category,
            subcategory: expense.subcategory,
            subcategory_others: expense.subcategory_others,
            deposit_type: "savings",
            datetime: d,
            userdate: userdate
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
