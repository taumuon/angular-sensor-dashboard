﻿using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace angular_sensor_dashboard
{
    public class ConfigurationHub : Hub
    {
        private readonly ISensorConfigManager _sensorConfigManager;

        public ConfigurationHub(ISensorConfigManager sensorConfigManager)
        {
            _sensorConfigManager = sensorConfigManager;
        }

        public IEnumerable<SensorConfigInfo> Sensors()
        {
            return _sensorConfigManager.Sensors;
        }

        public string AddSensor(string sensorName, string manufacturer, string hostDevice, string units)
        {
            SensorConfigInfo sensorConfigInfo = new SensorConfigInfo
            {
                Name = sensorName, Manufacturer = manufacturer, HostDevice = hostDevice, SensorUnits = units
            };

            if (sensorName == "invalid")
                return "sensor name not valid"; // TODO: just for testing

            if (!_sensorConfigManager.TryAdd(sensorConfigInfo))
            {
                return $"Sensor with name '{sensorName}' already exists";
            }

            var sensorConfigUpdate = new SensorConfigUpdate { IsAdd = true, SensorConfig = sensorConfigInfo };
            // Clients.Others
            Clients.All.SendAsync("ConfigUpdated", sensorConfigUpdate);

            return "";
        }
    }
}
