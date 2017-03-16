DROP FUNCTION GetStudentsInCourse(cName IN VARCHAR(50));

DROP VIEW StudentPublic;
DROP VIEW ProfessorPublic;

DROP FUNCTION GetCourseOfficeHours(Name IN VARCHAR(50));
DROP FUNCTION GetStaffOfficeHours(StaffEmail IN VARCHAR(30));
DROP FUNCTION GetCoursesTaken(Email IN VARCHAR(30));
DROP FUNCTION GetCurrentlyEnrolled(Email IN VARCHAR(30));
DROP FUNCTION GetCourseTimes(Email IN VARCHAR(30));

DROP TABLE CoursesTaken;
DROP TABLE Enrolled;
DROP TABLE CourseTimes;
DROP TABLE Student;
DROP TABLE Professor;
DROP TABLE SecurityQuestion;
DROP TABLE OfficeHours;

CREATE TABLE Student (
  Email VARCHAR(30) PRIMARY KEY,
  Major VARCHAR(30),
  FirstName VARCHAR(20) NOT NULL,
  LastName VARCHAR(30) NOT NULL,
  Year VARCHAR(9),
  StudentRank INT NOT NULL,
  Password CHAR(60) NOT NULL,
  Image VARCHAR(60),
  SessionID CHAR(60),
  CONSTRAINT checkStudentRank check 
  (StudentRank IN (0,1,2))
);

CREATE TABLE Professor (
  Email VARCHAR(30) PRIMARY KEY,
  FirstName VARCHAR(20) NOT NULL,
  LastName VARCHAR(30) NOT NULL,
  Office VARCHAR(10) NOT NULL,
  Password CHAR(60) NOT NULL,
  Image VARCHAR(60),
  SessionID CHAR(60)
);

CREATE TABLE SecurityQuestion (
  Email VARCHAR(30) PRIMARY KEY,
  Question VARCHAR(50) NOT NULL,
  Answer VARCHAR(60) NOT NULL
);

CREATE TABLE OfficeHours (
  Day CHAR(9),
  Time CHAR(8),
  Email VARCHAR(30),
  Room CHAR(10) NOT NULL,
  Course VARCHAR(50) NOT NULL,
  cCode CHAR(16) 
  REFERENCES Courses(Code),
  PRIMARY KEY (Day, Time, Email)
);

CREATE TABLE CoursesTaken (
  Name VARCHAR(50),
  Num VARCHAR(7),
  sEmail VARCHAR(30) 
  REFERENCES Student(Email),
  PRIMARY KEY (sEmail, Name)
);

CREATE TABLE Enrolled (
  Name VARCHAR(50),
  sEmail VARCHAR(30)
  REFERENCES Student(Email),
  Num VARCHAR(5),
  PRIMARY KEY (sEmail, Name)
);

CREATE TABLE CourseTimes (
  Name VARCHAR(50),
  sEmail VARCHAR(30)
  REFERENCES Student(Email),
  Day CHAR(9),
  Time CHAR(8),
  PRIMARY KEY (sEmail, Name, Day, Time)
);

CREATE TABLE Courses (
  Code CHAR(16) PRIMARY KEY,
  pEmail VARCHAR(30),
  Name VARCHAR(50),
  Department VARCHAR(4),
  Num VARCHAR(5)
);

CREATE TABLE SignedUp (
  sEmail VARCHAR(30)
  REFERENCES Student(Email),
  cCode CHAR(16)
  REFERENCES Course(Code),
  PRIMARY KEY (cCode, sEmail)
);

CREATE TABLE CourseStaff (
  sEmail VARCHAR(30) 
  REFERENCES Student(Email),
  cCode CHAR(16)
  REFERENCES Course(Code),
  sRank INT NOT NULL,
  PRIMARY KEY (sEmail, cCode)
);

CREATE VIEW StudentPublic AS(
  SELECT Email, Major, FirstName,
  LastName, Year, StudentRank, Image
  FROM Student
);

CREATE VIEW ProfessorPublic AS (
  SELECT Email, FirstName, 
  LastName, Office, Image
  FROM Professor
);
