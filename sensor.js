const mongoose = require("mongoose")
const User = require('.user.js');
const sensorDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// Reference to the user who owns this sensor data
  value: { type: Number, required: true }, // Sensor value
  timestamp: { type: Date, default: Date.now } // Timestamp of when the sensor data was received
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
