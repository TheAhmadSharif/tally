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
  isCollapsed:boolean = true;
  calculateBox:any = 0;
  output:any = 'Result';

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
   //  console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); //lodash function
   // console.log(_.random(1, 100)); //lodash function
  }

  getTotalExpense (event) {
    console.log(event);
  }
  closeCalculator() {
    this.isCollapsed =! this.isCollapsed;
  }

  goInitialState() {
    this.calculateBox = '';
  }

  removeElement() {
    this.calculateBox = '';
  }

  addToDisplay(item:any) {
    this.calculateBox =  this.calculateBox + item;
    console.log(item);
  }
  getResult(equation:any) {
    this.output = eval(equation);
    console.log(equation, '47');
  }

}
