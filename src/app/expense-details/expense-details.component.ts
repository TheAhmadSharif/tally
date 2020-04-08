import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {
  first_parameter:string;
  second_parameter:string;
  object:any;

  constructor( 
    private route: ActivatedRoute,
    private firestore: AngularFirestore) { 
    this.first_parameter = this.route.snapshot.paramMap.get('type');
    this.second_parameter = this.route.snapshot.paramMap.get('object');
    
    console.log(this.first_parameter, 'first_parameter');
    console.log(this.second_parameter, 'second_parameter');


  }

  ngOnInit(): void {
          this.firestore.collection('Tally').doc(this.second_parameter).valueChanges().subscribe(object=> {
            this.object = object;
            console.log(this.object, 'this.expense');
            
        }, error => {

        });
  }

}
