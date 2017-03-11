var pg = require("pg");
var bcrypt = require('bcrypt-nodejs');

var client = new pg.Client(process.env.DATABASE_URL);

var exports = module.exports = {};

  /**
   * Function for handling
   * the callback of queries
   * err      ->  Error from database
   * result   ->  Result from query
   * callback ->  Callback to run after query finishes
   */
function resolveQuery(err, result, callback){
  if(callback)
    callback(err, result)
  else if(err)
    console.log(err)
  else
    console.log(result)
}
  /**
   * Function for handling a callback
   * that should occur after all rows 
   * inserted
   * err      -> Error from database
   * result   -> Response from database after inserting
   * index    -> Index of row that was inserted
   * length   -> Length of array of rows being inserted
   * callabck -> Callback to run after all inserted
   */
function callbackOnLast(err, result, index, length, callback){
  if(index == (length - 1) || err){
    if(callback)
      callback(err, result)
    else {
      console.log(err)
      console.log(result)
    }
  }
}
  /**
   * Stores all of a given list into relevant
   * tables using its "store single element"
   * function
   * list     ->  List to store all of
   * fcn      ->  Function for storing a single element
   * callback ->  Callback to run after all are inserted
   */
function storeAll(list, fcn, callback){
  list.forEach(function(element, index){
    var last = false;

    if(index == (list.length) - 1) 
      last = true;

    fcn(element, last, callback);
  });
}
  /*
   * Builds the values portion of an insert
   * statement 
   * IE VALUES (*$1, $2, $3*)
   * num    -> Number to count up to in value string
   * RETURN -> String in format '$1, $2 ... $num'
   */
function buildValues(num){
  var index = 1;
  var accString = '$1';
  while(index < num){
    index++;
    accString += ", $";
    accString += index.toString();
  }
  return accString;
}

  /*
   * Creates formatted query for inserting into 
   * a table 
   * tableName ->  Name of the table to insert into
   * values    ->  Array of values to insert into table
   * RETURN    ->  String in correct format for querying
   *               INSERT into database
   */
function formatInsert(tableName, values){
  var fString = "INSERT INTO %tableName% VALUES (%values%);"
  fString = fString.replace("%tableName%", tableName)

  var valsString = buildValues(values.length);

  fString = fString.replace("%values%", valsString);
  return fString;
}

  /**
   * Inserts values into tableName and runs callback 
   * on the last value of a set of inserts
   * tableName ->  Name of table to insert into
   * values    ->  Array of values to be inserted
   * last      ->  Boolean indicating whether this 
   *               is the last value
   * callback  ->  Callback to run upon 
   *               completion of the last value
   */
function insertIntoDB(tableName, values, last, callback){
  var query = formatInsert(tableName, values)
  client.query({
    text: query,
    values: values
  }, function(err, result){
      if(last)
        resolveQuery(err, result, callback)
    });
}

// See DatabaseFacadeDocumentation.txt for all //
// Functions seen in exports //
exports.connectDB = function(callback){
  client.connect(function(){
    console.log("Connected!");

    if(callback)
      callback();
  })
};

exports.getCoursesTaken = function(email, callback){
  client.query(
    {
      text: "SELECT * FROM GetCoursesTaken($1);", 
      values: [email]
    }, function(err, result){
      resolveQuery(err, result, callback);
    })
};

exports.getCourseOfficeHours = function(courseName, callback){
  client.query(
    {
      text: "SELECT Day, Time, Course as Name FROM GetCourseOfficeHours($1);",
      values: [courseName]
    }, function(err, result){
      resolveQuery(err, result, callback);
    })
};

exports.getStaffOfficeHours = function(staffEmail, callback){
  client.query(
    {
      text: "SELECT Day, Time, Course as Name FROM GetStaffOfficeHours($1);",
      values: [staffEmail]
    }, function(err, result){
      resolveQuery(err, result, callback);
    })
};

exports.getCurrentlyEnrolled = function(studentEmail, callback){
  client.query(
    {
      text: "SELECT * FROM GetCurrentlyEnrolled($1);",
      values: [studentEmail]
    }, function(err, result){
      resolveQuery(err, result, callback);
    })
};

