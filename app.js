
const detenv = require('dotenv')
const express = require('express');
const app = express();
const port = 3000;
const twilio = require('twilio');
const connectDB = require('./dbconnect.js');
//const sensorDataRouter = require('./routes/sensorDataRouter');
const SensorData=require('./sensor.js')
const cors = require('cors')
console.log("connecting to database");
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var i =0 ;
var room ; 
// Start the server
const accountSid = '';
const authToken ='';
console.log(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN,process.env.PHONE_NUM)
const client = require('twilio')(accountSid, authToken);
//console.log(client)
  app.post('/', async(req, res) => {
    try{
     console.log("the request is");
    // console.log(req)
     
     console.log(req.body.data)
     console.log(typeof(req.body.data))
    const requestData = JSON.parse(req.body.data);
    console.log(requestData);

    // Extract AO and DO values from the parsed data
    const AO1 = requestData.AO1;
    const DO1 = requestData.DO1;
    const AO2 = requestData.AO2;
    const DO2 = requestData.DO2;
    // Extract AO and DO values for Sensor 1
    const aoValue1 = parseInt(AO1);
    const doValue1 = parseInt(DO1);
    const aoValue2 = parseInt(AO2);
const doValue2 = parseInt(DO2);
    console.log("typeof A01");
    console.log(typeof(AO1));
    console.log("typeof aoValue1");
    console.log(typeof(aoValue1));

console.log("Sensor 1 - AO Value:", AO1);
console.log("Sensor 1 - DO Value:", DO1);
console.log("Sensor 2 - AO Value:", AO2);
console.log("Sensor 2 - DO Value:", DO2);
     
   if(aoValue1 < 200 || aoValue2 < 200){
     const sensorData = new SensorData({
      a1: aoValue1,
      d1: doValue1,
      a2: aoValue2,
      d22: doValue2
     });
   
     await sensorData.save();
     console.log('Sensor data saved successfully');
     res.status(200).send('Sensor data saved successfully');
     if(aoValue1 < 200){
       room = aoValue1 ;
     }
     else {
      room = aoValue2 
     }
     if(i==0)
     {
     sendSMS(room);
     i=i+1;
     }
   }else {
    console.log('Sensor data not saved because AO1 and AO2 values are not greater than 500');
    res.status(200).send('Sensor data not saved because AO1 and AO2 values are not greater than 500');
  }
 } catch (error) {
     console.error('Error saving sensor data:', error);
     res.status(500).send('Internal server error');
   }
   });
   
   // Start the server
   function sendSMS(room) {
    client.messages
        .create({
            body: 'Fire detected! Sensor values exceeded 500.',
            from: '+18156495036',
            to: '+918017556334'
        })
        .then(message => console.log('SMS sent:', message.sid))
        .catch(error => console.error('Error sending SMS:', error));
}
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });

   
