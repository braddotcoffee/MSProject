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
  CONSTRAINT checkStudentRank check 
  (StudentRank IN (0,1,2))
);

CREATE TABLE Professor (
  Email VARCHAR(30) PRIMARY KEY,
  FirstName VARCHAR(20) NOT NULL,
  LastName VARCHAR(30) NOT NULL,
  Office VARCHAR(10) NOT NULL,
  Password CHAR(60) NOT NULL
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
  Room CHAR(10),
  PRIMARY KEY (Day, Time, Email)
);

CREATE TABLE CoursesTaken (
  Name VARCHAR(50),
  Num VARCHAR(5),
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
  Time CHAR(8)
);
