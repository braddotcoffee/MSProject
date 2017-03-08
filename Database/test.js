var db = require("./DatabaseFacade.js");

db.connectDB();
db.getCoursesTaken('bwbonanno@wpi.edu', function(err, result){
  console.log("Inside Courses Taken Callback");
  console.log(result.rows);
});

db.getCourseOfficeHours('Webware', function(err, result){
  console.log('Inside Course Office Hours Callback');
  console.log(result.rows)
});

db.getStaffOfficeHours('lharrison@wpi.edu', function(err, result){
  console.log('Inside Staff Office Hours Callback');
  console.log(result.rows);
});

db.getCurrentlyEnrolled('bwbonanno@wpi.edu', function(err, result){
  console.log('Inside Currently Enrolled Callback')
  console.log(result.rows);
})

db.getCourseTimes('bwbonanno@wpi.edu', function(err, result){
  console.log('Inside Course Times Callback')
  console.log(result.rows);
})

student = {
  "Email": "test2@email.com",
  "Major": null,
  "FirstName": "Test",
  "LastName": "Testerson",
  "Year": "Sophomore",
  "StudentRank": "1",
  "Password": "Dank"
};

//db.storeStudent(student);

prof = {
  "Email" : "testProf@wpi.edu",
  "FirstName": "Testy",
  "LastName": "Testerson",
  "Office": "FL 128",
  "Password": "What a password this is"
};

//db.storeProfessor(prof);

secPerson = {
  "Email":"testProf@wpi.edu",
  "Question":"What is 1+1?",
  "Answer":"2"
};

//db.storeSecurityQuestion(secPerson);

oo1 = {
  "Day": "Tuesday",
  "Time": "10:00AM",
  "Email":"lharrison@wpi.edu",
  "Room":"FL-129",
  "Course":"Webware"
}

oo2 = {
  "Day": "Wednesday",
  "Time": "10:00AM",
  "Email":"lharrison@wpi.edu",
  "Room":"FL-129",
  "Course":"Webware"
}

oo3 = {
  "Day": "Wednesday",
  "Time": "8:00AM",
  "Email":"lharrison@wpi.edu",
  "Room":"FL-129",
  "Course":"Data Visualization"
}

officeHours = [oo1, oo2, oo3]

//db.storeAllOfficeHours(officeHours, function(){console.log("TestCallback")});

c1 = {
  "Name":"Assembly",
  "Num":"2011",
  "Email":"bwbonanno@wpi.edu"
}

c2 = {
  "Name":"Systems",
  "Num":"2303",
  "Email":"bwbonanno@wpi.edu"
}

c3 = {
  "Name":"OS",
  "Num":"3013",
  "Email":"bwbonanno@wpi.edu"
}

coursesTaken = [c1,c2,c3]
//db.storeCoursesTaken(coursesTaken, function(){console.log("Test Callback")});

e1 = {
  "Name": "SoftSec",
  "Email": "bwbonanno@wpi.edu",
  "Num":"4000"
}

e2 = {
  "Name": "Advanced Stats",
  "Email": "bwbonanno@wpi.edu",
  "Num":"4000"
}

e3 = {
  "Name": "Gov",
  "Email": "bwbonanno@wpi.edu",
  "Num":"2000"
}

enrolled = [e1, e2, e3]
//db.storeAllEnrolled(enrolled);

t1 = {
  "Name": "SoftSec",
  "Email":"bwbonanno@wpi.edu",
  "Day":"Monday",
  "Time":"10:00AM"
} 

t2 = {
  "Name": "SoftSec",
  "Email":"bwbonanno@wpi.edu",
  "Day":"Wednesday",
  "Time":"10:00AM"
} 

t3 = {
  "Name": "SoftSec",
  "Email":"bwbonanno@wpi.edu",
  "Day":"Friday",
  "Time":"10:00AM"
} 

times = [t1,t2,t3]

// db.storeAllCourseTimes(times,
//   function(result){
//     console.log(result)
//     console.log("Test new callback system")
//   }
// )

db.getStudentsInCourse('SoftSec', function(err, results){
  console.log("Success!");
  console.log(results.rows[0]);
})

db.login('test2@email.com', 'Dank');
db.login('test2@email.com', 'NotDank');
db.login('testProf@wpi.edu', 'What a password this is');

db.studentOrProf('bwbonanno@wpi.edu');
db.getStudentRank('bwbonanno@wpi.edu');
