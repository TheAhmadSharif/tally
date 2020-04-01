import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';




@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  depositArray = [];
  deposits:any;
  today = new FormControl(new Date());
  depositInput:any;
  total: number = 0;
  totalDeposit: number = 0;



  constructor(private firestore: AngularFirestore) {


  }

  ngOnInit(): void {
   
    
  }

  getTotalDeposit() {

        // this.firestore.collection("Tally").get().subscribe(object => {
        //   console.log(object);
        // });
    

        let citiesRef = this.firestore.collection('Tally');
        let allCities = citiesRef.get().forEach(doc => {
          console.log(doc);
        });
              


  }

  getDeposit(deposit:number, depositDate:any) {

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


  }

}
