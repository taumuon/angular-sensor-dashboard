using System;

namespace angular_sensor_dashboard
{
    public interface ISensor
    {
        IObservable<double> GetReadings();
    }
}
