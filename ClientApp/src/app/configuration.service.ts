import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, of } from 'rxjs';
import { scan } from 'rxjs/operators';

import { HubConnection } from '@microsoft/signalr';

import { HubConnectionService } from './hub-connection.service';

import { SensorConfigItem } from './SensorConfigItem';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

    SensorConfigSubj: Subject<SensorConfigItem[]> = new Subject<SensorConfigItem[]>();

    connected: boolean = false;

    hubConnected: ReplaySubject<Object>;

    hubConnection: HubConnection;

    constructor(private hubConnectionService: HubConnectionService) {
        let url = '/configurationHub';

        // TODO: Observable create then share
        if (!this.hubConnected) {
            console.log('creating hub connection');
            this.hubConnected = new ReplaySubject<Object>(1);
            this.startConnection(url);
        }
    }

    getConfig(): Observable<SensorConfigItem[]> {
       return this.SensorConfigSubj
            .pipe(scan((acc, curr) => curr.concat(acc)));
    }

    addSensor(sensorConfigItem: SensorConfigItem) {
        if (this.hubConnection != null) {
            this.hubConnection.invoke("addSensor", sensorConfigItem.name, sensorConfigItem.manufacturer, sensorConfigItem.hostDevice, sensorConfigItem.sensorUnits)
                .then(r => {
                    if (r !== '') {
                        alert(`unable to add sensor: ` + r)
                    };
                });
        }
    }

    private startConnection(url: string) {
        this.hubConnectionService.getConnection(url).subscribe(hubConnection => {
            this.connected = true;
            this.hubConnection = hubConnection;
            hubConnection.on("ConfigUpdated", (item) => {
                this.SensorConfigSubj.next([item.sensorConfig]);
            });

            hubConnection.invoke("sensors")
                .then(data => {
                    console.log("sensors invoked and returned data: " + data);
                    this.SensorConfigSubj.next(data.map(d => <SensorConfigItem>d));
                });
        });
    }
}
