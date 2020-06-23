import { Injectable, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AuthenticationService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
=======
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
>>>>>>> c16567472a29218cdb5c4e2d2f31ea4a51698f8e
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
      var summary = this.firestore.collection('tally_summary').valueChanges()
      return summary;
  }
}