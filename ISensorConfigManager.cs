
using System.Collections.Generic;

namespace angular_sensor_dashboard
{
    public interface ISensorConfigManager
    {
        IEnumerable<SensorConfigInfo> Sensors { get; }

        bool TryAdd(SensorConfigInfo sensor);
    }
}
