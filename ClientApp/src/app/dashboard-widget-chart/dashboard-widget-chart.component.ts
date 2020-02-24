import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DashboardConfigItem } from '../DashboardConfigItem';

import { ConfigurationService } from '../configuration.service';

import { HubStreamSubscriptionService } from '../hub-stream-subscription.service';

@Component({
    selector: 'app-dashboard-widget-chart',
    templateUrl: './dashboard-widget-chart.component.html',
    styleUrls: ['./dashboard-widget-chart.component.css']
})
export class DashboardWidgetChartComponent implements OnInit {

    @Input() dashboardConfigItem: DashboardConfigItem;

    value$: Observable<number>;

    // async pipe for observable in nested ngIf doesn't work, so subscribe directly
    unitSubscription: Subscription;
    units: string;

    constructor(private hubStreamSubscriptionService: HubStreamSubscriptionService,
                private configurationService: ConfigurationService) { }

    ngOnInit() {
        console.log('onInit ' + this.dashboardConfigItem.sensorName);
        this.value$ = this.hubStreamSubscriptionService.subscribeStream('StartListening', this.dashboardConfigItem.sensorName)
            .pipe(map(sr => sr.value));

        this.unitSubscription = this.configurationService.getConfig()
            .pipe(map(config => {
                console.log('config ' + config);
                let found = config.find(c => c.name == this.dashboardConfigItem.sensorName);
                if (found) {
                    console.log('found: ' + found);
                    console.log(found);
                    return found.sensorUnits;
                }

                console.log('not found');
                return "-";
            }))
            .subscribe(val => this.units = val);
    }

    ngOnDestroy() {
        this.unitSubscription.unsubscribe();
    }
}