exports.getCourseTimes = function(studentEmail, callback){
  client.query(
    {
      text: "SELECT * FROM GetCourseTimes($1);",
      values: [studentEmail]
    }, function(err, result){
      resolveQuery(err, result, callback);
    })
};

exports.getStudentsInCourse = function(courseName, callback){
  client.query({
    text: "SELECT FirstName, LastName FROM GetStudentsInCourse($1);",
    values: [courseName]
  }, function(err, result){
    resolveQuery(err, result, callback);
  })
}

exports.getStudent = function(studentEmail, callback){
  client.query({
    text: "SELECT * FROM GetStudent($1);",
    values: [studentEmail]
  }, function(err, result){
    resolveQuery(err, result, callback);
  })
}

exports.getProfessor = function(profEmail, callback){
  client.query({
    text: "SELECT * FROM GetProfessor($1);",
    values: [profEmail]
  }, function(err, result){
    resolveQuery(err, result, callback);
  })
}

exports.login = function(email, password, callback){
  client.query({
    text: "SELECT * FROM GetPassword($1);",
    values: [email]
  }, function(err, result){
    if (err){
      if(callback)
        callback(false);
      else
        console.log(err);
    }
    else{
      var dbPassword = result.rows[0].getpassword;
      var result = bcrypt.compareSync(password, dbPassword);
      if(callback)
        callback({"result": result, "Email":email})
      else
        console.log(result)
    }
  })
}

exports.studentOrProf = function(email, callback){
  client.query({
    text: "SELECT * FROM StudentOrProf($1);",
    values: [email]
  }, function(err, result){
    resolveQuery(err, result, callback);
  });
}

exports.getStudentRank = function(email, callback){
  client.query({
    text: "Select * FROM GetStudentRank($1) AS sRank;",
    values: [email]
  }, function(err, result){
    resolveQuery(err, result, callback);
  });
}

exports.storeStudent = function(student, callback){
  insertIntoDB("Student",
      [
        student.Email,
        student.Major,
        student.FirstName,
        student.LastName,
        student.Year,
        student.StudentRank,
        bcrypt.hashSync(student.Password)
      ],true, callback) 
};

exports.storeProfessor = function(prof, callback){
  insertIntoDB("Professor",
      [
        prof.Email,
        prof.FirstName,
        prof.LastName,
        prof.Office,
        bcrypt.hashSync(prof.Password)
      ], true, callback); 
};

exports.storeSecurityQuestion = function(person, callback){
  insertIntoDB("SecurityQuestion",
      [
        person.Email,
        person.Question,
        bcrypt.hashSync(person.Answer)
      ], true, callback);
};

storeOfficeHours = function(officeHour, last, callback){
  insertIntoDB("OfficeHours", 
    [
      officeHour.Day,
      officeHour.Time,
      officeHour.Email,
      officeHour.Room,
      officeHour.Course
    ], last, callback);
};

exports.storeAllOfficeHours = function(officeHours, callback){
  storeAll(officeHours, storeOfficeHours, callback);
}

storeCourseTaken = function(course, last, callback){
  insertIntoDB("CoursesTaken", 
    [
      course.Name,
      course.Num,
      course.Email
    ], last, callback);
}

exports.storeCoursesTaken = function(courses, callback){
  storeAll(courses, storeCourseTaken, callback);
}

storeEnrolled = function(course, last, callback){
  insertIntoDB("Enrolled",
    [
      course.Name,
      course.Email,
      course.Num
    ], last, callback);
}

exports.storeAllEnrolled = function(enrolled, callback){
  storeAll(enrolled, storeEnrolled, callback);
}

storeCourseTime = function(time, last, callback){
  insertIntoDB("CourseTimes", 
    [
      time.Name,
      time.Email,
      time.Day,
      time.Time
    ], last, callback);
}

exports.storeAllCourseTimes = function(times, callback){
  storeAll(times, storeCourseTime, callback);
}
