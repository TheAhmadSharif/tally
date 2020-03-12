import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  depositArray = [];

  constructor() { }

  ngOnInit(): void {
  }

  getDeposit(deposit:number) {
    this.depositArray.push(deposit);
    console.log(this.depositArray);
  }

}
