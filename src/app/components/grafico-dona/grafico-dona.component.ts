import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.scss'],
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input()  doughnutChartLabels: Label[] = [];
  @Input()  doughnutChartData: MultiDataSet = [];
  @Input()  doughnutChartType: ChartType ;
  @Input() hola="";

  constructor() {
    console.log(this.doughnutChartLabels,this.doughnutChartData,this.doughnutChartType,this.hola)
   }

  ngOnInit() {}

}
