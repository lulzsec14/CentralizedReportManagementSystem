// Imports
const express = require('express');
const studentRouter = express.Router();
// ------------------------------------

// Controller Imports
const {
  createNewRequest,
  retrieveAllRequests,
  retrieveRequest,
  retrieveRequestById,
  deleteOneRequest,
  deleteOneRequestById,
  retrieveRequestByClubId,
  retrieveAllRequestByRollNo,
} = require('../../controllers/Requests/requestController');
const {
  registerStudent,
  loginSingleStudent,
  getStudentData,
  getStudentDataById,
  updateAnyStudentArray,
  updateAnyStudentArrayById,
  deleteFromAnyStudentArray,
  deleteFromAnyStudentArrayById,
} = require('../../controllers/Student/studentController');

const { createFeedback, getFeedback, deleteFeedback } = require("../../controllers/Feedback/feedbackController");

const {getCertificateById, getCertificateByStudentId} = require('../../controllers/Certificates/certificateController')

const {getEventById, getEventByClubId, getAllEvents, registration} = require('../../controllers/Events/eventController');
// ------------------------------------

// Api Route

// Request Routes
studentRouter.route('/createRequest').post(createNewRequest);
studentRouter.route('/getAllRequests').get(retrieveAllRequests);
studentRouter.route('/getOneRequest').get(retrieveRequest);
studentRouter.route('/getOneRequestById').get(retrieveRequestById);
studentRouter.route('/getRequestByClubId').get(retrieveRequestByClubId);
studentRouter.route('/getAllRequestByRollNo').get(retrieveAllRequestByRollNo);
studentRouter.route('/deleteOneRequest').delete(deleteOneRequest);
studentRouter.route('/deleteOneRequestById').delete(deleteOneRequestById);

// Student Routes
studentRouter.route('/registerStudent').post(registerStudent);
studentRouter.route('/loginStudent').post(loginSingleStudent);
studentRouter.route('/getStudentData').get(getStudentData);
studentRouter.route('/getStudentDataById').get(getStudentDataById);
studentRouter.route('/updateStudentArray').put(updateAnyStudentArray);
studentRouter.route('/updateStudentArrayById').put(updateAnyStudentArrayById);
studentRouter.route('/deleteStudentArray').delete(deleteFromAnyStudentArray);
studentRouter.route('/deleteStudentArrayById').delete(deleteFromAnyStudentArrayById);

// Feedback Router
studentRouter.route('/addFeedback').post(createFeedback);
studentRouter.route('/getFeedbackById').get(getFeedback);
studentRouter.route('/deleteFeedbackById').delete(deleteFeedback);

// Certificate Routes

studentRouter.route("/getCertificateById").get(getCertificateById);
studentRouter.route("/getAllCertificatesByStudentId").get(getCertificateByStudentId);
//Event Routes

studentRouter.route("/getEventById").get(getEventById);
studentRouter.route("/getAllEventsByClubId").get(getEventByClubId);
studentRouter.route("/getAllEvents").get(getAllEvents);
studentRouter.route("/registerByEventId").post(registration);

// ------------------------------------

// Exports
module.exports = studentRouter;
// ------------------------------------
