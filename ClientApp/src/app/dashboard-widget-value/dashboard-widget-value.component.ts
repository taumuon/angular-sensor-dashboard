import { Component, OnInit, Input } from '@angular/core';

import { DashboardConfigItem } from '../DashboardConfigItem';

import { HubStreamSubscriptionService } from '../hub-stream-subscription.service';

@Component({
  selector: 'app-dashboard-widget-value',
  templateUrl: './dashboard-widget-value.component.html',
  styleUrls: ['./dashboard-widget-value.component.css']
})
export class DashboardWidgetValueComponent implements OnInit {

    @Input() dashboardConfigItem: DashboardConfigItem;

    // TODO: can directly expose/bind to an observable?
    value: number = -1;
    units: string = '-'; // TODO: need to read from sensor config, from sensor name

    constructor(private hubStreamSubscriptionService: HubStreamSubscriptionService) { }

    ngOnInit() {
        this.subscribeStream();
    }

    subscribeStream() {
        this.hubStreamSubscriptionService.subscribeStream('StartListening', this.dashboardConfigItem.sensorName)
            .subscribe(item => {
                this.value = item.value;
            });
    }
}
