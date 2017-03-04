var pg = require("pg");

var client = new pg.Client(process.env.DATABASE_URL);

var exports = module.exports = {};

/* Connect to database */
exports.connectDB = function(callback){
  client.connect(function(){
    console.log("Connected!");
    

    if(callback)
      callback();
  })
};

/** Reference
exports.insertDB = function(uid, pid, body) {
  console.log("Making query");
  client.query({
    text: "INSERT INTO posts VALUES ($1, $2, $3, NOW()::timestamp, 0)",
    values: [
      uid,
      pid,
      body
    ]
  }, function(err, result){
    if(err)
      console.log(err);
    else
      console.log("Success");
  });
}
*/
