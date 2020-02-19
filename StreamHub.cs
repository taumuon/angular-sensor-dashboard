﻿using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace angular_sensor_dashboard
{
    public class StreamHub : Hub
    {
        private ISensorManager _sensorManager;

        public StreamHub(ISensorManager sensorManager)
        {
            _sensorManager = sensorManager;
        }

        // TODO: investigate SignalR 3 pub-sub
        // TODO: dotnet core 3 async enumerables
        public ChannelReader<SensorReading> StartListening(string sensorIdentifier, CancellationToken cancellationToken)
        {
            var channel = Channel.CreateUnbounded<SensorReading>();

            _sensorManager.GetSensorObservable(sensorIdentifier)
                .Subscribe(val =>
                {
                    var sensorReading = new SensorReading
                    {
                        Value = val,
                        Timestamp = DateTime.Now
                    };
                    _ = Write(channel.Writer, sensorReading, cancellationToken);
                }, cancellationToken);


            return channel.Reader;
        }

        private async Task Write(ChannelWriter<SensorReading> writer, SensorReading val, CancellationToken cancellationToken)
        {
            try
            {
                await writer.WriteAsync(val, cancellationToken);
            }
            catch (Exception ex)
            {
                writer.TryComplete(ex);
            }
        }
    }
}
