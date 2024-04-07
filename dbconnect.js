const mongoose = require("mongoose")
console.log("connecting.....")
const dbConnect = async () => {
  await mongoose.connect("");

  mongoose.connection.on("connected", () => {
    console.log("Connected to the Database successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Error while connecting to the Database. \n${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the Database");
  });
};
dbConnect()
module.exports = dbConnect;
