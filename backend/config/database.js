const mongoose = require("mongoose");

const Connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Database Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while connectiing database: ${error.message}`);
  }
};

module.exports = Connection;
