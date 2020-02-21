import { Component, OnInit } from '@angular/core';
import { SensorConfigItem } from '../SensorConfigItem';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-configuration-new-item',
  templateUrl: './configuration-new-item.component.html',
  styleUrls: ['./configuration-new-item.component.css']
})
export class ConfigurationNewItemComponent implements OnInit {

    sensorConfig = new SensorConfigItem();

    constructor(private configurationService: ConfigurationService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.configurationService.addSensor(this.sensorConfig);
        this.sensorConfig = new SensorConfigItem();
    }
}
