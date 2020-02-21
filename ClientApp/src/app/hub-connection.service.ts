import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {
    connectionMap: Map<string, ReplaySubject<HubConnection>> = new Map<string, ReplaySubject<HubConnection>>();

    constructor() { }

    getConnection(url: string): Observable<HubConnection> {

        if (this.connectionMap.has(url)) {
            return this.connectionMap.get(url);
        }

        let newConnection = this.createConnection(url);

        this.connectionMap.set(url, newConnection);

        return newConnection.asObservable();
    }

    private createConnection(url: string): ReplaySubject<HubConnection> {

        let hubConnected = new ReplaySubject<HubConnection>(1);

        console.log('createConnection for ' + url);

        let hubConnection = new HubConnectionBuilder()
            .withUrl(url)
            //.withAutomaticReconnect()
            //.configureLogging(signalR.LogLevel.Trace)
            .build();

        hubConnection
            .start()
            .then(() => {
                console.log("connected to " + url);

                hubConnected.next(hubConnection);
            })
            .catch(err => {
                err => console.log('Error while estabilishing connection to url: ' + url + ' err: ' + err)
            });

        // TODO: disposing of hub connection ?

        return hubConnected;
    }
}
