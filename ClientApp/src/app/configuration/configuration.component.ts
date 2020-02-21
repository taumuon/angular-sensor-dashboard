import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { SensorConfigItem } from '../SensorConfigItem';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

    SensorConfig: SensorConfigItem[];

    Loading: boolean = true;

    constructor(private configurationService: ConfigurationService) { }

    ngOnInit() {
        this.getSensorConfig();
    }

    getSensorConfig() {
        this.configurationService.getConfig()
            .subscribe(config =>
            {
                console.log(config);
                this.SensorConfig = config;
                this.Loading = false;
            });
    }
}
