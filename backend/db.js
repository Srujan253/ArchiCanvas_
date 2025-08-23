const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDatabase = () => {
  mongoose
    .connect(dbUrl, connectionParams)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
      process.exit(1); // Exit the process if the database connection fails
    });
};

module.exports = connectDatabase;
