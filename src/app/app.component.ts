import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  total:any;
  constructor(private firestore: AngularFirestore) {

  firestore.collection('Tally', ref => ref.orderBy('expense.datetime').limitToLast(5)).valueChanges().subscribe(object=> {


      this.total = object;

      console.log(object, 'object');

     });

  }

}
