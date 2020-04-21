import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { TransactionService } from '../services/transaction.service';


interface Total {
  deposit: number,
  expense: number,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  total:Total = {
    deposit: 0,
    expense: 0
  }

  constructor(private firestore: AngularFirestore, private transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactionSummary();
  }
  getTransactionSummary():void {
    this.transactionService.getTransactionSummary().subscribe(object => {

      object.forEach((item:any) => {
            if(item.expense_aggregate) {
              this.total.expense = item.expense_aggregate.amount;
            }
            
            if(item.deposit_aggregate) {
              this.total.deposit = item.deposit_aggregate.amount;
            }
      })
         
    })
    
  }
}