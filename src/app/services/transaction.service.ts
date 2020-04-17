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

  getTotalExpense(): Observable<any> {
       var expense = this.firestore.collection('TallySummary').get();
      
       return expense;
  }

}
