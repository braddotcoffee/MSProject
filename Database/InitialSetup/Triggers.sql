DROP FUNCTION OfficeHoursTrigger();

CREATE OR REPLACE FUNCTION OfficeHoursTrigger()
RETURNS TRIGGER AS $$
DECLARE
  t_studentRank INT;
  t_professorEmail VARCHAR(30);
BEGIN
  SELECT Email INTO t_professorEmail FROM Professor P
  WHERE P.Email = NEW.Email;
  IF NOT FOUND THEN
    SELECT StudentRank INTO t_studentRank FROM Student S
    WHERE S.Email = NEW.Email;
    IF t_studentRank < 1 THEN
      RAISE EXCEPTION 'Not an SA or TA --> %', NEW.Email
        USING HINT = 'Only StudentRank 1 or 2 can hold office hours';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER OfficeHoursFromStudents
  BEFORE INSERT OR UPDATE ON OfficeHours
  FOR EACH ROW
  EXECUTE PROCEDURE OfficeHoursTrigger();


