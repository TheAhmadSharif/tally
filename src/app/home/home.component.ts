import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalExpense:number = 0;
  totalDeposit:number = 0;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
        this.firestore.collection('TallyExpense').doc('TotalExpense').get().subscribe(object => {
          this.totalExpense = object.data().totalExpense.amount;
      
        }, (error)=> {
          this.totalExpense = 0;
          console.log(error, 'error44');
        });

        this.firestore.collection('TallyDeposit').doc('TotalDeposit').get().subscribe(object => {
          this.totalDeposit = object.data().totalDeposit.amount;
      
        }, (error)=> {
          this.totalDeposit = 0;
          console.log(error, 'error44');
        });

  }

}
