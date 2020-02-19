using System;

namespace angular_sensor_dashboard
{
    public interface ISensorManager
    {
        IObservable<double> GetSensorObservable(string sensorIdentifier);
    }
}
