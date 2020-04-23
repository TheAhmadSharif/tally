import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import * as _ from 'lodash';


interface SummaryObject {
  deposit: object,
  expense: object
}

@Injectable({
  providedIn: 'root'
})


export class TransactionService implements OnInit{
  summaryObject:SummaryObject = {
    deposit: [],
    expense: []
  }

  constructor(private firestore: AngularFirestore) {
  }
  ngOnInit(): void {}

  getTransactionSummary(): Observable<any> {
       var summary = this.firestore.collection('TallySummary').valueChanges()
       return summary;
  }

  getTransactionObject(){
                  this.getTransactionSummary().subscribe((object:any)=> {
                    var data = object.forEach((item:any) => {
                          if(item.expense_byCategory){
                              var data = _.flatMap(item.expense_byCategory);
                              var expense_data = [];
                              for(var i = 0; i < data.length; i++) {
                                expense_data.push({
                                  "name": data[i]['category'],
                                  "value": data[i]['amount'],
                                })
                              }
                              this.summaryObject.expense = _.sortBy(expense_data, [function(o) { return o.value}]);
                          }

                          if(item.deposit_byCategory){
                            var data = _.flatMap(item.deposit_byCategory);
                            var deposit_data = [];
                            for(var i = 0; i < data.length; i++) {
                              deposit_data.push({
                                "name": data[i]['category'],
                                "value": data[i]['amount'],
                              })
                            }
                            this.summaryObject.deposit = _.sortBy(deposit_data, [function(o) { return o.value}]);
                        }
                    });
                });
    return this.summaryObject;
  }
}
