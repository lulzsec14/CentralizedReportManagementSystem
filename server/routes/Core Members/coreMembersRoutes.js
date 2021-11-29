// Imports
const express = require('express');
const coreMemberRouter = express.Router();

// controller imports

const { getClub } = require('../../controllers/Clubs/clubController');
const { getCoreMember,getAllCoreMembers,updateCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { getAllClubManagers } = require('../../controllers/Club Managers/clubManagerController');
const { getTask,getAllTasksOfClub,getAllTasksOfCoreMember,updateTask } = require('../../controllers/Task List/taskListController');
const {getEventById, getEventByClubId, getAllEvents, updateEvent, 
       attendance, position} = require("../../controllers/Events/eventController");
const {createCertificate, getCertificateById, getCertificateByStudentId, getCertificateByEventId, 
       getCertificateByClubId, deleteCertificateById, 
       deleteCertificateByEventId,deleteCertificateByClubId,} = require("../../controllers/Certificates/certificateController");

// ------------------------------------



// club Manager club Routes
coreMemberRouter.route('/getClubByIndex').get(getClub);


// club manager core member routes
coreMemberRouter.route('/getCoreMemberByRollNo').get(getCoreMember);
coreMemberRouter.route('/updateCoreMemberById').put(updateCoreMember);
coreMemberRouter.route('/getAllCoreMembersByClubId').get(getAllCoreMembers);

// club manager Routes

coreMemberRouter.route('/getAllClubManagersById').get(getAllClubManagers);

// club manager task list routes

coreMemberRouter.route('/getTaskById').get(getTask);
coreMemberRouter.route('/updateTaskById').put(updateTask);
coreMemberRouter.route('/getAllTasksOfCoreMemberByCoreMemberId').get(getAllTasksOfCoreMember);
coreMemberRouter.route('/getAllTasksByClubId').get(getAllTasksOfClub);

//core member event routes

coreMemberRouter.route("/getEventById").get(getEventById);
coreMemberRouter.route("/getAllEventsByClubId").get(getEventByClubId);
coreMemberRouter.route("/getAllEvents").get(getAllEvents);
coreMemberRouter.route("/update").put(updateEvent);
coreMemberRouter.route("/attendanceByEventId").post(attendance); 
coreMemberRouter.route("/setPositionsByEventIdAndEventName").post(position);

//core member certificate routes

coreMemberRouter.route("/createCertificate").post(createCertificate);
coreMemberRouter.route("/getCertificateById").get(getCertificateById);
coreMemberRouter.route("/getAllCertificatesByStudentId").get(getCertificateByStudentId);
coreMemberRouter.route("/getAllCertificatesByEventId").get(getCertificateByEventId);
coreMemberRouter.route("/getAllCertificatesByClubId").get(getCertificateByClubId);
coreMemberRouter.route("/deleteCertificateById").delete(deleteCertificateById);
coreMemberRouter.route("/deleteAllCertificatesByEventId").delete(deleteCertificateByEventId);
coreMemberRouter.route("/deleteAllCertificatesByClubId").delete(deleteCertificateByClubId);

// Exports
module.exports = coreMemberRouter;
// --------------------------