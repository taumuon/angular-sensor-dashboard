import { Injectable } from '@angular/core';

import { HubConnection } from '@microsoft/signalr';

import { Observable } from 'rxjs';
import { mergeMap, share } from 'rxjs/operators';

import { HubConnectionService } from './hub-connection.service';

import { SensorReading } from './SensorReading';

@Injectable({
  providedIn: 'root'
})
export class HubStreamSubscriptionService {

    sensorObservables: Map<string, Observable<SensorReading>> = new Map<string, Observable<SensorReading>>();

    constructor(private hubConnectionService: HubConnectionService) {
    }

    subscribeStream(streamName: string, sensorName: string): Observable<SensorReading> {

        // TODO: this relies on knowing the hubConnection is a ReplaySubject, rewrite
        return this.hubConnectionService.getConnection('/streamHub')
            .pipe(mergeMap(hubConnection => this.subscribeStreamToHub(streamName, sensorName, hubConnection)));
    }

    subscribeStreamToHub(streamName: string, sensorName: string, hubConnection: HubConnection): Observable<SensorReading> {
        console.log('subscribeStream ' + hubConnection + ' ' + streamName + ' ' + sensorName);

        if (this.sensorObservables.has(sensorName)) {
            return this.sensorObservables.get(sensorName).pipe(share());
        }

        console.log('subscribing to ' + streamName + ' ' + sensorName);

        let sensorReading = new Observable<SensorReading>(function subscribe(subscriber) {
            let subscription = hubConnection.stream(streamName, sensorName)
              .subscribe({
                  next: (item) => {
                      subscriber.next(<SensorReading>item);
                  },
                  complete: () => {
                      console.log('completed');
                      subscriber.complete();
                  },
                  error: (err) => {
                      console.log(err);
                      subscriber.error(err);
                  },
              });

            return function unsubscribe() {
                console.log('unsubscribing from ' + streamName + ' ' + sensorName);
                subscription.dispose();// .unsubscribe();
            };
        });

        this.sensorObservables.set(sensorName, sensorReading)

        return sensorReading;
    }
}
