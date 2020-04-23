import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TransactionService } from '../services/transaction.service';
import 'firebase/firestore';


interface Total {
  deposit: number,
  expense: number,
  depositCategory: any,
  expenseCategory: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  total:Total = {
    deposit: 0,
    expense: 0,
    depositCategory: null,
    expenseCategory: null,
  }

  constructor(private firestore: AngularFirestore, private transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactionSummary();
    this.transactionService.getTransactionObject();
    

    console.log(this.total.depositCategory, 'this.total.depositCategory');
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