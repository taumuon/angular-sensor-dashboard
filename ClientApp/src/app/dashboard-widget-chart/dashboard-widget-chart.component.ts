import { Component, OnInit, Input } from '@angular/core';

import { DashboardConfigItem } from '../DashboardConfigItem';

@Component({
  selector: 'app-dashboard-widget-chart',
  templateUrl: './dashboard-widget-chart.component.html',
  styleUrls: ['./dashboard-widget-chart.component.css']
})
export class DashboardWidgetChartComponent implements OnInit {

  @Input() dashboardConfigItem: DashboardConfigItem;

  constructor() { }

  ngOnInit() {
  }

}
