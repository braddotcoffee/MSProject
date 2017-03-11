DROP VIEW StudentPublic CASCADE;
DROP VIEW ProfessorPublic CASCADE;

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

CREATE VIEW SearchView AS (
  SELECT FirstName, LastName, Email
  FROM Professor
  UNION
  SELECT FirstName, LastName, Email
  FROM Student
);
