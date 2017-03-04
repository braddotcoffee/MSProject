var bcrypt = require("bcrypt-nodejs")

bcrypt.hash("The answer to my security question", null, null, function(err, hash){
  console.log(hash)
  console.log(hash.length)
});
