const mongoose = require("mongoose");
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI =
  "mongodb://amitsaini:earthisfooddlivery@ac-dilbjsb-shard-00-00.t8cilu3.mongodb.net:27017,ac-dilbjsb-shard-00-01.t8cilu3.mongodb.net:27017,ac-dilbjsb-shard-00-02.t8cilu3.mongodb.net:27017/foodDeliveryData?ssl=true&replicaSet=atlas-hi71yk-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
    if (err) console.log("---" + err);
    else {
      // var database =
      console.log("connected to mongo");
      const foodCollection = await mongoose.connection.db.collection(
        "food_items"
      );
      // console.log(foodCollection);
      foodCollection.find({}).toArray(async function (err, data) {
        const categoryCollection = await mongoose.connection.db.collection(
          "foodCategory"
        );
        categoryCollection.find({}).toArray(async function (err, Catdata) {

           callback(err, data, Catdata);
          if(err) console.log(err);
          else{
            global.food_items = data;
            global.foodCategory = Catdata;
          }
        });
      });
      // listCollections({name: 'food_items'}).toArray(function (err, database) {
      // });
      //     module.exports.Collection = database;
      // });
    }
  });
};
