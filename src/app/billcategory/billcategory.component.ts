import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';



@Component({
  selector: 'app-billcategory',
  templateUrl: './billcategory.component.html',
  styleUrls: ['./billcategory.component.css']
})
export class BillCategoryComponent implements OnInit {
  parameter:string;
  totalExpense:number = 0;
  expenses:any;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
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

  constructor( private route: ActivatedRoute,
    private firestore: AngularFirestore) { 
    this.parameter = this.route.snapshot.paramMap.get('type');

  }

  ngOnInit(): void {
    this.firestore.collection('Tally', ref => ref.where('expense.category', '==', this.parameter)).valueChanges().subscribe(object=> {
      this.expenses = object;
      this.expenses.forEach(element => {
       this.totalExpense = element.expense.amount + this.totalExpense;
      });

   });

  }


  getByDay(date:any) {
    this.totalExpense = 0;
    var givendate = date.year + '-' + date.month + '-' + date.day;  
    this.firestore.collection('Tally', ref => ref.where('expense.category', '==', this.parameter).where('expense.userdate', '==',givendate)).valueChanges().subscribe(object=> {
          this.expenses = object; 
          this.expenses.forEach(element => {
            this.totalExpense = parseInt(element.expense.amount) + this.totalExpense;
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
    console.log(prevdate_ms, nextdate_ms, 'prevdate_ms', 'nextdate_ms');

  
        if(prevdate_ms < nextdate_ms) {
            this.totalExpense = 0;
            this.firestore.collection('Tally', ref => ref.where('expense.category', '==', this.parameter).where('expense.userdate_ms', '>=', prevdate_ms).where('expense.userdate_ms', '<=', nextdate_ms)).valueChanges().subscribe(object=> {
              console.log(object, 'object');
              this.expenses = object;
              this.expenses.forEach(element => {
              this.totalExpense = element.expense.amount + this.totalExpense;
              });
          });
        }
  
    
  }
  

}
