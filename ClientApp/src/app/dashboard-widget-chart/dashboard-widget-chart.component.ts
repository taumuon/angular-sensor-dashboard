import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DashboardConfigItem } from '../DashboardConfigItem';

import { ConfigurationService } from '../configuration.service';

import { HubStreamSubscriptionService } from '../hub-stream-subscription.service';

import { SensorReading } from '../SensorReading';

import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-dashboard-widget-chart',
    templateUrl: './dashboard-widget-chart.component.html',
    styleUrls: ['./dashboard-widget-chart.component.css']
})
export class DashboardWidgetChartComponent implements OnInit {

    @Input() dashboardConfigItem: DashboardConfigItem;

    Highcharts: typeof Highcharts = Highcharts;
    chartConstructor: string = 'chart';
    updateFlag: boolean = false;
    oneToOneFlag: boolean = true;
    runOutsideAngularFlag: boolean = false;
    chartCallback: any;

    chart: Highcharts.Chart;

    chartOptions: Highcharts.Options = {
        chart: {
            type: "line",
            animation: false,
            events: {
                load: (event: any) => {
                    this.chart = event.target;
                }
            }
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            minTickInterval: 500,
            labels: {
                formatter: function () {
                    var d = new Date(this.value);
                    var formatted = d.getSeconds() + ':' + d.getMilliseconds();
                    return formatted;
                },
                style: {
                    width: 10
                }
            }
        },
        yAxis: {
            title: {
                text: ""
            }
        },
        tooltip: {
            valueSuffix: ""
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false
                }
            },
            series: {
                animation: {
                    duration: 0
                }
            }
        },
        series: [{
            type: 'line',
            name: 'Data',
            data: []
        }]
    };

    currentData: SensorReading[] = [];

    valueSubscription: Subscription;
    value: number;
    unitSubscription: Subscription;
    units: string;

    constructor(private hubStreamSubscriptionService: HubStreamSubscriptionService,
        private configurationService: ConfigurationService) {
        // ChartCallback doesn't work for some reason
        //const self = this;

        //console.log('ctor executed');
        //self.chartCallback = chart => {
        //    console.log('chart callback executed');
        //    self.chart = chart;
        //    chart.chartComponent = self;
        //};
    }

    ngOnInit() {
        this.unitSubscription = this.configurationService.getConfig()
            .pipe(map(config => {
                let found = config.find(c => c.name == this.dashboardConfigItem.sensorName);
                if (found) {
                    return found.sensorUnits;
                }

                console.log('not found');
                return "-";
            }))
            .subscribe(val =>
            {
                this.units = val;
                this.chartOptions.yAxis = {
                    title: {
                        text: val
                    }
                };
                this.chartOptions.tooltip.valueSuffix = " " + val;
            });

        console.log('onInit ' + this.dashboardConfigItem.sensorName);
        let value$ = this.hubStreamSubscriptionService.subscribeStream('StartListening', this.dashboardConfigItem.sensorName);
        this.valueSubscription = value$.subscribe(val => {
            let d = this.currentData;

            this.value = val.value;
            d = d.concat([val]).slice(-10); // TODO: instead use rxjs sliding window operator

            //console.log(this.chart);
            //if (this.chart != undefined) {
            //    console.log('add point');
            //    this.chart.series[0].addPoint([new Date(val.timestamp).getTime(), val.value]);
            //};
           this.chartOptions.series = [{
                type: 'line',
                name: 'Data',
                showInLegend: false,
                data: d.map(sr => [new Date(sr.timestamp).getTime(), sr.value])
            }];

            this.currentData = d;
            this.updateFlag = true;
        });
    }

    ngOnDestroy() {
        this.unitSubscription.unsubscribe();
        this.valueSubscription.unsubscribe();
    }
}
