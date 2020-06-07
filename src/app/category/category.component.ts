import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as _ from 'lodash';

interface SortedIcon {
  amount: {
    icon: string,
    order: boolean
  },
  userdate_ms: {
    icon: string,
    order: boolean
  },
  datetime: {
    icon: string,
    order: boolean
  }
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  sortedIcon: SortedIcon = {
    amount: {
      icon: 'chevron down icon',
      order: true,
    },
    userdate_ms: {
      icon: 'chevron down icon',
      order: true,
    },
    datetime: {
      icon: 'chevron down icon',
      order: true,
    }
   
  };
  
  routeParameter = {
    transactionType: null,
    categoryname: null,
  }
  totalAmount:any = 0;
  objects:any;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  placement = 'bottom';
  p: number = 1;
  objectPerPage:number = 10;

  range:any = {
    prevdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate()
    },
    nextdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate() + 7
    }
  }
  isCollapsed:boolean = true;

constructor( private route: ActivatedRoute,
    private firestore: AngularFirestore) { 
    this.routeParameter = {
      transactionType: this.route.snapshot.paramMap.get('category'),
      categoryname: this.route.snapshot.paramMap.get('categoryname')
    }

  }

ngOnInit(): void {
    this.totalAmount = 0;
    var transactionType = this.routeParameter.transactionType;

    console.log(this.routeParameter, '86');


    this.firestore.collection(transactionType, ref => ref.where('category', '==', this.routeParameter.categoryname)).valueChanges().subscribe(object=> {

      this.objects = object;
      this.objects.forEach((element:any) => {
        this.totalAmount = element['amount'] + this.totalAmount;
      });
   });
}

getDataSort(sorting_type:any) {
  var sortingType = sorting_type;
  this.sortedIcon[sortingType].order =! this.sortedIcon[sortingType].order;
  if(this.sortedIcon[sortingType].order) {
    var sortedDataDesc = _.sortBy(this.objects, [function(o) { return o[sortingType]}]);
    this.objects = sortedDataDesc;
    this.sortedIcon[sorting_type].icon = 'chevron down icon';
  }
  else {
      var sortedDataAsc = _.sortBy(this.objects, [function(o) { return o[sortingType];}]).reverse();
      this.objects = sortedDataAsc;
      this.sortedIcon[sorting_type].icon = 'chevron up icon';
  }
}
getByDay(date:any) {
    var transactionType = this.routeParameter.transactionType;;
    this.totalAmount = 0;
    var givendate = date.year + '-' + date.month + '-' + date.day;  
    this.firestore.collection(transactionType, ref => ref.where("category", '==', this.routeParameter.categoryname).where("userdate", '==',givendate)).valueChanges().subscribe(object=> {
          this.objects = object; 
          this.objects.forEach(element => {
            this.totalAmount = element['amount'] + this.totalAmount;
          });
      },
      error => {
  
      });
}
  
getPrevDate(date:any) {
    var day = new Date(date.year + '-' + date.month + '-' + date.day);
    var nextDay = new Date(day);
    var nd = nextDay.setDate(day.getDate() - 1); 
    var d1 = new Date(nd);
    this.selected_day = {
      year: d1.getFullYear(),
      month: d1.getMonth() + 1,
      day: d1.getDate()
    };
}
  
getNextDate(date:any) {
    var day = new Date(date.year + '-' + date.month + '-' + date.day);
    var nextDay = new Date(day);
    var nd = nextDay.setDate(day.getDate() + 1); 
  
    var d1 = new Date(nd);
   
    this.selected_day = {
      year: d1.getFullYear(),
      month: d1.getMonth() + 1,
      day: d1.getDate()
    };
  
}
  
getByRange(range:any) {
    var transactionType = this.routeParameter.transactionType;;
    var prevdate = range.prevdate.year + '-' + range.prevdate.month + '-' + range.prevdate.day;
    var prevdate_ms = new Date(prevdate).getTime();
    var nextdate = range.nextdate.year + '-' + range.nextdate.month + '-' + range.nextdate.day;
    var nextdate_ms = new Date(nextdate).getTime();

      if(prevdate_ms < nextdate_ms) {
          this.totalAmount = 0;
          this.firestore.collection(transactionType, ref => ref.where('category', '==', this.routeParameter.categoryname).where("userdate_ms", '>=', prevdate_ms).where("userdate_ms", '<=', nextdate_ms)).valueChanges().subscribe(object=> {
            this.objects = object;
            this.objects.forEach(element => {
            this.totalAmount = element['amount'] + this.totalAmount;
            });
        });
      }
}
getPerPage(item) {

}
  
}