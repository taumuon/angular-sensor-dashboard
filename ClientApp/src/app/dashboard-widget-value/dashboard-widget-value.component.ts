import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { DashboardConfigItem } from '../DashboardConfigItem';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { HubStreamSubscriptionService } from '../hub-stream-subscription.service';

import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-dashboard-widget-value',
  templateUrl: './dashboard-widget-value.component.html',
  styleUrls: ['./dashboard-widget-value.component.css']
})
export class DashboardWidgetValueComponent implements OnInit, OnDestroy {

    @Input() dashboardConfigItem: DashboardConfigItem;

    sensorReading: Subscription;

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
        console.log('widget destroy');
        this.sensorReading.unsubscribe();
    }
}
