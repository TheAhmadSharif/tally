import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { TransactionService } from '../services/transaction.service';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


interface Deposit {
  amount: string,
  date: object,
  category: string,
  note: string
}

interface TallySummary {
  deposit_aggregate: object,
  deposit_byCategory: object,
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
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  tallySummary: TallySummary = {
    deposit_aggregate: {},
    deposit_byCategory: {}
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
 
  deposits:any;
  totalDeposit:any = 0;
  notification:any;
  deleteNotification:any;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  p: number = 1;
  placement = 'bottom';
  objectPerPage:number = 10;
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
  depositCollapse:boolean = true;


  deposit:Deposit = {
    amount: '',
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    category: null,
    note: null,
  }
  
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private transactionService: TransactionService
    ) {
      
  }
ngOnInit(): void {
    this.totalDeposit = 0;
    this.firestore.collection('deposit').valueChanges().subscribe(object=> {
      this.deposits = object;
    });
    this.getTotalDeposit();
}

getDataSort(sorting_type:any) {
  var sortingType = sorting_type;
  this.sortedIcon[sortingType].order =! this.sortedIcon[sortingType].order;
  if(this.sortedIcon[sortingType].order) {
    var sortedDataDesc = _.sortBy(this.deposits, [function(o) { return o[sortingType]}]);
    this.deposits = sortedDataDesc;
    this.sortedIcon[sorting_type].icon = 'chevron down icon'; 
  }
  else {
    var sortedDataAsc = _.sortBy(this.deposits, [function(o) { return o[sortingType];}]).reverse();
    this.deposits = sortedDataAsc;
    this.sortedIcon[sorting_type].icon = 'chevron up icon';  
  }
}
getTotalDeposit() {
  this.totalDeposit = 0;
  this.transactionService.getTransactionSummary().subscribe(object => {


      object.forEach((item:any) => {
                if(item.deposit_aggregate) {
                  this.totalDeposit = this.tallySummary.deposit_aggregate = item.deposit_aggregate.amount;
                }
                if(item.deposit_byCategory) {
                    this.tallySummary.deposit_byCategory = item.deposit_byCategory;
                }
      })
        
  }, (error)=> {
    this.totalDeposit = 0;
  });
}


addDeposit(deposit:any) {
    this.notification = null;
    var deposit_category = deposit.category;
    var datetime = new Date().getTime();
    var d = datetime.toString(); 

    var userdate = deposit.date.year + '-' + deposit.date.month + '-' + deposit.date.day;
    var userdate_ms = new Date(userdate).getTime();
    var depositAmount = parseInt(deposit.amount) + parseInt(this.totalDeposit); 

    var deposit_byCategoryObject = this.tallySummary.deposit_byCategory;


    if(deposit_byCategoryObject[deposit_category] && deposit_byCategoryObject[deposit_category].amount) {
        var last_category_amount = parseInt(deposit_byCategoryObject[deposit_category].amount);
        var new_category_amount = last_category_amount + parseInt(deposit.amount);

    }
    else {
      var new_category_amount = parseInt(deposit.amount);
      var last_category_amount = 0;
    }

    deposit_byCategoryObject[deposit_category] = {
        amount: new_category_amount,
        category: deposit.category,
        datetime_ms: d,
        id: datetime,
        last_amount: parseInt(deposit.amount),
        last_total: last_category_amount
    } 


    if(deposit.amount > 0) {


      this.firestore.collection('deposit').doc(d).set({

            id: datetime,
            amount: deposit.amount,
            category: deposit.category,
            userdate: userdate,
            userdate_ms: userdate_ms,
            note: deposit.note,
         

      }).then(a => {
      }).catch(function(error) {
      });

      this.firestore.collection('tally_summary').doc('total_deposit').set({
        deposit_aggregate: {
          amount: depositAmount,
          last_deposit_type: deposit_category,
          datetime_ms: d,
          last_amount: parseInt(deposit.amount),
          last_total: parseInt(this.totalDeposit)
        },
        deposit_byCategory: deposit_byCategoryObject
  }).then(result => {
    this.getTotalDeposit();
  });
      this.deposit.amount = null;
      this.deposit.note = null;

      this.notification = 'Document has been added successfully';
                
      setTimeout(a =>  {
          this.notification = null;    

      }, 2500);



    }
    else {
        this.notification = 'Please put the financial information correctly.';
        
    }
  }
getCategory(category:string) {
    this.deposit.category = category;
}
getByDay(date:any) {
  this.totalDeposit = 0;
  var givendate = date.year + '-' + date.month + '-' + date.day;  
  this.firestore.collection('deposit', ref => ref.where('userdate', '==', givendate)).valueChanges().subscribe(object=> {
        this.deposits = object; 
        this.deposits.forEach(element => {
          this.totalDeposit = parseInt(element.amount) + this.totalDeposit;
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
          this.totalDeposit = 0;
          this.firestore.collection('deposit', ref => ref.where('userdate_ms', '>=', prevdate_ms).where('userdate_ms', '<=', nextdate_ms)).valueChanges().subscribe(object=> {
            this.deposits = object;
            this.deposits.forEach(element => {
            this.totalDeposit = element.amount + this.totalDeposit;
            });
        });
      }
}

removeObject(object:any) {
  var id = object.id.toString();
  var category = object.category;
  var depositAmount = parseInt(this.totalDeposit) - parseInt(object.amount);

  var datetime = new Date().getTime();
  var d = datetime.toString(); 


   // throw new Error("Hi");
   var r = confirm("Are you sure you want to delete this Item?");

   
   /* End Deposit Category */


   if (r == true) {

     if(this.tallySummary.deposit_byCategory[category] && this.tallySummary.deposit_byCategory[category].amount) {
        var last_category_amount = parseInt(this.tallySummary.deposit_byCategory[category].amount);
        var new_category_amount = last_category_amount - parseInt(object.amount);


        var deposit_byCategory = this.tallySummary.deposit_byCategory; 


        //throw new Error("Hi");
        deposit_byCategory[category] = {
              amount: new_category_amount,
              category: category,
              datetime_ms: d,
              id: datetime,
              last_amount: parseInt(object.amount),
              last_total: last_category_amount,
              last_action_type: 'Delete'
          } 



         this.firestore.collection('deposit').doc(id).delete().then(result => {

              this.deleteNotification = 'Document successfully deleted!'; 

              setTimeout(result =>  {
                this.deleteNotification = null;                      
            }, 1500);


              this.firestore.collection('tally_summary').doc('total_deposit').set({
              deposit_aggregate: {
                  amount: depositAmount,
                  datetime_ms: d,
                  last_amount: parseInt(object.amount),
                  last_total: parseInt(this.totalDeposit),
                  last_deposit_type: category,
                  last_action_type: 'Delete'
              },
              deposit_byCategory: deposit_byCategory
              }).then(result => {
                this.getTotalDeposit();
              });

          }).catch(function(error) {
          });
    }

   /* Deposit Category */
   
         
  } else {

  } 
}
/* End Remove */
getPerPage(item) {

}

}