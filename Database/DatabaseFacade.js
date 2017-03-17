var pg = require("./psql.js")

module.exports = {
  connectDB : pg.connectDB, // Optional callback
  storeStudent: pg.storeStudent,
  storeProfessor: pg.storeProfessor,
  storeSecurityQuestion : pg.storeSecurityQuestion,
  storeAllOfficeHours : pg.storeAllOfficeHours,
  storeCoursesTaken : pg.storeCoursesTaken,
  storeAllEnrolled : pg.storeAllEnrolled,
  storeAllCourseTimes : pg.storeAllCourseTimes,
  storeAllSkills : pg.storeAllSkills,
  storeCourse: pg.storeCourse,
  registerStudent: pg.registerStudent,
  registerStaff: pg.registerStaff,

  // Optional callback with results
  getCoursesTaken : pg.getCoursesTaken,
  getCourseOfficeHours: pg.getCourseOfficeHours,
  getStaffOfficeHours: pg.getStaffOfficeHours,
  getCurrentlyEnrolled: pg.getCurrentlyEnrolled,
  getCourseTimes: pg.getCourseTimes,
  getStudentsInCourse: pg.getStudentsInCourse,
  getStudentRank: pg.getStudentRank,
  studentOrProf: pg.studentOrProf,
  getStudent: pg.getStudent,
  getProfessor: pg.getProfessor,
  getCourseOH: pg.getCourseOH,
  getCourseProf: pg.getCourseProf,
  getCourseStaff: pg.getCourseStaff,
  getCourseName: pg.getCourseName,
  getSkills : pg.getSkills,
  getSignedUp: pg.getSignedUp,
  search: pg.search,
  login: pg.login
};
