CREATE OR REPLACE FUNCTION GetCoursesTaken(Email IN VARCHAR(30)) 
RETURNS SETOF CoursesTaken AS $$
BEGIN
  RETURN QUERY (SELECT * FROM CoursesTaken C
  WHERE C.sEmail = Email);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetCourseOfficeHours(Name IN VARCHAR(50))
RETURNS SETOF OfficeHours AS $$
BEGIN
  RETURN QUERY (SELECT * FROM OfficeHours 
    WHERE Name = Course);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetStaffOfficeHours(StaffEmail IN VARCHAR(30))
RETURNS SETOF OfficeHours AS $$
BEGIN
  RETURN QUERY (SELECT * FROM OfficeHours O
  WHERE O.Email = StaffEmail);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetCurrentlyEnrolled(StudentEmail IN VARCHAR(30))
RETURNS SETOF Enrolled AS $$
BEGIN
  RETURN QUERY (SELECT * FROM Enrolled E
  WHERE E.sEmail = StudentEmail);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetCourseTimes(StudentEmail IN VARCHAR(30))
RETURNS SETOF CourseTimes AS $$
DECLARE
  C1 CURSOR FOR (SELECT Name FROM GetCurrentlyEnrolled(StudentEmail));
BEGIN
  FOR rec IN C1 LOOP
    RETURN QUERY (SELECT * FROM CourseTimes C WHERE C.Name = rec.Name
    AND sEmail = StudentEmail);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetStudentsInCourse(cName IN VARCHAR(50))
RETURNS SETOF StudentPublic AS $$
BEGIN
  RETURN QUERY(
    SELECT * FROM StudentPublic S
    WHERE S.Email IN (
      SELECT sEmail FROM Enrolled E
      WHERE E.Name = cName
  )
);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetPassword(sEmail IN VARCHAR(30))
RETURNS CHAR(60) AS $$
DECLARE
  t_password CHAR(60);
BEGIN
  SELECT Password INTO t_password
  FROM Student S 
  WHERE S.Email = sEmail;
  IF (t_password IS NULL) THEN
    SELECT Password INTO t_password
    FROM Professor P
    WHERE P.Email = sEmail;
    IF (t_password IS NULL) THEN
      RAISE EXCEPTION 'Not a valid email --> %', sEmail
        USING HINT = 'Email not found in system';
    END IF;
  END IF;
  RETURN t_password;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION StudentOrProf(sEmail IN VARCHAR(30))
RETURNS CHAR(9) AS $$
DECLARE
  t_FirstName CHAR(60);
BEGIN
  SELECT FirstName INTO t_FirstName
  FROM Student S
  WHERE S.Email = sEmail;
  IF (t_FirstName IS NOT NULL) THEN
    RETURN 'Student';
  ELSE
    SELECT FirstName INTO t_FirstName
    FROM Professor P
    WHERE P.Email = sEmail;
    IF (t_FirstName IS NOT NULL) THEN
      RETURN 'Professor';
    END IF;
  END IF;
  RAISE EXCEPTION 'Not a valid email --> %', sEmail
  USING HINT = 'Email not found in system';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetStudentRank(sEmail IN VARCHAR(30))
RETURNS INT AS $$
DECLARE
  t_rank INT;
BEGIN
  SELECT StudentRank INTO t_rank
  FROM Student S
  WHERE S.Email = sEmail;
  IF (t_rank IS NOT NULL) THEN
    RETURN t_rank;
  ELSE
    RAISE EXCEPTION 'Not a valid student email --> %', sEmail
    USING HINT = 'Email not found in Student table';
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetStudent(sEmail IN VARCHAR(30))
RETURNS SETOF StudentPublic AS $$
Begin
  RETURN QUERY (SELECT * FROM StudentPublic WHERE Email = sEmail);
End;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetProfessor(sEmail IN VARCHAR(30))
RETURNS SETOF ProfessorPublic AS $$
Begin
  RETURN QUERY (SELECT * FROM ProfessorPublic WHERE Email = sEmail);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION Search(Query IN VARCHAR(50))
RETURNS SETOF SearchView AS $$
BEGIN
  RETURN QUERY (SELECT * FROM SearchView
    WHERE UPPER(FirstName) LIKE UPPER('%'||Query||'%') OR 
          UPPER(LastName) LIKE UPPER('%'||Query||'%') OR 
          UPPER(Email) LIKE UPPER('%'||Query||'%'));
END;
$$ LANGUAGE plpgsql;

