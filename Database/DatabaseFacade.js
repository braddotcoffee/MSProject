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
  search: pg.search,
  login: pg.login
};
