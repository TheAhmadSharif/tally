import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  isCollapsed:boolean = false;
  calculateBox:any = '';
  output:any = 'Result';
  switch:boolean = false;

  @ViewChild('equation') inputEl:ElementRef;

  constructor(private firestore: AngularFirestore, private elementRef: ElementRef) {
  }

ngOnInit(): void {
   // console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); //lodash function
   // console.log(_.random(1, 100)); //lodash function
   setTimeout(() => this.inputEl.nativeElement.focus());

}

ngAfterViewInit(){
    document.getElementById('inputbox').focus();
  }
 
  navSwitch(){
    this.switch=!this.switch;
  }
  switchCalculator() {
    this.isCollapsed = ! this.isCollapsed;
    this.ngOnInit();
  }
  goInitialState() {
    this.calculateBox = '';
    this.ngOnInit();
  }

  removeElement() {
    this.calculateBox = '';
    this.ngOnInit();
  }

  addToDisplay(item:any) {
    this.ngOnInit();
    var s = item;
    s = s.replace(/^0+/, "");
    this.calculateBox =  this.calculateBox + item;
  }
  getResult(equation:any) {
    this.output = eval(equation);
    this.ngOnInit();
  }

}
