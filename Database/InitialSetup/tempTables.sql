DROP TABLE Courses;

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
  REFERENCES Courses(Code),
  PRIMARY KEY (cCode, sEmail)
);

CREATE TABLE CourseStaff (
  sEmail VARCHAR(30) 
  REFERENCES Student(Email),
  cCode CHAR(16)
  REFERENCES Courses(Code),
  sRank INT NOT NULL,
  PRIMARY KEY (sEmail, cCode),
  CONSTRAINT checkRank CHECK
  (sRank IN (1,2))
);

CREATE TABLE Skills (
  Email VARCHAR(30)
  REFERENCES Student(Email),
  Skill VARCHAR(50),
  Comfort INT NOT NULL,
  PRIMARY KEY (Email, Skill),
  CONSTRAINT checkComfort CHECK
  (Comfort >= 1 AND Comfort <= 10)
);

