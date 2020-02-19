import { Component, OnInit } from '@angular/core';
import { DashboardConfigService } from '../dashboard-config.service';

import { DashboardConfigItem } from '../DashboardConfigItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    DashboardConfig: DashboardConfigItem[];

    constructor(private dashboardConfigService: DashboardConfigService) { }

    ngOnInit() {
        this.getDashboardConfig();
    }

    getDashboardConfig() {
        this.dashboardConfigService.getConfig()
            .subscribe(config => this.DashboardConfig = config);
    }

}
