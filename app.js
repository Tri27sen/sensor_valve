const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./dbconnect.js');
const SensorData = require('./sensor.js');

const cors = require('cors')
console.log("connecting to database");
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Define a route for handling GET requests to /sensorData
app.post('/', async(req, res) => {
 try{
  console.log("the request is");
 // console.log(req)
  const sensorValue = req.body.infrared_value;
  console.log(req.body)
  // Log the sensor value
  console.log('Received sensor value:', sensorValue);

  const sensorData = new SensorData({
    value:sensorValue
  });

  await sensorData.save();

  res.status(200).send('Sensor data saved successfully');
} catch (error) {
  console.error('Error saving sensor data:', error);
  res.status(500).send('Internal server error');
}
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
