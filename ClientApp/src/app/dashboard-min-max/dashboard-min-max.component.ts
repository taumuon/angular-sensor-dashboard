import { Component, OnInit, Input } from '@angular/core';

import { HubStreamSubscriptionService } from '../hub-stream-subscription.service';

import { DashboardConfigItem } from '../DashboardConfigItem';

@Component({
  selector: 'app-dashboard-min-max',
  templateUrl: './dashboard-min-max.component.html',
  styleUrls: ['./dashboard-min-max.component.css']
})
export class DashboardMinMaxComponent implements OnInit {

    @Input() dashboardConfigItem: DashboardConfigItem;

    // TODO: can directly expose/bind to an observable?
    minValue: number = 1000; // TODO: null/undefined initially ?
    maxValue: number = 0;
    units: string = '-'; // TODO: need to read from sensor config, from sensor name

    constructor(private hubStreamSubscriptionService: HubStreamSubscriptionService) { }

    ngOnInit() {
        this.subscribeStream();
    }

    subscribeStream() {
        this.hubStreamSubscriptionService.subscribeStream('StartListening', this.dashboardConfigItem.sensorName)
            .subscribe(item => {
                if (item.value < this.minValue) {
                    this.minValue = item.value;
                }

                if (item.value > this.maxValue) {
                    this.maxValue = item.value;
                }
            });
    }
}
