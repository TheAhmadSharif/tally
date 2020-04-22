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
    domain: ['#ffc107', '#28a745']
  };
  chartdata:any;

  constructor(private transactionService: TransactionService) {Object.assign(this.single) }

  ngOnInit(): void {




      this.transactionService.getTransactionSummary().subscribe((object:any)=> {
          var data = object.forEach((item:any) => {
                if(item.expense_byCategory){
                    var data = _.flatMap(item.expense_byCategory);
                    var chardata = [];
                    for(var i = 0; i < data.length; i++) {
                      chardata.push({
                        "name": data[i]['category'],
                        "value": data[i]['amount'],
                      })
                    }
                    this.single = chardata;
                }
          });
      })

  }

}
