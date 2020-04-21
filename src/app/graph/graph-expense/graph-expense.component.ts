import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';


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
  }

}
