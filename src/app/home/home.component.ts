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
        this.getTotalExpense();
      
  }

  getTotalExpense():void {
    this.transactionService.getTotalExpense().subscribe(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    
  }
}