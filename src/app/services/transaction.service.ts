import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import 'firebase/firestore';
import { Observable } from 'rxjs';

interface SummaryObject {
  deposit: any,
  expense: any
}

@Injectable({
  providedIn: 'root'
})

export class TransactionService implements OnInit{
  summaryObject:SummaryObject = {
    deposit: [],
    expense: []
  }
  constructor(private firestore: AngularFirestore,
      private authService: AuthService) {
  }
  ngOnInit(): void {}

  getTransactionSummary(): Observable<any> {
       var usereStatus = this.authService.getUserStatus();   
      
       var summary = this.firestore.collection('TallySummary').valueChanges()
       return summary;
  }
}
