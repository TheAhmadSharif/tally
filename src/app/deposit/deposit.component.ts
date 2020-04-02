import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';





@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  today = new FormControl(new Date());
  depositInput:any;
  totalDeposit: number = 0;
  deposits:any;
  depositholder:any;




  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
      this.getTotalDeposit();
      this.firestore.collection('Tally', ref => ref.orderBy('deposit.datetime').limitToLast(5)).valueChanges().subscribe(object=> {
        this.deposits = object;
     });
    
  }

  getTotalDeposit() {
    this.totalDeposit = 0;
    this.firestore.collection('TallyDeposit').doc('TotalDeposit').get().subscribe(object => {
    
      if( typeof this.depositholder === 'undefined' || this.depositholder === null ){
        this.depositholder = this.totalDeposit = 0;
        console.log(object.data().amount, this.totalDeposit, '44');
      }
      else {
        this.depositholder = object.data().amount;
        console.log(object.data().amount, '48');
      }
      
    }, (error)=> {
      console.log(error, 'error44');
    });
}

  postDeposit(deposit:number, depositDate:any) {
    //throw new Error("My error message");
    var d = new Date().getTime().toString(); 
    this.firestore.collection('Tally').doc(d).set({
        deposit: {
          amount: deposit,
          deposit_type: "savings",
          datetime: d,
          userdate: depositDate
        }
    });

    this.depositInput = null;
    this.getTotalDeposit();
    var depositAmount = parseFloat(this.depositholder) + deposit;

    this.firestore.collection('TallyDeposit').doc('TotalDeposit').set({
      totalDeposit: {
          amount: depositAmount,
          datetime: d,
        }
    });

  }

}
