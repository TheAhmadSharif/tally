import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalExpense:number = 0;
  totalDeposit:number = 0;

  constructor(private firestore: AngularFirestore, private transactionService: TransactionService) { }

  ngOnInit(): void {
        

        



         this.firestore.collection('TallySummary').doc('total_deposit').get().subscribe(object => {
            this.totalDeposit = object.data().deposit.amount;        
          }, (error)=> {
            this.totalDeposit = 0;
            console.log(error, 'error44');
          });


  }

}
