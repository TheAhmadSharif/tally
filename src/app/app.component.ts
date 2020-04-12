import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import 'lodash';

declare var _:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  total:any;

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
   //  console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); //lodash function
   // console.log(_.random(1, 100)); //lodash function
  }

  getTotalExpense (event) {
    console.log(event);
  }

}
