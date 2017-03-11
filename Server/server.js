var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var db         = require('../Database/DatabaseFacade.js');
var app        = express();
var port       = process.env.PORT || 3000;

function sendJSON(res, json){
  res.set({
    "Content-Type" : "application/json"
  });

  res.end(JSON.stringify(json));
}

function sendResultRows(res, err, result){
  sendJSON(res, result.rows);
};

function sendStatus(res, err){
  if(err)
    res.sendStatus(400)
  else
    res.sendStatus(200);
};

function studentRank(res, json){
  db.getStudentRank(json.Email, function(err, result){
    json.studentRank = result.rows[0].srank;
    sendJSON(res, json);
  });
};

function studentOrProf(res, json){
  db.studentOrProf(json.Email, function(err, result){
    if(err){
      console.log(err)
      sendJSON(res, {"Email":""});
    }
    else{
      json.studentOrProf = result.rows[0].studentorprof; 
      if(json.studentOrProf == 'Student')
        studentRank(res, json)
      else
        sendJSON(res, json)
    }

  })
}

function loginResult(res, result){
  if(!result.result)
    sendJSON(res, result);
  else 
    studentOrProf(res, result)
};

db.connectDB();

// Set header for all responses //
app.use(function(req, res, next){
  res.set({"X-Content-Type-Options":"nosniff"});
  return next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(express.static(path.join(__dirname, "../Client/Static")));
app.use("/Client", express.static(path.join(__dirname, "../Client")));
app.use("/node_modules", express.static(path.join(__dirname, "../node_modules")))

// {"Email":<Email>} 
app.post('/coursesTaken', function(req, res, next){
  var email = req.body.Email;

  db.getCoursesTaken(email, sendResultRows.bind(null,res));
});
// {"Name":<Name>}
app.post('/courseOfficeHours', function(req, res, next){
  var courseName = req.body.Name;

  db.getCourseOfficeHours(courseName, sendResultRows.bind(null,res));
});
// {"Email":<Email>}
app.post('/staffOfficeHours', function(req,res,next){
  var staffEmail = req.body.Email;

  db.getStaffOfficeHours(staffEmail, sendResultRows.bind(null, res));
});
// {"Email":<Email>}
app.post('/currentlyEnrolled', function(req,res,next){
  var studentEmail = req.body.Email;

  db.getCurrentlyEnrolled(studentEmail, sendResultRows.bind(null, res));
});
// {"Email":<Email>}
app.post('/courseTimes', function(req,res,next){
  var studentEmail = req.body.Email;

  db.getCourseTimes(studentEmail, sendResultRows.bind(null, res));
});
// {"Name":<Name>}
app.post('/studentsInCourse', function(req,res,next){
  var courseName = req.body.Name;

  db.getStudentsInCourse(courseName, sendResultRows.bind(null, res));
});
// {"Email":<Email>}
app.post('/getStudent', function(req, res, next){
  var studentEmail = req.body.Email;

  db.getStudent(studentEmail, sendResultRows.bind(null, res));
});
// {"Email":<Email>}
app.post('/getProfessor', function(req, res, next){
  var profEmail = req.body.Email;

  db.getProfessor(profEmail, sendResultRows.bind(null, res));
});
// {"Email":<Email>}
app.post('/studentOrProf', function(req,res,next){
  console.log(req.body);
  studentOrProf(res, req.body);
})
// {"Email":<Email>, "Password":<Password>}
app.post('/loginCred', function(req, res, next){
  var email = req.body.Email;
  var password = req.body.Password;

  db.login(email, password, loginResult.bind(null, res));
})
// {"Email":<Email>, "FirstName":<Name>...}
app.post('/storeStudent', function(req,res,next){
  var student = req.body;

  db.storeStudent(student, sendStatus.bind(null, res));
});
// {"Email":<Email>, "FirstName":<Name>...}
app.post('/storeProfessor', function(req,res,next){
  var prof = req.body;

  db.storeProfessor(prof, sendStatus.bind(null,res));
})
// {"Email":<Email>,"Question":<Q>,"Answer":<A>}
app.post('/storeSecurityQuestion', function(req,res,next){
  var person = req.body;

  db.storeSecurityQuestion(person, sendStatus.bind(null,res));
})
// {"Hours":[<Office Hours JSONs>]}
app.post('/storeOfficeHours', function(req,res,next){
  var hours = req.body.Hours;

  db.storeAllOfficeHours(hours, sendStatus.bind(null,res));
})
// {"Courses:[<CourseTaken JSONs>]"}
app.post('/storeCoursesTaken', function(req,res,next){
  var courses = req.body.Courses;

  db.storeCoursesTaken(courses, sendStatus.bind(null, res));
})
// {"Enrolled":[<Enrolled JSONs>]}
app.post('/storeEnrolled', function(req,res,next){
  var enrolled = req.body.Enrolled;

  db.storeAllEnrolled(enrolled, sendStatus.bind(null, res));
})
// {"Times":[<CourseTime JSONs>]}
app.post('/storeCourseTimes', function(req,res,next){
  var times = req.body.Times;

  db.storeAllCourseTimes(times, sendStatus.bind(null, res));
})

app.get("*", function(req,res){
  res.sendFile(path.join(__dirname, '../Client/Static/index.html'));
})

app.listen(port, function(){
  console.log("App is listening on port " + port);
});

