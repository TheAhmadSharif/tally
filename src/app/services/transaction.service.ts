import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
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
      private authService: AuthenticationService) {
  }
  ngOnInit(): void {}

  getTransactionSummary(): Observable<any> {
      var summary = this.firestore.collection('TallySummary').valueChanges()
      return summary;
  }
}