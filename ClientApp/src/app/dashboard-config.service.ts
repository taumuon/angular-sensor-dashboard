import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DashboardItemType, DashboardConfigItem } from './DashboardConfigItem';

@Injectable({
  providedIn: 'root'
})
export class DashboardConfigService {

    DashboardConfig: DashboardConfigItem[] = [
        { sensorName: 'temperature_room_1', type: DashboardItemType.Value, minMax: false },
        { sensorName: 'temperature_room_1', type: DashboardItemType.Value, minMax: true },
        { sensorName: "humidity_room_2", type: DashboardItemType.Value, minMax: false },
        { sensorName: "temperature_room_1", type: DashboardItemType.Chart, minMax: false },
        { sensorName: "temperature_room_2", type: DashboardItemType.Chart, minMax: false },
        { sensorName: "humidity_room_2", type: DashboardItemType.Chart, minMax: true }
    ];

    constructor() {
    }

    getConfig(): Observable<DashboardConfigItem[]> {
        return of(this.DashboardConfig);
    }
}
