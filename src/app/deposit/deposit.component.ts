import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


interface Deposit {
  amount: string,
  date: object,
  category: string,
  note: string
}



@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
 
  deposits:any;
  totalDeposit:any = 0;
  notification:any;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  p: number = 1;
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


  deposit:Deposit = {
    amount: '',
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    category: '',
    note: '',
  }
  
  constructor(
    private firestore: AngularFirestore,
    private router: Router
    ) {
      
  }

 

  ngOnInit(): void {
    this.totalDeposit = 0;
    this.firestore.collection('Tally', ref => ref.orderBy('deposit.datetime')).valueChanges().subscribe(object=> {
      this.deposits = object;
      this.deposits.forEach(element => {
        this.totalDeposit = element.deposit.amount + parseInt(this.totalDeposit);
       });
   }, error => {

   });
   this.getTotalDeposit();
   
}


getByDay(date:any) {
  this.totalDeposit = 0;
  var givendate = date.year + '-' + date.month + '-' + date.day;  
  this.firestore.collection('Tally', ref => ref.where('deposit.userdate', '==', givendate)).valueChanges().subscribe(object=> {
        this.deposits = object; 
        this.deposits.forEach(element => {
          this.totalDeposit = parseInt(element.deposit.amount) + this.totalDeposit;
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
          this.totalDeposit = 0;
          this.firestore.collection('Tally', ref => ref.where('deposit.userdate_ms', '>=', prevdate_ms).where('deposit.userdate_ms', '<=', nextdate_ms)).valueChanges().subscribe(object=> {
            console.log(object, 'object');
            this.deposits = object;
            this.deposits.forEach(element => {
            this.totalDeposit = element.deposit.amount + this.totalDeposit;
            });
        });
      }

  
}

getTotalDeposit() {
    this.firestore.collection('TallySummary').doc('total_deposit').get().subscribe(object => {
      this.totalDeposit = object.data().deposit.amount;  
    }, (error)=> {
      this.totalDeposit = 0;
      console.log(error, 'error44');
    });

}

addDeposit(deposit:any) {
    this.notification = null;
    var datetime = new Date().getTime();
    var d = datetime.toString(); 
    var userdate = deposit.date.year + '-' + deposit.date.month + '-' + deposit.date.day;
    var userdate_ms = new Date(userdate).getTime();
    if(deposit.amount > 0 && deposit.category.length > 1) {
      this.firestore.collection('Tally').doc(d).set({
          deposit: {
            id: datetime,
            amount: deposit.amount,
            category: deposit.category,
            transaction_type: "deposit",
            datetime: datetime,
            userdate: userdate,
            userdate_ms: userdate_ms,
            note: deposit.note,
          }

      });

      var depositAmount = parseInt(deposit.amount) + parseInt(this.totalDeposit); 
      var datetime_hr = new Date(datetime).toUTCString();
      


      this.firestore.collection('TallySummary').doc('total_deposit').set({
            deposit: {
              amount: depositAmount,
              datetime_ms: d,
              datetime_hr: datetime_hr,
              last_amount: parseInt(deposit.amount),
              last_total: parseInt(this.totalDeposit),
            }
          

      }).then(result => {
        this.getTotalDeposit();
      });




      this.deposit.amount = null;
      this.deposit.note = null;
    }
    else {
        this.notification = 'Please put the financial information correctly.'
    }
  }
getCategory(category:string) {
    this.deposit.category = category;
}

}
