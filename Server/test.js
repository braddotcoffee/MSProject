var req = require("request");
var fs = require('fs');

function testQueries(url, err, res, body){
  console.log("-----RESPONSE FOR "+url+"-----")
  body = JSON.parse(body);
  body.forEach(function(item){console.log(item)})
}

function testStores(url, err, res, body){
  console.log("-----RESPONSE FOR "+url+"-----")
  console.log(res.statusCode)
  if(res.statusCode == 400)
    console.log("Duplicate store attempted")
}

function testLogin(url, err, res, body){
  console.log("-----RESPONSE FOR "+url+"-----")
  console.log(JSON.parse(body))
}

function testPost(url, body, callback){
  console.log("Testing "+url);
  req.post({
    headers: {
      "Content-Type":"application/json"
    },
    url: "http://localhost:3000"+url,
    body: body
  }, callback.bind(null, url)) 
}

json = {"Email":"bwbonanno@wpi.edu"}
testPost('/coursesTaken', JSON.stringify(json), testQueries);

json = {"Name":"Webware"}
testPost('/courseOfficeHours', JSON.stringify(json), testQueries);

json = {"Email":"lharrison@wpi.edu"}
testPost('/staffOfficeHours', JSON.stringify(json), testQueries);

json = {"Email":"bwbonanno@wpi.edu"}
testPost('/currentlyEnrolled', JSON.stringify(json),testQueries);

json = {"Email":"bwbonanno@wpi.edu"}
testPost('/courseTimes', JSON.stringify(json), testQueries);

json = {"Name":"SoftSec"}
testPost('/studentsInCourse', JSON.stringify(json), testQueries);

json = {
  "Email":"testPostStudent@test.com",
  "Major":"ECE",
  "FirstName":"TestFromPost",
  "LastName":"Smith",
  "Year":"Junior",
  "StudentRank":"0",
  "Password":"Password1"
};
testPost('/storeStudent', JSON.stringify(json), testStores);

json = {
  "Email":"testProfFromPost@wpi.edu",
  "FirstName":"Testy",
  "LastName":"Smitest",
  "Office":"FL 199",
  "Password":"Password"
};
testPost('/storeProfessor', JSON.stringify(json), testStores);

json = {
  "Email":"testProfFromPost@wpi.edu",
  "Question":"What is 1+1?",
  "Answer": "2"
};
testPost('/storeSecurityQuestion', JSON.stringify(json), testStores);

oo1 = {
  "Day": "Tuesday",
  "Time": "11:00AM",
  "Email":"lharrison@wpi.edu",
  "Room":"FL-129",
  "Course":"Webware"
}

oo2 = {
  "Day": "Wednesday",
  "Time": "11:00AM",
  "Email":"lharrison@wpi.edu",
  "Room":"FL-129",
  "Course":"Webware"
}

oo3 = {
  "Day": "Wednesday",
  "Time": "9:00AM",
  "Email":"lharrison@wpi.edu",
  "Room":"FL-129",
  "Course":"Data Visualization"
}

officeHours = [oo1, oo2, oo3]
json = {"Hours":officeHours}
testPost('/storeOfficeHours', JSON.stringify(json), testStores);

c1 = {
  "Name":"Assembly",
  "Num":"2011",
  "Email":"testPostStudent@test.com"
}

c2 = {
  "Name":"Systems",
  "Num":"2303",
  "Email":"testPostStudent@test.com"
}

c3 = {
  "Name":"OS",
  "Num":"3013",
  "Email":"testPostStudent@test.com"
}

coursesTaken = [c1,c2,c3]
json = {"Courses":coursesTaken}
testPost('/storeCoursesTaken', JSON.stringify(json), testStores);

e1 = {
  "Name": "SoftSec",
  "Email": "testPostStudent@test.com",
  "Num":"4000"
}

e2 = {
  "Name": "Advanced Stats",
  "Email": "testPostStudent@test.com",
  "Num":"4000"
}

e3 = {
  "Name": "Gov",
  "Email": "testPostStudent@test.com",
  "Num":"2000"
}

enrolled = [e1, e2, e3]
json = {"Enrolled":enrolled}
testPost('/storeEnrolled', JSON.stringify(json), testStores);

t1 = {
  "Name": "SoftSec",
  "Email":"testPostStudent@test.com",
  "Day":"Monday",
  "Time":"10:00AM"
} 

t2 = {
  "Name": "SoftSec",
  "Email":"testPostStudent@test.com",
  "Day":"Wednesday",
  "Time":"10:00AM"
} 

t3 = {
  "Name": "SoftSec",
  "Email":"testPostStudent@test.com",
  "Day":"Friday",
  "Time":"10:00AM"
} 

times = [t1,t2,t3]
json = {"Times":times}
testPost('/storeCourseTimes', JSON.stringify(json), testStores);

json = {"Email":"test2@email.com", "Password":"Dank"}
testPost('/loginCred', JSON.stringify(json), testLogin);

json = {"Email":"testProf@wpi.edu", 
  "Password":"What a password this is"}
testPost('/loginCred', JSON.stringify(json), testLogin);
