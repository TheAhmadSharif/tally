import { Component, OnInit, Input } from '@angular/core';
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

  

  }

  getTotalExpense (event) {
    console.log(event);
  }

}
