import { Component, OnInit } from '@angular/core';
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

  constructor(firestore: AngularFirestore) {
     firestore.collection('deposits').valueChanges().subscribe(object=> {
      this.deposits = object;

      console.log(object);
     });
  }

  ngOnInit(): void {
  }

  getDeposit(deposit:number) {
    this.depositArray.push(deposit);
    console.log(this.depositArray);
  }

}
