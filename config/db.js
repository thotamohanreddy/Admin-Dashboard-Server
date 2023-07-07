const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");
const data = require("../jsondata.json");


const mongodbUser = process.env.MONGODB_USER
const mongodbPassword = process.env.MONGODB_PASSWORD
const mongodbCluster = process.env.MONGODB_CLUSTER
console.log(mongodbUser);
console.log(mongodbPassword);
console.log(mongodbCluster)
const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbCluster}.v2zjryd.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  
  const connection = mongoose.connection;
  
  connection.on("error", () => {
    console.log("Mongo DB Connection Failed");
  });
  
  connection.on("connected", () => {
    console.log("Mongo DB Connection Successful");
  
    // Read the JSON data for rooms
    const newsFilePath = path.join(__dirname, "../jsondata.json");
    const newsData = JSON.parse(fs.readFileSync(newsFilePath));
  
    // Clear existing data from the rooms collection
    const NewsArticle = require("../models/newsArticle"); // Replace with your actual room model
    NewsArticle.deleteMany({})
      .then(() => {
        console.log("Existing news documents cleared");
        // Insert data into the rooms collection
        return NewsArticle.insertMany(newsData);
      })
      .then((result) => {
        console.log(`${result.length} news documents inserted into the collection`);
      })
      .catch((error) => {
        console.error("Error inserting room documents:", error);
      });
  });

module.exports = mongoose.connection;
