import { Injectable } from '@angular/core';

import { HubConnection } from '@microsoft/signalr';

import { Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { HubConnectionService } from './hub-connection.service';

import { SensorReading } from './SensorReading';

@Injectable({
  providedIn: 'root'
})
export class HubStreamSubscriptionService {

    constructor(private hubConnectionService: HubConnectionService) {
    }

    subscribeStream(streamName: string, sensorName: string): Observable<SensorReading> {

        // TODO: this relies on knowing the hubConnection is a ReplaySubject, rewrite
        return this.hubConnectionService.getConnection('/streamHub')
            .asObservable()
            .pipe(mergeMap(hubConnection => this.subscribeStreamToHub(streamName, sensorName, hubConnection)));
    }

    subscribeStreamToHub(streamName: string, sensorName: string, hubConnection: HubConnection): Observable<SensorReading> {
        console.log('subscribeStream ' + hubConnection + ' ' + streamName + ' ' + sensorName);

        let sensorReading: Subject<SensorReading> = new Subject<SensorReading>();

        const streamSubscription = hubConnection.stream(streamName, sensorName)
            .subscribe({
                next: (item) => {
                    sensorReading.next(<SensorReading>item);
                },
                complete: () => {
                    console.log('completed');
                },
                error: (err) => {
                    console.log(err);
                },
            });

        // TODO: dispose of stream - where? component lifetimes
        // TODO: share subscriptions for same sensor names

        return sensorReading.asObservable(); // TODO: return result of stream().subscribe mapped to rx
    }
}
