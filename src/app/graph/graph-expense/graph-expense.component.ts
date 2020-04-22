import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-graph-expense',
  templateUrl: './graph-expense.component.html',
  styleUrls: ['./graph-expense.component.css']
})
export class GraphExpenseComponent implements OnInit {

  single: any = [];
  view: any[] = [350, 200];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Expenditure Category';
  showYAxisLabel = true;
  yAxisLabel = 'Expenditure';
  colorScheme = {
    domain: ['#ffc107', '#28a745', '#8BC34A']
  };
  chartdata:any;

  constructor(private transactionService: TransactionService) {Object.assign(this.single) }

  ngOnInit(): void {
      this.single = [
        {
          "name": "Utility",
          "value": 1400,
        },
        {
          "name": "Foods",
          "value": 3500
        },
        {
          "name": "Salary",
          "value": 15000
        }
      ];

      // var data = [object[0].expense_byCategory].forEach((item:any) => {
      //       console.log(item, Object.keys(item), 'item112');
      // });


      this.transactionService.getTransactionSummary().subscribe((object:any)=> {
          console.log(object, 'object46');
      })

      console.log(_.chunk([1,2,3,4], 2));
  }

}
