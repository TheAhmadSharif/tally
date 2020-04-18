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
         this.total.deposit = object[2].deposit.amount;
         this.total.expense = object[3].expense.amount;
    })
    
  }
}