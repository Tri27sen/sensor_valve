const mongoose = require("mongoose")

const sensorDataSchema = new mongoose.Schema({
 // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// Reference to the user who owns this sensor data
  a1: { type: Number, required: true }, // Sensor value
  d1: { type: Number, required: true },
  a2: { type: Number, required: true }, // Sensor value
  d22: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now } // Timestamp of when the sensor data was received
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
