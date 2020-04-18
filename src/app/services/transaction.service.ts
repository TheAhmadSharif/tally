import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firestore: AngularFirestore) {

  }

  getTransactionSummary(): Observable<any> {
       var summary = this.firestore.collection('TallySummary').valueChanges()
       return summary;
  }

}
