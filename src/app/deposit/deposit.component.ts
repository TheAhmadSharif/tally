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


      var time = new Date();

      console.log(time.toString());

      this.firestore.collection('Tally', ref => ref.orderBy('deposit.datetime').limitToLast(5)).valueChanges().subscribe(object=> {
        this.deposits = object;
     });
    
  }

  getTotalDeposit() {
    this.totalDeposit = 0;


    this.firestore.collection('Tally', ref => ref.where('deposit.amount', '>', '0')).get().subscribe(object => {
    
      object.forEach(doc => {
        this.totalDeposit = parseInt(doc.data().deposit.amount) + this.totalDeposit;
     
      });
      console.log(this.totalDeposit, 'this.totalDeposit');

    });


    this.firestore.collection('Tally').doc('totalDeposit').get().subscribe(object => {
      this.depositholder = object.data();
      console.log(this.depositholder, 'this.depositholder');

    });


    

}

 

  getDeposit(deposit:number, depositDate:any) {

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

    console.log(this.depositholder.totalDeposit.amount, 'this.depositholder91');

    var depositAmount = parseFloat(this.depositholder) + deposit;

    console.log(depositAmount, 'depositAmount95');

    this.firestore.collection('Tally').doc('totalDeposit').set({
      totalDeposit: {
          amount: depositAmount,
          datetime: d,
        }
    });

  }

}
