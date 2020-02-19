export enum DashboardItemType {
    Value,
    Chart
}

export interface DashboardConfigItem {
    sensorName: string;
    type: DashboardItemType;
    minMax: boolean;
}
