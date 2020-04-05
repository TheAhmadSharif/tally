import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';



@Component({
  selector: 'app-billcategory',
  templateUrl: './billcategory.component.html',
  styleUrls: ['./billcategory.component.css']
})
export class BillCategoryComponent implements OnInit {
  parameter:string;
  totalExpense:number;
  expenses:any;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };

  constructor( private route: ActivatedRoute,
    private firestore: AngularFirestore) { 
    this.parameter = this.route.snapshot.paramMap.get('type');
    console.log(this.parameter, 'parameter');


  }

  ngOnInit(): void {
    this.firestore.collection('Tally', ref => ref.where('expense.category', '==', this.parameter)).valueChanges().subscribe(object=> {
      this.expenses = object;
      this.expenses.forEach(element => {
       this.totalExpense = element.expense.amount + this.totalExpense;
      });

   });

  }

  getDayData(date:any) {

    this.totalExpense = 0;
  
    var givendate = date.month + '/' + date.day + '/' + date.year; 
  
  
    this.firestore.collection('Tally', ref => ref.where('expense.userdate', '==', givendate)).valueChanges().subscribe(object=> {
         this.expenses = object;
         this.expenses.forEach(element => {
          this.totalExpense = element.expense.amount + this.totalExpense;
         });
  
      });
  
  }

}
