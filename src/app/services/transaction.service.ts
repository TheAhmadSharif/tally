import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firestore: AngularFirestore) {

  }

  getTotalDeposit() {
	  	 this.firestore.collection('TallySummary').doc('total_expense').get();
  }

}
