import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import 'lodash';
declare var _:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  total:any;
  isCollapsed:boolean = true;
  calculateBox:any = '';
  output:any = 'Result';
  switch:boolean = false;
  year: number = new Date().getFullYear();

  styleTop:any;

  @ViewChild('equation') equation:ElementRef;

  constructor( private elementRef: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => this.equation.nativeElement.focus());
     var m = document.getElementById('calculator');
     m.addEventListener('mousedown', mouseDown, false);
     window.addEventListener('mouseup', mouseUp, false);
 
     function mouseUp() {
         window.removeEventListener('mousemove', moving, true);
     }

     function mouseDown(e:any) {
         window.addEventListener('mousemove', moving, true);
     }
 
     function moving(e:any) {
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