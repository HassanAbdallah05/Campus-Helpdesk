const mongoose = require("mongoose");

const connectDB = async () => { // async cuz connecting to mongo takes some time
  try { // javascript wait for db connection result then continue
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;