import { Component, OnInit, ElementRef, Input } from '@angular/core';
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
  switch:any = 'off';

  constructor(private firestore: AngularFirestore, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
   // console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); //lodash function
   // console.log(_.random(1, 100)); //lodash function
  }
  ngAfterViewInit() {
    // Otherwise Angular throws error: Expression has changed after it was checked.
    window.setTimeout(() => {
        this.elementRef.nativeElement.focus();
    });
  }
  navSwitch(){
    this.switch = 'on';
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
    var s = item;
    s = s.replace(/^0+/, "");

    this.calculateBox =  item;
    console.log(this.calculateBox, '55');
  }
  getResult(equation:any) {
    this.output = eval(equation);
    console.log(equation, '47');
  }

}
