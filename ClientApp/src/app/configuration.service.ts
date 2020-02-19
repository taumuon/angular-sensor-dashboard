import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, of } from 'rxjs';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import { HubConnectionService } from './hub-connection.service';

import { SensorConfigItem } from './SensorConfigItem';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

    SensorConfigSubj: Subject<SensorConfigItem[]> = new Subject<SensorConfigItem[]>();

    connected: boolean = false;

    hubConnected: ReplaySubject<Object>;

    constructor(private hubConnectionService: HubConnectionService) {
        let url = '/configurationHub';

        this.hubConnected = new ReplaySubject<Object>(1);

        this.startConnection(url);
    }

    getConfig(): Observable<SensorConfigItem[]> {
        // TODO: accumulate - first should test/confirm that current behavior is currently broken if add new sensor
        return this.SensorConfigSubj;
    }

    // TODO: use HubStreamSubscription ?
    private startConnection(url: string) {
        this.hubConnectionService.getConnection(url).subscribe(hubConnection => {
            this.connected = true;
            hubConnection.on("ConfigUpdated", (item) => {
                this.SensorConfigSubj.next(item.sensorConfig);
            });

            hubConnection.invoke("sensors")
                .then(data => {
                    console.log("sensors invoked and returned data");
                    this.SensorConfigSubj.next(data);
                });
        });
    }
}
