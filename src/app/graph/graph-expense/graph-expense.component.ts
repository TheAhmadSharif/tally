import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-graph-expense',
  templateUrl: './graph-expense.component.html',
  styleUrls: ['./graph-expense.component.css']
})
export class GraphExpenseComponent implements OnInit {

  expenseData: any = [];
  depositData: any = [];
  view: any[] = [450, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Expenditure Category';
  showYAxisLabel = true;
  yAxisLabel = 'Expenditure';
  colorScheme = {
    domain: ['#16817a', '#28a745', '#fa744f']
  };

  constructor(private transactionService: TransactionService) {}

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
                    this.expenseData = chardata;
                }

                if(item.deposit_byCategory){
                  var data = _.flatMap(item.deposit_byCategory);
                  var chardata = [];
                  for(var i = 0; i < data.length; i++) {
                    chardata.push({
                      "name": data[i]['category'],
                      "value": data[i]['amount'],
                    })
                  }
                  this.depositData = chardata;
              }
          });
      })

  }

}
