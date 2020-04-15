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
  isCollapsed:boolean = true;
  calculateBox:any = '';
  output:any = 'Result';
  switch:boolean = false;

  styleTop:any;

  @ViewChild('equation') equation:ElementRef;

  constructor(private firestore: AngularFirestore, private elementRef: ElementRef) {
  }

ngOnInit(): void {
   // console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); //lodash function
   // console.log(_.random(1, 100)); //lodash function
   setTimeout(() => this.equation.nativeElement.focus());

    var m = document.getElementById('calculator');
    m.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    function mouseUp() {
        window.removeEventListener('mousemove', moving, true);
    }

    function mouseDown(e) {
        window.addEventListener('mousemove', moving, true);
    }

    function moving(e) {
          m.style.top = (e.clientY - 10) + 'px';
          m.style.left = (e.clientX - 20) + 'px';
          document.getElementById('inputbox').focus();
      };

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
